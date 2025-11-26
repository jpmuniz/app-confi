import { notificationApiMock } from "../infra/notificationApiMock.js";

async function getNotifications() {
  return notificationApiMock.list();
}

export { getNotifications };