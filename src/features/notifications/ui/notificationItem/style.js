import styled, { css } from "styled-components";

const cardStyles = css`
  background: #fff;
  border-radius: 18px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
  padding: 20px;
`;

const Item = styled.li`
  ${cardStyles}
  list-style: none;
  margin-bottom: 16px;
  transition: transform 150ms, box-shadow 150ms;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 18px 35px rgba(15, 23, 42, 0.12);
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const NotificationTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  color: ${({ tone }) => tone};
`;

const StatusPill = styled.span`
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 0.75rem;
  font-weight: 700;
  background: ${({ tone }) => `${tone}1c`};
  color: ${({ tone }) => tone};
`;

const Message = styled.p`
  margin: 0;
  color: #1f2937;
  line-height: 1.6;
  font-size: 1rem;
`;

const Meta = styled.span`
  color: #6b7280;
  font-size: 0.85rem;
`;

const Actions = styled.div`
  margin-top: 18px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const ActionButton = styled.button`
  padding: 8px 14px;
  border-radius: 10px;
  border: 1px solid transparent;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 120ms;

  ${({ variant }) =>
    variant === "danger"
      ? css`
          background: #fff;
          border-color: #dee2e6;
          color: #b91c1c;
          &:hover {
            background: #f8d7da;
          }
        `
      : css`
          background: #ecfdf5;
          border-color: #34d399;
          color: #047857;
          &:hover {
            background: #d1fae5;
          }
        `}

  &:focus-visible {
    outline: 3px solid rgba(34, 197, 94, 0.4);
  }
`;

export { Item, Header, Title, NotificationTag, StatusPill, Message, Meta, Actions, ActionButton };