const { read } = require("fs");

const fs = require("fs").promises;

class ProductManager {

    static lastId = 0;

    constructor(path) {
        this.products = [];
        this.path = path;
    }

    async addProduct(newObject) {

        let { title, description, price, thumbnail, code, stock } = newObject;

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

    async getProductById(id) {
        try {
            const responseArray = await this.readFile();
            const finded = responseArray.find(item => item.id === id);
            if (!finded) {
                console.log("Producto no encontrado");
            } else {
                console.log("Producto encontrado:");
                return finded;
            }
        } catch (error) {
            console.log("Error al leer el archivo", error)
        }
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

    async updateProduct(id, updatedProduct) {
        try {
            const responseArray = await this.readFile();
            const index = responseArray.findIndex(item => item.id === id);
            if (index !== -1) {
                responseArray.splice(index, 1, updatedProduct);
                await this.saveFile(responseArray);
            } else {
                console.log("Producto no encontrado")
            }
        } catch (error) {
            console.log("Error al actualizar el producto: ", error)
        }
    }

    async deleteProduct(id) {
        try {
            const responseArray = await this.readFile();
            const index = responseArray.findIndex(item => item.id === id);
            if(index !== -1) {
                responseArray.splice(index, 1);
                await this.saveFile(responseArray);
            }
        } catch (error) {
            console.log("No se pudo borrar el archivo")
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

/* PRODUCTO PARA QUE TIRE ERROR POR REPETIRSE EL CODE
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

//5)
manager.getProducts();

//6)
async function testGetProductById() {
    const finded = await manager.getProductById(2);
    console.log(finded);
};

testGetProductById();

//7)
const placard = {
    id: 1,
    title: "6 puertas",
    description: "Color nogal",
    price: 75000,
    thumbnail: "Sin imagen",
    code: "1001",
    stock: 10
};

/*
async function testUpdateProduct() {
    await manager.updateProduct(1, placard)
}

testUpdateProduct();
*/


//8)
/*
async function testDeleteProduct() {
    await manager.deleteProduct(1);
}

testDeleteProduct();
*/