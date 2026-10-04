# ASTROWAY
# 🌌 AstroWay

Aplicação web desenvolvida em React.js para apresentar informações e funcionalidades relacionadas à astrologia por meio do consumo de uma API externa.

O projeto foi desenvolvido como uma Single Page Application (SPA), utilizando requisições HTTP para obter e apresentar os dados retornados pela API.

---

📖 Sobre o projeto

O AstroWay é uma aplicação web que permite ao usuário consultar informações astrológicas a partir de seus dados de nascimento.

A aplicação possui uma interface desenvolvida em React.js e realiza a comunicação diretamente com a API, sem a utilização de um back-end próprio.

Entre as funcionalidades desenvolvidas estão:

- Geração de mapa astral;
- Consulta da fase da Lua;
- Consulta de horóscopo diário;
- Sinastria entre duas pessoas.

---

✨ Funcionalidades

🔮 Mapa Astral

O usuário informa seus dados de nascimento, como:

- Nome;
- Cidade de nascimento;
- Data de nascimento;
- Horário de nascimento.

A aplicação envia esses dados para a API e apresenta as informações retornadas.

---

🌙 Fase da Lua

Permite consultar a fase da Lua para uma determinada data.

A consulta é realizada utilizando uma requisição `GET` para a API.

---

♈ Horóscopo Diário

Permite consultar o horóscopo diário de um signo em uma determinada data.

O usuário seleciona o signo e a data desejada, e a aplicação realiza a consulta na API.

---

❤️ Sinastria

A funcionalidade de Sinastria permite comparar os mapas astrais de duas pessoas.

O usuário fornece os dados de nascimento da primeira e da segunda pessoa.

A aplicação envia os dados para a API utilizando uma requisição `POST` e apresenta o resultado da compatibilidade.

A resposta pode apresentar informações como:

- Pontuação de compatibilidade;
- Classificação;
- Quantidade de aspectos;
- Outros dados retornados pela API.

---

🛠️ Tecnologias utilizadas

- React.js
- JavaScript
- React-Bootstrap
- HTML
- CSS
- Fetch API
- API AstroWay

---

🌐 API utilizada

O projeto utiliza a API AstroWay para obter os dados astrológicos.

Documentação:

https://api.astroway.info/pt/docs/

As requisições são realizadas diretamente pelo frontend.

### Principais endpoints utilizados

#### Mapa Astral

```text
POST /v1/public/chart
