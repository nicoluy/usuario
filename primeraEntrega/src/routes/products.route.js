import { Router } from "express";

const router = Router();

const products = [];

const carritos = [];
const admin = true;

const checkIfAdmin = (req, res, next) => {
  if (admin) {
    next();
  } else {
    res.json({
      error: -1,
      descripcion: `ruta ${req.path} método ${req.method} no autorizada`,
    });
  }
};

router
  .route("/api/productos")
  .get((req, res) => {
    res.json(products);
  })
  .post(checkIfAdmin, (req, res) => {
    console.log(req);
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    const newProductId = products[products.length - 1].id + 1;
    const newProduct = {
      id: newProductId,
      timestamp: Date.now(),
      nombre,
      descripcion,
      codigo,
      foto,
      precio,
      stock,
    };
    products.push(newProduct);

    res.json(newProduct);
  });

router
  .route("/api/productos/:id")
  .get((req, res) => {
    const { id } = req.params;
    const product = products.find((product) => product.id === Number(id));
    res.json(product);
  })
  .put(checkIfAdmin, (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    const productToUpdateIndex = products.findIndex(
      (product) => product.id === Number(id)
    );
    const timestamp = Date.now();
    products.splice(productToUpdateIndex, 1, {
      id,
      timestamp: Date.now(),
      descripcion,
      codigo,
      foto,
      precio,
      stock,
    });
    res.json(products);
  })
  .delete(checkIfAdmin, (req, res) => {
    const { id } = req.params;
    const productToUpdateIndex = products.findIndex(
      (product) => product.id === Number(id)
    );

    products.splice(productToUpdateIndex, 1);
    res.json(products);
  });

router.route("/api/carrito").post((req, res) => {
  const id = carritos.length + 1;
  const newCarrito = {
    id: id,
    timestamp: Date.now(),
    productos: [],
  };
  carritos.push(newCarrito);
  res.json(newCarrito);
});

router.route("/api/carrito/:id").delete((req, res) => {
  const { id } = req.params;
  const carritoToUpdateIndex = carritos.findIndex(
    (carrito) => carrito.id === Number(id)
  );

  carritos.splice(carritoToUpdateIndex, 1);
  res.json(carritos);
});

router
  .route("/api/carrito/:id/productos")
  .get((req, res) => {
    const { id } = req.params;
    const carrito = carritos.find((carrito) => carrito.id === Number(id));

    res.json(carrito["productos"]);
  })
  .post((req, res) => {
    const { id } = req.params;
    const product = products.find((product) => product.id === Number(id));
    carritos[0].productos.push(product);

    res.json(carritos);
  });

router.route("/api/carrito/:id/productos/:id_prod").delete((req, res) => {
  const { id, id_prod } = req.params;
  const carritoIndex = carritos.findIndex(
    (carrito) => carrito.id === Number(id)
  );
  const carrito = carritos[carritoIndex];
  const productoIndex = carrito.productos.findIndex(
    (producto) => producto.id === Number(id_prod)
  );

  carritos[carritoIndex].productos.splice(productoIndex, 1);
  res.json(carrito["productos"]);
});

export default router;
