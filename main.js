class ProductManager {

    static lastId = 0;

    constructor() {
        this.products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock) {
       
        if(!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("ERROR: Es obligatorio llenar todos los campos")
            return;
        }

        if(this.products.some(items => items.code === code)) {
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
        const item = this.products.find( items => items.id === id);
        if(!item) {
            console.error("ERROR: Producto no encontrado")
        } else {
            console.log("Producto encontrado: ", item)
        }
        return;
    }
};

//Testing:
const manager = new ProductManager();

manager.getProducts();

manager.addProduct("Monitor", "Monitor 4k", 125200, "Imagen del monitor", "111", 35);

manager.getProducts();

manager.addProduct("Teclado", "Teclado Mecanico RGB", 75500, "Imagen del teclado", "112", 35);

manager.addProduct("Teclado Repetido", "Teclado Mecanico RGB", 75500, "Imagen del teclado", "112", 35);

manager.addProduct("Mouse", "Mouse DPI Personalizable", 35500, "Imagen del mouse", "113", 55);

manager.getProducts();

manager.getProductById(1);

manager.getProductById(7);