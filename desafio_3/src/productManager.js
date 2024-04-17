const fs = require('fs').promises;

class ProductManager {
    constructor() {
        this.path = "desafio_3/src/productos.json"
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            let products = await this.traerProductos() 
            const producto_id = products.length + 1
            const producto = {
                id: producto_id,
                title,
                description, 
                price, 
                thumbnail, 
                code, 
                stock
            }
            products.push(producto)
            await fs.writeFile(this.path, JSON.stringify(products, null, 2))
            console.log(`El producto ${producto.title} fue creado exitosamente`);
        } catch (e) {
            console.error("Error al agregar el producto", e)
        }
    }  

    async getProducts() {
        try {
            return await this.traerProductos()
        } catch (e) {
            console.error("Error al consultar productos", e)
            return []
        }
    }

    async getProductById(id) {
        try {
            let products = await this.traerProductos()
            const producto_buscado = products.find((prod) => prod.id === id)
            if(!producto_buscado) {
                const mensaje = { mensaje: `Error: El producto con el id ${id} no existe en la base de datos.` };
                return mensaje
            }
            return producto_buscado;
        } catch (e) {
            console.error("Error al consultar productos por id", e)
        }
    }

    async deleteProduct(id) {
        try {
            let products = await this.traerProductos();
            const index = products.findIndex(product => product.id === id);
            if (index !== -1) {
                products.splice(index, 1);
                await fs.writeFile(this.path, JSON.stringify(products, null, 2));
                console.log(`El producto con el id ${id} fue eliminado exitosamente`);
            } else {
                console.log(`Error: El producto con el id ${id} no existe en la base de datos.`);
            }
        } catch (e) {
            console.error("Error al eliminar el producto", e);
        }
    }

    async updateProduct(id, newData) {
        try {
            let products = await this.traerProductos();
            const index = products.findIndex(product => product.id === id);
            if (index !== -1) {
                products[index] = { ...products[index], ...newData };
                await fs.writeFile(this.path, JSON.stringify(products, null, 2));
                console.log(`El Producto con id ${id} fue actualizado exitosamente`);
            } else {
                console.log(`No se encontró un producto con id ${id}`);
            }
        } catch (e) {
            console.error("Error al actualizar el producto", e);
        }
    }

    async traerProductos() {
            try {
                const datos = await fs.readFile(this.path, 'utf8')
                return JSON.parse(datos)
            } catch (e) {
                if (e.code === 'ENOENT') {
                    return []
                } else {
                    throw e
                }
            }
    }

}

module.exports = ProductManager

