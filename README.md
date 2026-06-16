[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/72Bdl6Wn)

# Almoxarifado - Enfermagem

Sistema simples de controle de estoque para o almoxarifado de um laboratório de enfermagem. Permite cadastrar materiais, acompanhar quantidades e datas de validade, dar baixa no estoque (retirada) e excluir itens, tudo persistido em uma API REST (MockAPI).

## Stack

- HTML5 + Bootstrap 5 (via CDN) para a interface.
- JavaScript puro (sem frameworks) para a lógica e o consumo da API.
- [MockAPI](https://mockapi.io) como backend simulado (GET, POST, PUT, DELETE).
- Jest + jest-environment-jsdom para os testes automatizados (rodados também via GitHub Classroom Autograding).

## Estrutura do projeto

```
index.html        -> Estrutura da página (dashboard, formulário, tabela de estoque)
main.js           -> Toda a lógica de negócio e integração com a API
style.css         -> Reservado para estilos extras (opcional, o projeto usa Bootstrap)
__tests__/        -> Testes automatizados de cada sprint
```

## Funcionalidades por sprint

### Sprint 1 - Fundação e Inventário
- Cadastro de materiais (`POST`) com nome, quantidade, validade e categoria.
- Listagem dos materiais cadastrados (`GET`), com busca por nome.

### Sprint 2 - Regras de Negócio e Saídas (módulo desta noite)
- **Retirada de estoque (baixa):** o usuário informa a quantidade a retirar no campo `#input-retirada` e confirma no botão `.btn-baixar` de cada item da lista. O valor é validado e, se aprovado, o estoque é atualizado no MockAPI via `PUT`.
- **Exclusão de material:** o botão `.btn-excluir` remove o item tanto do MockAPI (`DELETE`) quanto da tela, após confirmação do usuário.
- **Validação de retirada:** a função `validarRetirada(estoqueAtual, quantidadeRetirada)` centraliza a regra de negócio e retorna:
  - `false` se a quantidade for menor ou igual a zero (não é permitido retirar valores negativos ou nulos);
  - `false` se a quantidade for maior que o estoque atual (não é permitido retirar mais do que existe);
  - `true` caso contrário.

  Essa função é pura (não depende do DOM), o que permite testá-la de forma isolada e unitária.

### Sprint 3 - Dashboard e Polimento
- Dashboard com total de itens, itens zerados e itens próximos da validade.
- Tratamento de erros (`try/catch`) em todas as chamadas à API, com mensagens de feedback na tela.

## Como rodar os testes

```bash
npm install
npm run test:sprint1
npm run test:sprint2
npm run test:sprint3
```

Os mesmos comandos são executados automaticamente pelo workflow `.github/workflows/classroom.yml` a cada push, via GitHub Classroom Autograding.

## Registro de progresso

- **Sprint 1:** cadastro e listagem de materiais implementados e testados.
- **Sprint 2 (commit desta noite):** corrigido um merge mal resolvido em `main.js` que havia deixado marcadores de conflito (`<<<<<<<`, `=======`, `>>>>>>>`) no arquivo, quebrando a sintaxe e fazendo os testes do Sprint 2 falharem. Após a correção, o módulo de retirada (`baixarMaterial`), a função de validação (`validarRetirada`) e o módulo de exclusão (`excluirMaterial`) ficaram ativos e todos os testes (`sprint1`, `sprint2`, `sprint3`) passam.
- **Sprint 3:** dashboard e tratamento de erros implementados e testados.
