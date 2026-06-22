# 🏥 Sistema de Controle de Almoxarifado para Enfermagem

> **🔗 Deploy:** [Clique aqui para acessar o projeto online](https://SEU-USUARIO.github.io/SEU-REPOSITORIO)
> *(substitua o link acima pelo URL do seu GitHub Pages ou Vercel após o deploy)*

Projeto desenvolvido para a disciplina de **Análise e Desenvolvimento de Sistemas**, com o objetivo de simular um sistema de gerenciamento de estoque para um laboratório de enfermagem.

O sistema permite o cadastro, consulta, retirada e exclusão de materiais, além de apresentar indicadores importantes sobre o estoque e a validade dos produtos.

---

## 📋 Funcionalidades

* ✅ Cadastro de novos materiais.
* ✅ Listagem automática dos itens cadastrados.
* ✅ Busca de materiais por nome (`id="input-busca"`).
* ✅ Registro de retirada de materiais do estoque.
* ✅ Validação para impedir retiradas inválidas.
* ✅ Exclusão de materiais cadastrados.
* ✅ Dashboard com total de itens (`id="total-itens"`), zerados e próximos da validade.
* ✅ Alerta visual de estoque crítico: itens com menos de 10 unidades recebem a classe `estoque-critico`.
* ✅ Tratamento de erros com `try/catch` em todas as requisições `fetch`.

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

## 🌐 Como fazer o deploy (GitHub Pages)

1. Faça o push do projeto para um repositório público no GitHub.
2. Acesse **Settings → Pages** no seu repositório.
3. Em **Source**, selecione a branch `master` e a pasta `/ (root)`.
4. Clique em **Save**. Em alguns instantes o link estará disponível.
5. Cole o link gerado no topo deste README, substituindo o placeholder.

---

## ▶️ Como executar localmente

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd prova-2bi-ads-3sem-erikvictorino-master
```

2. Abra o arquivo `index.html` no navegador.

---

## 🧪 Executando os testes

```bash
npm install
npm run test:sprint1
npm run test:sprint2
npm run test:sprint3
```

---

## 💡 Contrato Técnico implementado

| Requisito | Implementado |
|-----------|-------------|
| `id="input-busca"` — filtro em tempo real | ✅ |
| `id="total-itens"` — contador no dashboard | ✅ |
| `class="estoque-critico"` — quantidade < 10 | ✅ |
| `try/catch` em todas as requisições fetch | ✅ |
| README com link de deploy | ✅ |

---

## 👨‍💻 Autor

**Erik Victorino**

Estudante de Análise e Desenvolvimento de Sistemas, desenvolvendo projetos voltados para aprimorar conhecimentos em desenvolvimento web e construção de aplicações utilizando JavaScript e integração com APIs.
