class ProductManager {
    constructor() {
        this.products = []
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        const producto_id = this.products.length + 1
        const producto = {
            id: producto_id,
            title,
            description, 
            price, 
            thumbnail, 
            code, 
            stock
        }

        const validaciones = (producto) => {
            const missing_propiedades= Object.keys(producto).filter(key => producto[key] === undefined)
            const code_invalido = this.products.find((prod) => prod.code === producto.code)
                if(missing_propiedades.length > 0) {
                    console.log(`Error: faltan las siguientes propiedades del producto: ${missing_propiedades}`);
                    return
                } else if (code_invalido) {
                    console.log(`Error: el codigo ${producto.code} del producto ${producto.title} ya existe en la base de datos. Por favor cambiarlo.`);
                    return
                } else {
                    this.products.push(producto)
                    console.log(`El producto ${producto.title} fue creado exitosamente`);
                }
        }
        validaciones(producto)
    }

    getProducts() {
        console.log(this.products); 
    }

    getProductById(id) {
        const producto_buscado = this.products.find((prod) => prod.id === id)
        if(!producto_buscado) {
            console.log(`Error: El producto con el id ${id} no existe en la base de datos.`);
            return
        }
        console.log(producto_buscado);
    }

}


const productManager = new ProductManager()
productManager.getProducts()
productManager.addProduct("producto prueba1", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
// productManager.getProducts()
productManager.addProduct("producto prueba2", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
productManager.addProduct("producto prueba3", "Este es un producto prueba")
productManager.addProduct("producto prueba4", "Este es un producto prueba", 300, "Sin imagen", "cbd321", 25)
// productManager.getProducts()
productManager.getProductById(1)
productManager.getProductById(2)
productManager.getProductById(3)





