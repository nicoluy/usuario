import express from 'express';

import {Contenedor} from './contenedor.js';

const app = express();

const contenedor = new Contenedor('./productos.txt');

const PORT = 8080;

const data = await contenedor.getAll()

const server = app.listen(PORT, () => {
    console.log(`Servidor prendido escuchando ${PORT}`);
});

app.get('/productos', (req, res) => {
    res.json(data);
});

app.get('/productoRandom', (req, res) => {
    const random = parseInt(data.length*Math.random());
    res.json(data[random])
});

