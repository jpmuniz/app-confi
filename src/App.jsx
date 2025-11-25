import React, { Suspense, lazy } from "react";
import { useNotifications } from "./features/notifications/hooks/useNotifications.js";
import { Container, PageShell, Header } from "./styles/style.js";
import { PaginationBar } from "./components/PaginationBar/Index.jsx";
import { usePagination } from "./hooks/usePagination.js";

const NotificationList =
  lazy(() => import("./features/notifications/ui/notificationList/index").then((component) => ({ default: component.NotificationList })));

export default function App() {
  const { notifications, error, handleMarkAsRead, handleRemove } = useNotifications({ userId: "u1" });
  const limit = 5;
  const {
    paginatedItems,
    currentPage,
    totalPages,
    total,
    startIndex,
    endIndex,
    handlePrevious,
    handleNext
  } = usePagination(notifications, limit);

  return (
    <Container>
      <PageShell>
        <Header>
          <h1>Notificações</h1>
        </Header>

        {error && (
          <p role="alert" style={{ color: "red" }}>
            Erro ao carregar notificações.
          </p>
        )}

        <PaginationBar
          startIndex={startIndex}
          endIndex={endIndex}
          total={total}
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />

        <Suspense fallback={<p>Carregando lista...</p>}>
          <NotificationList notifications={paginatedItems} onRead={handleMarkAsRead} onRemove={handleRemove} />
        </Suspense>
      </PageShell>
    </Container>
  );
}
