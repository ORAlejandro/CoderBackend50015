class ProductManager {

    static lastId = 0;

    constructor() {
        this.products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock) {

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
};