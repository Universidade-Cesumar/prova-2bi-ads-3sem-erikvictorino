# 🏥 Sistema de Controle de Almoxarifado para Enfermagem

Projeto desenvolvido para a disciplina de **Análise e Desenvolvimento de Sistemas**, com o objetivo de simular um sistema de gerenciamento de estoque para um laboratório de enfermagem.

O sistema permite o cadastro, consulta, retirada e exclusão de materiais, além de apresentar indicadores importantes sobre o estoque e a validade dos produtos.

---

## 📋 Funcionalidades

* ✅ Cadastro de novos materiais.
* ✅ Listagem automática dos itens cadastrados.
* ✅ Busca de materiais por nome.
* ✅ Registro de retirada de materiais do estoque.
* ✅ Validação para impedir retiradas inválidas.
* ✅ Exclusão de materiais cadastrados.
* ✅ Dashboard com indicadores do estoque.
* ✅ Identificação de materiais próximos ao vencimento.
* ✅ Tratamento de erros durante as operações com a API.

---

## 🚀 Tecnologias utilizadas

* HTML5
* CSS3
* Bootstrap 5
* JavaScript (Vanilla JS)
* MockAPI (API REST para persistência dos dados)
* Jest (testes automatizados)

---

## 📁 Estrutura do projeto

```text
├── index.html
├── main.js
├── style.css
├── package.json
├── __tests__/
│   ├── sprint1.test.js
│   ├── sprint2.test.js
│   └── sprint3.test.js
└── README.md
```

---

## 💡 Principais recursos

### Cadastro de materiais

Permite adicionar novos itens ao estoque informando:

* Nome do material;
* Quantidade;
* Data de validade;
* Categoria.

Os dados são enviados para a MockAPI utilizando uma requisição **POST**.

---

### Controle de estoque

É possível registrar retiradas de materiais.

Antes da atualização do estoque, o sistema valida se:

* A quantidade é maior que zero;
* Existe estoque suficiente para realizar a retirada.

Caso a validação seja aprovada, o estoque é atualizado através de uma requisição **PUT**.

---

### Exclusão de materiais

O usuário pode remover um item do estoque após confirmação.

A exclusão é realizada por meio de uma requisição **DELETE** na API.

---

### Dashboard

O sistema apresenta informações rápidas sobre o estoque:

* Total de itens cadastrados;
* Quantidade de itens com estoque zerado;
* Quantidade de materiais próximos da data de vencimento.

---

## 🔌 API utilizada

Os dados são armazenados utilizando a plataforma **MockAPI**, permitindo operações completas de CRUD:

* GET
* POST
* PUT
* DELETE

---

## ▶️ Como executar o projeto

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
```

2. Entre na pasta do projeto:

```bash
cd prova-2bi-ads-3sem-erikvictorino-master
```

3. Abra o arquivo `index.html` no navegador.

---

## 🧪 Executando os testes

Instale as dependências:

```bash
npm install
```

Execute os testes individualmente:

```bash
npm run test:sprint1
```

```bash
npm run test:sprint2
```

```bash
npm run test:sprint3
```

---

## 🎯 Objetivo acadêmico

Este projeto foi desenvolvido para colocar em prática conceitos de:

* Manipulação do DOM;
* Consumo de APIs REST;
* Programação assíncrona com `fetch` e `async/await`;
* Validação de regras de negócio;
* Testes automatizados com Jest;
* Organização de código em JavaScript.

---

## 👨‍💻 Autor

**Erik Victorino**

Estudante de Análise e Desenvolvimento de Sistemas, desenvolvendo projetos voltados para aprimorar conhecimentos em desenvolvimento web e construção de aplicações utilizando JavaScript e integração com APIs.
