import React from "react";
import { Bar, Group, Button, Summary, Select } from "./style.js";

export function PaginationBar({
  startIndex,
  endIndex,
  total,
  onPrevious,
  onNext,
  currentPage,
  totalPages,
  pageSize,
  pageSizeOptions = [],
  onPageSizeChange
}) {
  return (
    <Bar>
      <Summary aria-live="polite">
        Mostrando {startIndex}-{endIndex} de {total} notificações
      </Summary>
      {pageSizeOptions.length > 0 && (
        <Group>
          <label htmlFor="page-size" style={{ fontSize: "0.85rem", color: "#475569" }}>
            Mostrar:
          </label>
          <Select id="page-size" value={pageSize} onChange={(event) => onPageSizeChange(Number(event.target.value))}>
            {pageSizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </Group>
      )}

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

