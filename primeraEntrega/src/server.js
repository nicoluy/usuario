import express, { json, urlencoded } from "express";

const app = express();

import productsRouter from "./routes/products.route.js";

app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/", productsRouter);

app.listen(8080, () => console.log("Server listening to port 8080"));
