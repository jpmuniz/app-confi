import React, { memo, useCallback, useMemo } from "react";
import {
  Item,
  Header,
  Title,
  NotificationTag,
  StatusPill,
  Message,
  Meta,
  Actions,
  ActionButton
} from "./style";
import { formatTimestamp } from "./helper";
import { STATUS_META } from "./constants";

function NotificationItemComponent({ notification, onRead, onRemove }) {
  const { id, message, createdAt, status } = notification;
  const currentStatus = useMemo(() => STATUS_META[status] ?? STATUS_META.read, [status]);
  const isUnread = currentStatus === STATUS_META.unread;

  const metaLabel = useMemo(() => formatTimestamp(createdAt), [createdAt]);

  const handleKey = useCallback(
    (event) => {
      if (isUnread && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        onRead(id);
      }
    },
    [id, isUnread, onRead]
  );

  const handleRead = useCallback(() => onRead(id), [id, onRead]);
  const handleRemove = useCallback(() => onRemove(id), [id, onRemove]);

  return (
    <Item
      tabIndex={0}
      role="article"
      aria-labelledby={`notif-${id}-text`}
      aria-live="polite"
      aria-label={`${currentStatus.ariaLabel}: ${message}`}
      onKeyDown={handleKey}
    >
      <Header>
        <Title id={`notif-${id}-text`}>
          <NotificationTag tone={currentStatus.tone}>
            <span aria-hidden="true">{currentStatus.icon}</span>
            {currentStatus.label}
          </NotificationTag>
          <Message>{message}</Message>
          <Meta>{metaLabel}</Meta>
        </Title>
        <StatusPill tone={currentStatus.tone} aria-live="assertive">
          {currentStatus.badge}
        </StatusPill>
      </Header>

      <Actions>
        {isUnread && (
          <ActionButton
            variant="primary"
            type="button"
            onClick={handleRead}
            aria-label={`Marcar como lida: ${message}`}
            aria-pressed="false"
          >
            Marcar como lida
          </ActionButton>
        )}
        <ActionButton
          variant="danger"
          type="button"
          onClick={handleRemove}
          aria-label={`Remover: ${message}`}
        >
          Remover
        </ActionButton>
      </Actions>
    </Item>
  );
}

function areEqual(prev, next) {
  const prevNotification = prev.notification;
  const nextNotification = next.notification;

  return (
    prevNotification.id === nextNotification.id &&
    prevNotification.status === nextNotification.status &&
    prevNotification.message === nextNotification.message &&
    prevNotification.createdAt === nextNotification.createdAt &&
    prev.onRead === next.onRead &&
    prev.onRemove === next.onRemove
  );
}

export const NotificationItem = memo(NotificationItemComponent, areEqual);
