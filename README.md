# App Confi – Painel de Notificações

Projeto de demonstração de um painel com notificações autenticadas, paginação flexível e hooks testáveis. A estrutura segue princípios de Clean Architecture e Domain-Driven Design.

## Visão geral

- **Domínio:** `features/notifications/domain/Notification`.
- **Casos de uso:** a camada `application` oferece as operações `getNotifications`, `markAsRead` e `removeNotification` que delegam ao mock (`notificationApiMock`).
- **Infraestrutura:** `createAuthService` gera e valida tokens falsos; `notificationApiMock` exige autenticação, filtra por `userId` e expõe `_reset`.
- **Hooks/UI:** `useNotifications` consome casos de uso, aceita serviços injetados e expõe handlers; a lista é renderizada pelo `NotificationList`, `NotificationItem` e `PaginationBar` com estilo inspirado no Gmail.
- **Testes:** Vitest + Happy DOM (`vitest.config.js`) permitindo testes unitários com React 19 sem instalar `jsdom`.

## Setup & Execução

```bash
npm install --legacy-peer-deps
npm run dev
```

- O comando `npm run dev` sobe o Vite em `http://localhost:5173`.
- O projeto exige `legacy-peer-deps` por causa do peer `@testing-library/react@14` (que ainda não declara compatibilidade com React 19).

## Testes

```bash
npm run test
```

- Suites implementadas:
  1. `usePagination` (`src/hooks/__tests__/usePagination.test.jsx`) – valida slice, totalPages e navegação.
  2. `notificationApiMock` (`src/features/notifications/infra/__tests__/notificationApiMock.test.js`) – garante autenticação, marcação e remoção.
  3. `useNotifications` (`src/features/notifications/hooks/__tests__/useNotifications.test.jsx`) – usa serviços injetados para testar carregamento, atualização, remoção e erro.
- O ambiente é `happy-dom`, por isso não é necessário instalar `jsdom` manual.

## Decisões principais

1. **Dependências e DI:** `useNotifications` aceita o objeto `services`, tornando o hook testável sem alterar o comportamento API.
2. **Mock seguro:** `notificationApiMock` usa `authService` para garantir autenticação antes de listar/atualizar notificações; `_reset` facilita resets nos testes.
3. **Paginação modular:** `usePagination` calcula `startIndex`/`endIndex`/`totalPages` e foi combinado com `PaginationBar` (botões + seletor `pageSize`), liberando o UI de cálculos extras.
4. **Imports ESM:** todos os módulos usam extensão `.js`, evitando erros no Vitest quando o projeto está em `"type": "module"`.
5. **Testes consistentes:** suites em Vitest validam tanto lógica (hooks, mock) quanto contratos (páginas, autenticação).

## Observações

- Documente o passo `npm install --legacy-peer-deps` antes de rodar os testes em ambientes novos.
- A estrutura de mocks permite trocar `notificationApiMock` por um adaptador HTTP sem mexer nos hooks/UI.
- Para adicionar mais cobertura, inclua testes de UI com Testing Library + Vitest ou combine com Playwright.

