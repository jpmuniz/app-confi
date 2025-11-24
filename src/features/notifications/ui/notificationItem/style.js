import styled from "styled-components";

const Item = styled.li`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-bottom: 12px;
  background: ${({ read }) => (read ? "#f0f0f0" : "#fff")};
  display: flex;
  flex-direction: column;
  outline: none;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Message = styled.p`
  margin: 0 0 8px 0;
  line-height: 1.4;
`;

const Meta = styled.small`
  color: #666;
`;

const Actions = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  padding: 6px 10px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  background: ${({ variant }) => (variant === "danger" ? "#dc3545" : "#007bff")};
  color: #fff;
  &:focus-visible {
    outline: 3px solid rgba(0,123,255,0.25);
  }
`;

export { Item, Top, Message, Meta, Actions, ActionButton };