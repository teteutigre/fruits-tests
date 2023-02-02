# Exercise Fruits Tests

## Getting Started

Para começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/).

### 🎲 Rodando o servidor

Clone este repositório

```bash
git clone <https://github.com/daniel-bernardino747/fruits-tests>
```

Acesse a pasta do projeto no terminal/cmd

```bash
cd fruits-tests/
```

Instale as dependências

```bash
npm install
```

---

Execute os testes da aplicação

```bash
npm run test
```

Os testes e suas descrições:

```
POST /fruits
  ✓ should respond with status 422 when body is invalid (213 ms)
  ✓ should respond with status 409 when name already existing in database (71 ms)
  ✓ should respond with status 201 when have created fruit (21 ms)
  ✓ should insert a new ticket in the database (28 ms)

GET /fruits
  ✓ should respond with status 200 and fruits data (13 ms)

GET /fruits/:id
  ✓ should respond with status 404 when id is invalid (46 ms)
  ✓ should respond with status 200 and fruit data when id is valid (10 ms)

Test Suites: 1 passed, 1 total
Tests:       7 passed, 7 total
```
