import { notificationApiMock } from "../infra/notificationApiMock.js";

async function markNotificationAsRead(id) {
  if (!id) throw new Error("id is required");
  return notificationApiMock.markAsRead(id);
}

export { markNotificationAsRead };