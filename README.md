# 💰 API FINANÇAS

## 🔎 Sobre o projeto

A **Api Finanças** é uma aplicação **REST** com o intuito de **gerenciar** suas **finanças** para organizar e poupar seus **gastos**. Suas funcionalidades incluem  **autenticação**, **CRUD** simples de usuários, criação de registros de **movimentações financeiras** dos tipos **Receita** ou **Despesa**, atualização dessas movimentações, geração de saldo referente aos gastos e recebimentos, entre outros.

## 🔧 Tecnologias e Ferramentas Utilizadas

![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) 
![Nodejs](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) 
![Nestjs](https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white) 
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) 
![JsonWebToken](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white) 
![PrismaORM](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white) 
![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E) 
![Eslint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white) 
![Hoppscotch](https://img.shields.io/badge/Hoppscotch-31C48D?style=for-the-badge&logo=hoppscotch&logoColor=white) 
![Npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![EditorConfig](https://img.shields.io/badge/Editor%20Config-E0EFEF?style=for-the-badge&logo=editorconfig&logoColor=000)

## 🔏 Autenticação

Para usar a API, é necessário autenticar-se. Você deve obter um **token JWT válido** através do **endpoint de login** antes de acessar outros recursos. O token JWT deve ser incluído no **cabeçalho de autorização** de **todas** as solicitações subsequentes.

## 📜 Rotas

### Usuários 
- POST /user -> Rota responsável pela criação de usuário.
- GET /user -> Rota responsável para visualizar perfil de usuário (Necessário estar autenticado).
- GET /user/balance -> Rota responsável para visualizar saldo do usuário (Necessário estar autenticado).
- PATCH /user -> Rota responsável por atualizar informações do usuário (Necessário estar autenticado).
- PUT /user -> Rota responsável por atualizar o usuário por inteiro (Necessário estar autenticado).
- DELETE /user -> Rota responsável por deletar o usuário (Necessário estar autenticado).

### Login
- POST /login -> Rota para usuários fazerem login na aplicação

### Movimentações
- POST /movement -> Rota responável para criar movimentações financeiras (Necessário estar autenticado).
- PATCH /movement/:id -> Rota responsável pela atualização das informações da movimentação (Necessário estar autenticado).
- GET /movement -> Rota responsável por listar todas as movimentações do usuário (Necessário estar autenticado).
   -  GET /movement?initialDate=2024-03-08&finalDate=2024-05-13 -> É possível utilizar query params para realizar filtro entre datas (Necessário estar autenticado).
   -  GET /movement?type=expense -> Também é possível filtrar as movimentações pelo tipo: Receitas ou Despesas (Necessário estar autenticado).
- DELETE /movement/:id -> Rota responsável por deletar uma movimentação (Necessário estar autenticado).

