import { notifications } from "./constants";
  
  const simulateLatency = (result) =>
    new Promise((resolve) => setTimeout(() => resolve(result), 150));
  
  export const notificationApiMock = {
    list({ userId } = {}) {
      const list = notifications
        .filter((notification) => (userId ? notification.userId === userId : true))
        .map((notification) => ({ ...notification }));
      return simulateLatency(list);
    },
  
    markAsRead(id) {
      notifications = notifications.map((notification) =>
        notification.id === id ? { ...notification, status: "read" } : notification
      );
      return simulateLatency(true);
    },
  
    remove(id) {
      notifications = notifications.filter((notification) => notification.id !== id);
      return simulateLatency(true);
    },
  
    _reset(data = null) {
      if (Array.isArray(data)) notifications = data;
    }
  };
  