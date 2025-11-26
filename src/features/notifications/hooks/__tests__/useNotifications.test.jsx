import { act, renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { useNotifications } from "../useNotifications.js";

const baseNotifications = [
  { id: "1", message: "A", status: "unread" },
  { id: "2", message: "B", status: "read" }
];

const makeServiceMocks = () => {
  let data = [...baseNotifications];

  return {
    getNotifications: vi.fn(async () => data.map((item) => ({ ...item }))),
    markNotificationAsRead: vi.fn(async (id) => {
      data = data.map((notification) =>
        notification.id === id ? { ...notification, status: "read" } : notification
      );
    }),
    removeNotification: vi.fn(async (id) => {
      data = data.filter((notification) => notification.id !== id);
    })
  };
};

describe("useNotifications", () => {
  it("carrega notificações e atualiza depois de marcar como lida", async () => {
    const services = makeServiceMocks();
    const { result } = renderHook(() => useNotifications({ userId: "any", services }));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.notifications).toHaveLength(2);
    });

    await act(async () => {
      await result.current.handleMarkAsRead("1");
    });

    await waitFor(() => {
      expect(result.current.notifications[0].status).toBe("read");
    });
  });

  it("remove notificação e mantém estado atualizado", async () => {
    const services = makeServiceMocks();
    const { result } = renderHook(() => useNotifications({ services }));

    await waitFor(() => expect(result.current.notifications).toHaveLength(2));

    await act(async () => {
      await result.current.handleRemove("2");
    });

    await waitFor(() => {
      expect(result.current.notifications).toHaveLength(1);
      expect(result.current.notifications[0].id).toBe("1");
    });
  });

  it("registra erro quando falha o carregamento", async () => {
    const services = makeServiceMocks();
    services.getNotifications.mockImplementation(async () => {
      throw new Error("guerra");
    });
    const { result } = renderHook(() => useNotifications({ services }));

    await waitFor(() => {
      expect(result.current.error).toBeTruthy();
      expect(result.current.notifications).toHaveLength(0);
      expect(result.current.loading).toBe(false);
    });
  });
});

