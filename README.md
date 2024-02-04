## How to run the project

```
npm install

cp .env.example .env.local
// add your own variables

npx knex migration:latest
npx knex seed:run

npm run dev
```
