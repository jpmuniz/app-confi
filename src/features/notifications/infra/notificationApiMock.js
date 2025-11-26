import { authService } from "../../auth/infra/authService";
import { notifications as defaultNotifications } from "./constants";

const createNotificationApiMock = ({
  auth = authService,
  notifications = defaultNotifications
} = {}) => {
  const baseline = Array.isArray(notifications) ? [...notifications] : [];
  const defaultGuestId =
    baseline[0]?.userId ??
    (typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : "guest-default");

  let state = [...baseline];

  const hasNotificationsFor = (id) => state.some((notification) => notification.userId === id);

  const ensureAuth = () => {
    let user = auth.validateToken();

    if (!user || !hasNotificationsFor(user.id)) {
      auth.generateTokenForGuest(defaultGuestId);
      user = auth.validateToken();
    }

    if (!user) {
      const error = new Error("Unauthorized");
      error.status = 401;
      throw error;
    }

    return user;
  };

  const simulateLatency = (result) =>
    new Promise((resolve) => setTimeout(() => resolve(result), 150));

  const list = ({ userId } = {}) => {
    const user = ensureAuth();
    const targetUserId = userId ?? user.id;
    if (userId && userId !== user.id) {
      throw Object.assign(new Error("Unauthorized user access"), { status: 401 });
    }

    const filtered = state.filter((notification) => notification.userId === targetUserId);
    return simulateLatency(filtered.map((notification) => ({ ...notification })));
  };

  const markAsRead = (id) => {
    ensureAuth();
    state = state.map((notification) =>
      notification.id === id ? { ...notification, status: "read" } : notification
    );
    return simulateLatency(true);
  };

  const remove = (id) => {
    ensureAuth();
    state = state.filter((notification) => notification.id !== id);
    return simulateLatency(true);
  };

  const _reset = (data = null) => {
    if (Array.isArray(data)) {
      state = data;
      return;
    }
    state = [...baseline];
  };

  return { list, markAsRead, remove, _reset };
};

export const notificationApiMock = createNotificationApiMock();