import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (_req, res) => {
  res.json('¡Hola desde tu API REST con TypeScript y Express!');
});

app.listen(PORT, () => {
  console.log(`Server listening on:  http://localhost:${PORT}`);
});
