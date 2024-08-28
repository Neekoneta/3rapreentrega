document.addEventListener('DOMContentLoaded', () => {
    const juegos = [
        {
            id: 1,
            nombre: "Red Dead Redemption 2",
            precio: 259.99,
            imagen: "https://image.api.playstation.com/cdn/UP1004/CUSA03041_00/Hpl5MtwQgOVF9vJqlfui6SDB5Jl4oBSq.png"
        },
        {
            id: 2,
            nombre: "God Of War Ragnarok",
            precio: 149.99,
            imagen: "https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0s.png"
        },
        {
            id: 3,
            nombre: "Howarts Legacy",
            precio: 9.99,
            imagen: "https://image.api.playstation.com/vulcan/ap/rnd/202208/0921/Ah7Ar9MU0r1BBlzAUflmhyQP.png"
        },
        {
            id: 4,
            nombre: "Far Cry 6",
            precio: 0.99,
            imagen: "https://image.api.playstation.com/vulcan/img/rnd/202106/0722/4MxzDZKZwtEWyMWZghvwd7bQ.jpg"
        },
        {
            id: 5,
            nombre: "CyberPunk 2077",
            precio: 20.77,
            imagen: "https://image.api.playstation.com/vulcan/ap/rnd/202111/3013/2tW2zf7n8wwwWXZO9dAQMVu5.png"
        }
    ];

    const juegosContainer = document.getElementById('juegos-container');
    const listaJuegos = document.getElementById('lista-juegos');
    const carritoLista = document.getElementById('carrito-lista');
    const totalPrecio = document.getElementById('total-precio');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
    const comprarBtn = document.getElementById('comprar');

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    function mostrarJuegos() {
        juegos.forEach(juego => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <img src="${juego.imagen}" alt="${juego.nombre}">
                <h3>${juego.nombre}</h3>
                <p>$${juego.precio.toFixed(2)}</p>
                <button data-id="${juego.id}">Agregar al Carrito</button>
            `;
            juegosContainer.appendChild(card);

            const li = document.createElement('li');
            li.textContent = juego.nombre;
            listaJuegos.appendChild(li);
        });
    }

    function agregarAlCarrito(id) {
        const juego = juegos.find(juego => juego.id === parseInt(id));
        carrito.push(juego);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();
    }

    function actualizarCarrito() {
        carritoLista.innerHTML = '';
        let total = 0;
        carrito.forEach(juego => {
            const li = document.createElement('li');
            li.textContent = `${juego.nombre} - $${juego.precio.toFixed(2)}`;
            carritoLista.appendChild(li);
            total += juego.precio;
        });
        totalPrecio.textContent = `Total: $${total.toFixed(2)}`;
    }

    function vaciarCarrito() {
        carrito = [];
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();
    }

    function comprar() {
        if (carrito.length > 0) {
            const cantidadJuegos = carrito.length;
            const total = carrito.reduce((acc, juego) => acc + juego.precio, 0);
            Swal.fire({
                position: "center",
                icon: "success",
                title: `Has comprado ${cantidadJuegos} juegos por un total de $${total.toFixed(2)}`,
                showConfirmButton: false,
                timer: 2500
              });
            // alert(`Has comprado ${cantidadJuegos} juegos por un total de $${total.toFixed(2)}`);
            vaciarCarrito();
        } else {
            Swal.fire({
                icon: "error",
                title: "El carrito esta vacio",
                text: "Añade algo al carrito para comprar",
              });
        }
    }

    juegosContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const id = e.target.getAttribute('data-id');
            agregarAlCarrito(id);
        }
    });

    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    comprarBtn.addEventListener('click', comprar);

    mostrarJuegos();
    actualizarCarrito();
});