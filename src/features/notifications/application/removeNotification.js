import { notificationApiMock } from "../infra/notificationApiMock.js";

async function removeNotification(id) {
  if (!id) throw new Error("id is required");
  return notificationApiMock.remove(id);
}

export { removeNotification };  