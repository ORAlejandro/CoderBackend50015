const ProductManager = require("./product-manager");

const express = require("express");

const manager = new ProductManager("./src/products.json")

const app = express();

const PUERTO = 8080;

app.get("/products", async (req, res) => {
    try {
        const responseArray = await manager.readFile();
        const limit = parseInt(req.query.limit);
        if(limit) {
            const limitArray = responseArray.slice(0, limit)
            return res.send(limitArray);
        } else {
            return res.send(responseArray);
        }
    } catch (error) {
        console.error("ERROR");
        return res.send("Error");
    }
})

app.get("/products/:pid", async (req, res) => {
    try {
        let pid = parseInt(req.params.pid);
        const finded = await manager.getProductById(pid);
        if(finded) {
            return res.send(finded)
        } else {
            return res.send("El ID ingresado no corresponde a ningun producto existente");
        }
    } catch (error) {
        console.error(error)
    }
})

app.listen(PUERTO, () => {
    console.log(`Escucha en http://localhost:${PUERTO}`);
});