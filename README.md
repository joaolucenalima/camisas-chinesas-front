# Camisas chinesas

Aplicação web para gerenciar pedidos de camisas de time com uma loja da China, feita com React, TypeScript, Vite e TailwindCSS.

## Funcionalidades

- Cadastro de pessoas interessadas em camisas
- Adição, edição e remoção de camisas para cada pessoa
- Controle de status das camisas (decidindo, aguardando resposta, para compra, sem interesse)
- Conversão automática de valores em dólar para real, com cotação atualizada via API
- Upload e visualização de imagens das camisas
- Interface moderna e responsiva

## Tecnologias Utilizadas

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Lucide React Icons](https://lucide.dev/)

## Instalação

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/joaolucenalima/camisas-chinesas-front.git
   cd camisas-chinesas-front
   ```

2. **Instale as dependências:**
   ```sh
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   - Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
     ```
     VITE_API_URL=http://localhost:3333
     VITE_EXCHANGE_RATE_KEY=sua_chave_da_api
     ```

4. **Inicie o servidor de desenvolvimento:**
   ```sh
   npm run dev
   ```

5. **Abra no navegador:**
   - Acesse [http://localhost:5173](http://localhost:5173)

## Scripts

- `npm run dev` — Inicia o servidor de desenvolvimento
- `npm run build` — Gera a build de produção
- `npm run preview` — Visualiza a build de produção localmente
- `npm run lint` — Executa o linter

## Estrutura de Pastas

```
src/
  components/      # Componentes reutilizáveis (formulários, botões, modais, etc)
  contexts/        # Contextos React para estado global (modal, app)
  dtos/            # Tipos de dados (DTOs)
  hooks/           # Hooks customizados
  style.css        # Estilos globais (Tailwind)
  App.tsx          # Componente principal
  main.tsx         # Ponto de entrada da aplicação
```

## Observações

- É necessário rodar uma API backend compatível para persistência dos dados.
- Para obter a cotação do dólar, é preciso uma chave da [ExchangeRate API](https://www.exchangerate-api.com/).