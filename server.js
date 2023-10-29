import express from 'express'
import { ProductManager } from './ProductManager.js';

const app = express();
const productManager = new ProductManager("./Productos.json");
const port = 8080;


app.get('/', (req, res) => {
    res.send('Server UP');
  });

  app.get("/products", async (req, res) => {
    const {limit} = req.query;

    try {
        const products = await productManager.getProducts();
       
        if(limit){
            res.json(products.slice(0, parseInt(limit)));
        }else{
            res.json(products);
        };
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
});

app.get("/products/limit=5", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.json(products.slice(0, 5));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/products/:pid', async (req, res) => {
  const { pid } = req.params;
  const pidNumber = Number(pid)
  
  try {
    const product = await productManager.getProductById(pidNumber);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server con Express montado en el puerto ${port}`);
});