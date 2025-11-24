import React, { memo, useCallback } from "react";
import { Item, Top, Message, Meta, Actions, ActionButton } from "./style";

function NotificationItemComponent({ notification, onRead, onRemove }) {
  const { id, message, createdAt, status } = notification;

  const handleKey = useCallback(
    (actionEvent) => {
      if ((actionEvent.key === "Enter" || actionEvent.key === " ") && status === "unread") {
        actionEvent.preventDefault();
        onRead(id);
      }
    },
    [id, onRead, status]
  );

  return (
    <Item
      read={status === "read"}
      role="article"
      aria-labelledby={`notif-${id}-text`}
      tabIndex={0}
      onKeyDown={handleKey}
    >
      <Top>
        <div id={`notif-${id}-text`}>
          <Message>{message}</Message>
          <Meta>{new Date(createdAt).toLocaleString()}</Meta>
        </div>
        <div aria-hidden>
          {status === "unread" ? <span aria-label="Não lida">🔔</span> : <span aria-label="Lida">✓</span>}
        </div>
      </Top>

      <Actions>
        {status === "unread" && (
          <ActionButton
            type="button"
            onClick={() => onRead(id)}
            aria-pressed="false"
            aria-label={`Marcar notificação ${message} como lida`}
          >
            Marcar lida
          </ActionButton>
        )}

        <ActionButton
          type="button"
          variant="danger"
          onClick={() => onRemove(id)}
          aria-label={`Remover notificação ${message}`}
        >
          Remover
        </ActionButton>
      </Actions>
    </Item>
  );
}

export const NotificationItem = memo(NotificationItemComponent);
