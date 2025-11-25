import styled from "styled-components";

export const Container = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 40px 16px 64px;
  background: linear-gradient(180deg, #f7f9fc 0%, #eef2ff 80%);
`;

export const PageShell = styled.section`
  width: min(720px, 100%);
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

