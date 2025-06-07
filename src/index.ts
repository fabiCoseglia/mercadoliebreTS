import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (_req, res) => {
 res.json({
    status: 'success',
    message: '¡Bienvenido a la API del ecommerce!',
    data: null
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on:  http://localhost:${PORT}`);
});
