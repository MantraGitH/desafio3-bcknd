import express from 'express'
import { productos } from "./productos.js";

const app = express();
const port = 8080;


app.get('/', (req, res) => {
    res.send('Server UP');
  });

// Ruta para obtener todos los productos.
app.get('/products', (req, res) => {
  res.json(productos);
});

// Ruta para obtener productos del primero al quinto
app.get('/products/5', (req, res) => {
    const limit = req.query.limit;
    if (limit) {
      const limitedProducts = productos.slice(0, 5); // 
      res.json(limitedProducts);
    } else {
      res.json(productos);
    }
  });

// Ruta para obtener un producto por su ID 
app.get('/products/:id', (req, res) => {
  const productId = req.params.id;
  const product = productos.find(p => p.id == productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'El producto no existe' });
  }
});

app.listen(port, () => {
  console.log(`Server con Express montado en el puerto ${port}`);
});