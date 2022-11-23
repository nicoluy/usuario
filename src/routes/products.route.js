import { Router, json, urlencoded } from "express";

const router = Router();

const products = [
  {
    title: "Escuadra",
    price: 123.45,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    id: 1,
  },
  {
    title: "Calculadora",
    price: 234.56,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
    id: 2,
  },
  {
    title: "Globo Terráqueo",
    price: 345.67,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
    id: 3,
  },
];

router
  .route("/")
  .get((req, res) => {
    res.json(products);
  })
  .post((req, res) => {
    console.log(req);
    const { title, price, thumbnail } = req.body;
    const newProductId = products[products.length - 1].id + 1;
    const newProduct = {
      title,
      price,
      thumbnail,
      id: newProductId,
    };
    products.push(newProduct);

    res.json(newProduct);
  });

router
  .route("/:id")
  .get((req, res) => {
    const { id } = req.params;
    const product = products.find((product) => product.id === Number(id));
    let response = product ? { product } : { error: "Producto no encontrado" };
    res.json(response);
  })
  .put((req, res) => {
    const { id } = req.params;
    const { title, price, thumbnail } = req.body;
    const productToUpdateIndex = products.find(
      (product) => product.id === Number(id)
    );

    products.splice(productToUpdateIndex, 1, { title, price, thumbnail });
  })
  .delete((req, res) => {
    const { id } = req.params;
    const { title, price, thumbnail } = req.body;
    const productToUpdateIndex = products.find(
      (product) => product.id === Number(id)
    );

    products.splice(productToUpdateIndex, 1);
  });

export default router;
