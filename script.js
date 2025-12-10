document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();
});

async function cargarProductos() {
    try {
        const respuesta = await fetch("productos.json");
        const productos = await respuesta.json();

        const contenedor = document.getElementById("productos-container");
        contenedor.innerHTML = "";

        productos.forEach((prod, index) => {
            const div = document.createElement("div");
            div.classList.add("producto");

            const imagenPrincipal = prod.imagenes[0]?.url || "https://via.placeholder.com/200";

            div.innerHTML = `
                <img src="${imagenPrincipal}" alt="${prod.nombre}">
                <h3>${prod.nombre}</h3>
                <p>${prod.descripcion}</p>
                <p><strong>${prod.precio}</strong></p>

                <a href="https://wa.me/34643261975?text=¡Hola!%20Me%20gustaría%20más%20información%20sobre:%20${encodeURIComponent(prod.nombre)}"
                   class="boton-whatsapp" target="_blank">Consultar por WhatsApp</a>

                <button onclick="abrirGaleria(${index})">Ver fotos</button>
            `;

            contenedor.appendChild(div);
        });

    } catch (e) {
        console.error("Error cargando productos:", e);
    }
}

function abrirGaleria(index) {
    fetch("productos.json")
        .then(res => res.json())
        .then(productos => {
            const prod = productos[index];

            prod.imagenes.forEach(img => {
                const link = document.createElement("a");
                link.href = img.url;
                link.setAttribute("data-lightbox", "galeria-" + index);
                link.setAttribute("data-title", img.descripcion || prod.nombre);
                document.body.appendChild(link);
            });

            document.querySelector(`a[data-lightbox='galeria-${index}']`).click();
        });
}
