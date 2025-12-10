let productosGlobal = [];

const contenedor = document.getElementById('productos-container');
const busquedaInput = document.getElementById('busqueda');
const filtroSelect = document.getElementById('filtro');

fetch('productos.json')
    .then(response => response.json())
    .then(productos => {
        productosGlobal = productos;
        generarCategorias(productosGlobal);
        mostrarProductos(productosGlobal);
    });

function mostrarProductos(productos) {
    contenedor.innerHTML = '';
    productos.forEach((producto, index) => {
        const card = document.createElement('div');
        card.classList.add('producto-card');

        let imagenPrincipal = producto.imagenes[0]?.url || "https://via.placeholder.com/200";
        let htmlImagenes = `<a href="${imagenPrincipal}" data-lightbox="galeria-${index}" data-title="${producto.nombre}"><img src="${imagenPrincipal}" alt="${producto.nombre}"></a>`;

        if(producto.imagenes.length > 1){
            for(let i=1; i<producto.imagenes.length; i++){
                htmlImagenes += `<a href="${producto.imagenes[i].url}" data-lightbox="galeria-${index}" data-title="${producto.imagenes[i].descripcion || producto.nombre}" style="display:none;"></a>`;
            }
        }

        card.innerHTML = `
            ${htmlImagenes}
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p><strong>${producto.precio}</strong></p>
            <p><em>${producto.categoria}</em></p>
            <button onclick="contactar('${producto.nombre}')">Me interesa</button>
        `;
        contenedor.appendChild(card);
    });
}

function contactar(producto){
    const nombreProducto = document.getElementById('mensaje');
    nombreProducto.value = `¡Hola! Me gustaría más información sobre: ${producto}`;
    window.location.href = "#contacto";
}

function filtrarProductos(){
    const texto = busquedaInput.value.toLowerCase();
    const categoria = filtroSelect.value;
    const filtrados = productosGlobal.filter(p => 
        p.nombre.toLowerCase().includes(texto) &&
        (categoria === '' || p.categoria === categoria)
    );
    mostrarProductos(filtrados);
}

busquedaInput.addEventListener('input', filtrarProductos);
filtroSelect.addEventListener('change', filtrarProductos);

function generarCategorias(productos){
    const categorias = [...new Set(productos.map(p => p.categoria))];
    categorias.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        filtroSelect.appendChild(option);
    });
}
