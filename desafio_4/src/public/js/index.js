const socket = io();

const realTimeProducts = document.getElementById('realTimeViewProducts');

const mostrarRealTimeProducts = (productos) => {
    let productList = "";
    productos.forEach((product) => {
        productList += `
        <div class="col-md-4 mb-4"> 
            <div class="card h-100"> 
                <div class="card-body">
                    <h3><span class="small fst-italic text-black-50">Producto: </span>${product.title}</h3>
                    <p><span class="small fst-italic text-black-50">Descripcion: </span>${product.description}</p>
                    <p><span class="small fst-italic text-black-50">Precio: </span>${product.price}</p>
                    <button type="button" class="btn btn-primary delete-button" data-product-id="${product.id}">Eliminar</button>
                </div>
            </div>
        </div>
        `;
    });

    realTimeProducts.innerHTML = `<div class="container"><div class="row">${productList}</div></div>`;
};

socket.on('mostrarProductos', productos => {
    mostrarRealTimeProducts(productos);

    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.getAttribute('data-product-id'));
            socket.emit('deleteProduct', productId);
            console.log(productId);
            console.log(typeof productId);
        });
    });
});

