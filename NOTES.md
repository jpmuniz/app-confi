# Notas Técnicas

## Trade-offs
- Optei por Vite em vez de Meteor para manter o build leve, aproveitando HMR rápido e configuração mínima. Meteor oferece ferramentas integradas (accounts, pub/sub), mas o custo seria uma curva maior e dependências mais pesadas para um desafio focado em UI/domain.
- Toda a lógica de notificação roda em mocks/simulações. Isso facilita testes e entendimento, mas, em produção, seria necessário trocar o `notificationApiMock` por um adaptador real (fetch/axios) sem quebrar os hooks graças aos contratos e injeção de dependência.
- A paginação foi feita no frontend com `usePagination` e botões “Anterior/Próxima”. Num cenário com muitos registros, essa abordagem exige backend paginado; sem essa camada, se tivéssemos uma API real usaríamos uma lista virtualizada (`react-window` ou `virtuoso`) para manter desempenho ao renderizar os cards.

## Pontos não implementados (por falta de tempo)
- UI/UX mais rica (tela do topo, filtros, badges dinâmicos, status transacional) ficou de fora para focar no core (hooks/paginação/testes).
- Testes de UI com React Testing Library + Vitest para componentes, e cobertura mais ampla para cenários de erro/latência.

## Próximos passos
1. **Implementar API real ou GraphQL** mantendo o mesmo contrato das funções `getNotifications`, `markNotificationAsRead`, `removeNotification`.
2. **Adicionar uma camada de virtualization** (`react-window`, `@tanstack/react-virtual`) se a lista crescer para dezenas/hundreds de itens.
3. **Escrever mais testes** de integração/ UI (buttons, cards, barra de paginação) e adicionar coverage ao pipeline Vitest.
4. **Criar ADRs** para decisões críticas (ex: mock vs real API, escolha do happy-dom, injeção de serviços) caso o projeto evolua.


