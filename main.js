const fs = require("fs").promises;

class ProductManager {

    static lastId = 0;

    constructor(path) {
        this.products = [];
        this.path = path;
    }

    async addProduct(newObject) {

        let {title, description, price, thumbnail, code, stock} = newObject;

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("ERROR: Es obligatorio llenar todos los campos")
            return;
        }

        if (this.products.some(items => items.code === code)) {
            console.error("ERROR: El codigo debe ser unico");
            return;
        }

        const newProduct = {
            id: ++ProductManager.lastId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        this.products.push(newProduct);
        await this.saveFile(this.products);
    };

    getProducts() {
        console.log(this.products);
    };

    getProductById(id) {
        const item = this.products.find(items => items.id === id);
        if (!item) {
            console.error("ERROR: Producto no encontrado")
        } else {
            console.log("Producto encontrado: ", item)
        }
        return;
    }

    async readFile() {
        try {
            const response = await fs.readFile(this.path, "utf-8")
            const responseArray = JSON.parse(response);
            return responseArray;

        } catch (error) {
            console.log("Hubo un error al leer el archivo: ", error);
        }
    }

    async saveFile(responseArray) {
        try {
            await fs.writeFile(this.path, JSON.stringify(responseArray, null, 2));
        } catch (error) {
            console.log("Error al guardar el archivo: ", error)
        }
    }
};

//Testing:
//1)
const manager = new ProductManager("./products.json");

//2)
manager.getProducts();

//3)
const silla = {
    title: "Barcelona",
    description: "Silla de roble",
    price: 55000,
    thumbnail: "Sin imagen",
    code: "1001",
    stock: 50
}

manager.addProduct(silla);

//4)
const mesa = {
    title: "Europa",
    description: "Silla de guatambu",
    price: 135700,
    thumbnail: "Sin imagen",
    code: "1002",
    stock: 25
}

manager.addProduct(mesa);

/* PRODUCTO PARA QUE TIRE ERROR POR REPETIRSE
const alacena = {
    title: "Nordica",
    description: "Alacena de 1.20mts",
    price: 81250,
    thumbnail: "Sin imagen",
    code: "1002",
    stock: 25
}

manager.addProduct(alacena);
*/