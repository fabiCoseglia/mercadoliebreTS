# 🛠️ Proyecto Backend Ecommerce - Guía Paso a Paso

Esta es una guía paso a paso pensada para estudiantes que están aprendiendo a crear una API REST desde cero utilizando **Node.js**, **Express** y **TypeScript**. A medida que avancemos, también vamos a usar **Prisma** como ORM y otras herramientas modernas.

---

## ✅ Paso 1: Inicializar el proyecto

Creamos la carpeta del proyecto y la inicializamos con npm:

```bash
npm init -y
```

---

## ✅ Paso 2: Instalar las dependencias necesarias

Instalamos Express, el framework que vamos a usar para crear la API:

```bash
npm install express
```

Instalamos las dependencias de desarrollo necesarias para trabajar con TypeScript:

```bash
npm install -D typescript ts-node-dev @types/node @types/express
```

---

## ✅ Paso 3: Crear la configuración de TypeScript

Creamos el archivo de configuración con:

```bash
npx tsc --init
```

Editamos el archivo `tsconfig.json` para dejarlo así:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

---

## ✅ Les dejo la estructura a modo de GUIA:

```
TITULO-DE-TU-PROYECTO/
├── node_modules/
├── src/
│   └── index.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## ✅ Paso 4: Crear el servidor con Express

Creamos una carpeta llamada `src` y dentro de ella el archivo principal:

```bash
mkdir src
touch src/index.ts
```

En `src/index.ts` escribimos el siguiente código:

```ts
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: '¡Bienvenido a la API del ecommerce!',
    data: null
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
```

---

## ✅ Paso 5: Agregar el script para correr el servidor

En el `package.json`, agregamos un script para desarrollo:

```json
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/index.ts"
}
```

Con esto, podemos iniciar el servidor con:

```bash
npm run dev
```

---

## ✅ Paso 6: Probar el servidor

Con el servidor corriendo, abrimos Thunder Client o Postman y hacemos una petición **GET a `http://localhost:3000/`**.

