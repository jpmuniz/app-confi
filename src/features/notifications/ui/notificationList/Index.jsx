import React, { memo } from "react";
import { NotificationItem } from "../notificationItem/Index";
import { List } from "./style";

function NotificationListComponent({ notifications, onRead, onRemove }) {
  if (!notifications || notifications.length === 0) {
    return <p role="status">Nenhuma notificação encontrada.</p>;
  }

  return (
    <List aria-live="polite" aria-relevant="additions removals">
      {notifications.map((n) => (
        <NotificationItem key={n.id} notification={n} onRead={onRead} onRemove={onRemove} />
      ))}
    </List>
  );
}

export const NotificationList = memo(NotificationListComponent);
