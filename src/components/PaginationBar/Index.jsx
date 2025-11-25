import React from "react";
import { Bar, Group, Button, Summary } from "./style.js";

export function PaginationBar({ startIndex, endIndex, total, onPrevious, onNext, currentPage, totalPages }) {
  return (
    <Bar>
      <Summary aria-live="polite">
        Mostrando {startIndex}-{endIndex} de {total} notificações
      </Summary>
      <Group aria-label="Controles de paginação">
        <Button type="button" onClick={onPrevious} disabled={currentPage === 0}>
          Anterior
        </Button>
        <Button type="button" onClick={onNext} disabled={currentPage >= totalPages - 1}>
          Próxima
        </Button>
      </Group>
    </Bar>
  );
}

