import { authService } from "../../auth/infra/authService";
import { notifications as initialNotifications } from "./constants";

const baselineNotifications = Array.isArray(initialNotifications)
  ? [...initialNotifications]
  : [];

const DEFAULT_GUEST_ID =
  baselineNotifications[0]?.userId ??
  (typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : "guest-default");

let notifications = [...baselineNotifications];

function ensureAuth() {
  const hasNotificationsFor = (id) =>
    notifications.some((notification) => notification.userId === id);

  let user = authService.validateToken();

  if (!user || !hasNotificationsFor(user.id)) {
    authService.generateTokenForGuest(DEFAULT_GUEST_ID);
    user = authService.validateToken();
  }

  if (!user) {
    const error = new Error("Unauthorized");
    error.status = 401;
    throw error;
  }

  return user;
}

const simulateLatency = (result) =>
  new Promise((resolve) => setTimeout(() => resolve(result), 150));

export const notificationApiMock = {
  list({ userId } = {}) {
    const user = ensureAuth();
    const targetUserId = userId ?? user.id;
    const list = notifications.filter((notification) => notification.userId === targetUserId);
    return simulateLatency(list);
  },

  markAsRead(id) {
    ensureAuth();
    notifications = notifications.map((notification) =>
      notification.id === id ? { ...notification, status: "read" } : notification
    );
    return simulateLatency(true);
  },

  remove(id) {
    ensureAuth();
    notifications = notifications.filter((notification) => notification.id !== id);
    return simulateLatency(true);
  },

  _reset(data = null) {
    if (Array.isArray(data)) {
      notifications = data;
      return;
    }
    notifications = [...baselineNotifications];
  }
};