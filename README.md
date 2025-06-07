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


## ✅ Paso 7: Crear la base de datos y tabla (MySQL)

Ejecutamos el siguiente script SQL para crear la base de datos y la tabla de productos con algunos datos iniciales:

```sql
-- Crear base de datos
CREATE DATABASE IF NOT EXISTS shopdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE shopdb;

-- Crear tabla products
CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    discount INT NOT NULL DEFAULT 0,
    category ENUM('in-sale', 'visited') NOT NULL,
    description TEXT,
    image VARCHAR(255)
);

-- Insertar los 4 productos con IDs 1 a 4
INSERT INTO products (id, name, price, discount, category, description, image) VALUES
(1, 'Cafetera Moulinex Dolce Gusto Edited', 1400.00, 50, 'visited',
 'Cafetera Dolce Gusto Lumio. La cafetera Dolce Gusto Lumio es de variedad automática que ha llegado con un diseño radical al que nos tenía acostumbrados Dolce Gusto.En este post te contamos todo lo que necesitas saber sobre ella, desde sus características técnicas hasta la calidad de las cápsulas o price.',
 'img-cafetera-moulinex.jpg'),

(2, 'Macbook Pro 2022', 1200.00, 3, 'in-sale',
 'Macbook Pro 2019 Mpxq2ll/a Intel Core i5 2.3 Ghz 8gb RAM 128gb SSD Pantalla 13.3" Retina Apple Nueva Original. Importada de USA. Se entrega con la factura de compra para contar con la garantía del fabricante',
 'img-macbook-pro-2019.jpg'),

(3, 'Samsung Galaxy S10', 72999.00, 25, 'in-sale',
 'Experiencia visual excepcional. Mirá tus series y películas favoritas con la mejor definición.Tendrás colores brillantes y detalles precisos en todos tus contenidos.Disfrutá aún más del mejor entretenimiento gracias a su vasta pantalla y ángulos de visión amplios.',
 'img-samsung-galaxy-s10.jpg'),

(4, 'Smart TV Samsung 4K 50', 34990.00, 0, 'visited',
 'Con el Smart TV Samsung UN50MU6100, viví una nueva experiencia visual con la resolución 4K, que te presentará imágenes con gran detalle y de alta calidad. Ahora todo lo que veas cobrará vida con brillo y colores más reales. Gracias a su tamaño de 50", podrás transformar tu espacio en una sala de cine y transportarte a donde quieras.',
 'img-tv-samsung-smart.jpg');
```

Lamentablemente solo encontré 4 imgs, entonces usaré solamente 4 productos para la DDBB.
---

## ✅ Paso 8: Instalar y configurar Prisma para conectar la base de datos Instalamos Prisma y su cliente:

```sql
npm install prisma --save-dev
npm install @prisma/client
```

Inicializamos Prisma (crea la carpeta prisma con schema.prisma):

```bash
npx prisma init
```

Despues editamos el archivo .env para configurar la conexión a la base de datos MySQL que creamos (ajustá usuario, contraseña y puerto si es necesario):

```env
DATABASE_URL="mysql://usuario:contraseña@localhost:3306/shopdb"
```
Por defecto los que hicimos la cursada tenemos el puerto de SQL en 3306, presten atencion. yo me ayudé bastante con workbench porque hacia años que no tocaba MySQL.


## ✅ Paso 9: Definir el esquema de Prisma para la tabla products

Si corrieron el script de sql, deben correr el siguiente comando para que prisma genere el schema automaticamente apuntando a la base de dato existente (la que configuraron en el .env, es ahí a lo que apunta prisma)

```env
npx prisma db pull
```

acá les dejo como deberia de quedar el schema. prisma/schema.prisma:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model products {
  id          Int               @id
  name        String            @db.VarChar(255)
  price       Decimal           @db.Decimal(10, 2)
  discount    Int               @default(0)
  category    products_category
  description String?           @db.Text
  image       String?           @db.VarChar(255)
}

enum products_category {
  in_sale @map("in-sale")
  visited
}

```
---
## ✅ Paso 10: Generar Prisma Client y conectar la DDBB

Debemos ejecutar el siguiente comando:
  ```bash
  npx prisma generate
   ```

Creamos el archivo src/database/prismaClient.ts con el siguiente contenido:

```ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;

```

## ✅ Paso 11: Crear la capa de servicios para productos:

Creamos el archivo src/services/productService.ts:

```ts
import prisma from '../database/prismaClient';


export const getAllProducts = async () =>{
  return await prisma.products.findMany();
}
```

## ✅ Paso 12: Creamos el controlador para manejar la petición:
Creamos src/controllers/productController.ts:

```ts
import { Request, Response } from 'express';
import { getAllProducts } from '../services/productService';
import { log } from 'console';


export const getProductsController = async (req: Request,res: Response) =>{
    try {
        const products = await getAllProducts();
        res.status(200).json({
            status: 'success',
            data: products,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'fetch data failed'
        })
    }
}
```

## ✅ Paso 13: Crear la ruta para productos
Creamos src/routes/productRoutes.ts:

```ts
import { Router } from 'express';
import { getProductsController } from '../controllers/productController';

const router = Router();

router.get('/products',getProductsController);

export default router;
```

## ✅ Paso 14: Integrar la ruta en el servidor principal
Editamos src/index.ts para incluir la ruta:

```ts
import express from 'express';
import productRoutes from './routes/productRoutes';


const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api', productRoutes)

app.listen(PORT, () => {
  console.log(`Server listening on:  http://localhost:${PORT}`);
});
```

## ✅ Paso 16: Probar la API

Con el servidor corriendo (npm run dev), hacemos una petición GET a:

```bash
http://localhost:3000/api/products
```
y deberíamos obtener el listado de productos cargados en la base de datos MySQL.


## ✅ Conclusión y proximos pasos:

Hasta acá implementé un ORM, las peticiones y la forma de usarlo es muuy similar a secquelize, es cuestion de leer la docs o consultar a las ias, siempre afinando el ojo para no hacer un copy paste indescriminado.

utilicé solo un método que es traer a todos los productos, les dejo esta base por si les sirve, trataré de seguir implementando el proyecto sobre todo porque tengo conocimientos ultra limitados con TS. cualquier cosa pueden clonar el proyecyo e intentar algo similar y mucho mas completo. 

