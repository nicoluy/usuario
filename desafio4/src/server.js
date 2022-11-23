import express, { json, urlencoded } from "express";
import productsRouter from "./routes/products.route.js";

import { Router } from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/api/products", productsRouter);
app.use(
  "/public",
  express.static(path.join(__dirname + "/html/productForm.html"))
);

app.listen(8080, (error) => {
  if (error) {
    console.log("Error while initializing the app", error);
  } else {
    console.log("Server listening to 8080 port");
  }
});
