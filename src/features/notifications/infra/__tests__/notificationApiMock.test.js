import { describe, expect, it, vi } from "vitest";
import { createNotificationApiMock } from "../notificationApiMock";

const createAuthStub = () => {
  let token = null;
  return {
    validateToken: () => token,
    generateTokenForGuest: (id) => {
      token = { id, role: "guest", exp: Date.now() + 1000 };
      return token;
    }
  };
};

describe("notificationApiMock", () => {
  it("returns notifications for the authenticated guest", async () => {
    const auth = createAuthStub();
    const api = createNotificationApiMock({ auth });

    const notificationList = await api.list();
    expect(notificationList.every((n) => n.userId === notificationList[0].userId)).toBe(true);
    expect(notificationList).not.toBe(api.list);
  });

  it("marks notification as read", async () => {
    const auth = createAuthStub();
    const api = createNotificationApiMock({ auth });

    const initial = await api.list();
    await api.markAsRead(initial[0].id);
    const updated = await api.list();
    expect(updated[0].status).toBe("read");
  });

  it("removes notification and rejects when requesting other user", async () => {
    const auth = createAuthStub();
    const api = createNotificationApiMock({ auth });

    const initial = await api.list();
    await api.remove(initial[0].id);
    const afterRemove = await api.list();
    expect(afterRemove.length).toBe(initial.length - 1);
    await expect(api.list({ userId: "hacker" })).rejects.toMatchObject({ status: 401 });
  });
});

