import { notificationApiMock } from "../infra/notificationApiMock";

async function getNotifications({ userId } = {}) {
  return notificationApiMock.list({ userId });
}

export { getNotifications };