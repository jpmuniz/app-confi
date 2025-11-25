import { notificationApiMock } from "../infra/notificationApiMock";

async function getNotifications() {
  return notificationApiMock.list();
}

export { getNotifications };