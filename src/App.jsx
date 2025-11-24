import React, { Suspense, lazy } from "react";
import { useNotifications } from "./features/notifications/hooks/useNotifications.js";
import { Container, Header } from "./styles/style.js";

const NotificationList = 
lazy(() => import("./features/notifications/ui/notificationList/index").then(component => ({ default: component.NotificationList })));

export default function App() {
  const { notifications, error, handleMarkAsRead, handleRemove } = useNotifications({ userId: "u1" });

  return (
    <Container>
      <Header>
        <h1>Notificações</h1>
      </Header>

      {error && (
        <p role="alert" style={{ color: "red" }}>
          Erro ao carregar notificações.
        </p>
      )}

      <Suspense fallback={<p>Carregando lista...</p>}>
        <NotificationList notifications={notifications} onRead={handleMarkAsRead} onRemove={handleRemove} />
      </Suspense>
      
    </Container>
  );
}
