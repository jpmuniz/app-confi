import styled from "styled-components";

export const Bar = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: #fff;
  padding: 12px 16px;
  box-shadow: 0 15px 35px rgba(15, 23, 42, 0.08);
  gap: 12px;
`;

export const Group = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Button = styled.button`
  border: 1px solid #d1d5db;
  background: #fff;
  border-radius: 999px;
  padding: 6px 16px;
  font-weight: 600;
  font-size: 0.9rem;
  color: #111827;
  cursor: pointer;
  transition: border-color 120ms, color 120ms;

  &:hover:not(:disabled) {
    border-color: #4f46e5;
    color: #4f46e5;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const Summary = styled.span`
  font-size: 0.95rem;
  color: #374151;
`;

