import styled from "styled-components";

export const Container = styled.main`
  width: 100%;
  max-width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 40px 16px 64px;
  background: linear-gradient(180deg, #f7f9fc 0%, #eef2ff 80%);
  overflow-x: hidden;
`;

export const PageShell = styled.section`
  width: min(720px, 100%);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0 8px;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

