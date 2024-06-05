document.addEventListener("DOMContentLoaded", function () {
    // Verificamos si hay información nueva, cada vez que cargamos la página de usuarios
    if (window.location.pathname === "/canciones") {
        // Vamos a generar un método que nos permita consumir la información desde el backend
        fetchCanciones();
    }

    // Manejar el envío del formulario para guardar un nuevo usuario
    const formulario = document.getElementById("formulario"); // Este es el id del form en la página /formulario
    if (formulario)  {
        formulario.addEventListener("submit", function (event) {
            event.preventDefault();
            const nombre = document.getElementById("nombre").value;
            const artista = document.getElementById("artista").value;
            const genero = document.getElementById("genero").value;
            const duracion = document.getElementById("duracion").value;
            guardarCancion({ nombre, artista, genero, duracion });
        });
    }

    // Manejar el formulario de búsqueda por ID
    const buscarForm = document.getElementById("buscar-form");
    if (buscarForm) {
        buscarForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const id = document.getElementById("buscar-id").value;
            buscarCancionPorId(id);
        });
    }
    const buscarNombreForm = document.getElementById("buscarNombre-form");
    if (buscarNombreForm){
        buscarNombreForm.addEventListener("submit", function (event){
            event.preventDefault();
            const nombre = document.getElementById("buscar-nombre").value;
            buscarCancionPorNombre(nombre);
        });
    }

    // Manejar el formulario de eliminación por ID
    const eliminarForm = document.getElementById("eliminar-form");
    if (eliminarForm) {
        eliminarForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const id = document.getElementById("eliminar-id").value;
            eliminarCancionPorId(id);
        });
    }

    // Manejar el botón para eliminar todas las canciones
    const eliminarTodasBtn = document.getElementById("eliminar-todas");
    if (eliminarTodasBtn) {
        eliminarTodasBtn.addEventListener("click", function () {
            eliminarTodasLasCanciones();
        });
    }

    // Manejar el botón para mostrar todas las canciones
    const mostrarTodasBtn = document.getElementById("mostrar-todas");
    if (mostrarTodasBtn) {
        mostrarTodasBtn.addEventListener("click", function () {
            fetchCanciones();
        });
    }
});

function fetchCanciones() {
    fetch("/api/canciones")
        .then(response => response.json())
        .then(canciones => {
            const listaCanciones = document.getElementById("lista-canciones");
            listaCanciones.innerHTML = "";
            canciones.forEach(cancion => {
                const li = document.createElement("li");
                li.textContent = `ID: ${cancion.id}, Nombre: ${cancion.nombre}, Artista: ${cancion.artista}, Genero: ${cancion.genero}, Duracion: ${cancion.duracion}`;
                listaCanciones.appendChild(li);
            });
        })
        .catch(error => console.error("Error al obtener canciones:", error));
}

function guardarCancion(cancion) {
    fetch("/api/canciones", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cancion)
    })
        .then(response => {
            if (response.ok) {
                alert("Cancion agregada correctamente!");
                window.location.href = "/canciones";
            } else {
                throw new Error("Error al guardar la cancion");
            }
        })
        .catch(error => console.error("Error al guardar la cancion: ", error));
}

function buscarCancionPorId(id) {
    fetch(`/api/canciones/${id}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Cancion no encontrada");
            }
        })
        .then(cancion => {
            const listaCanciones = document.getElementById("lista-canciones");
            listaCanciones.innerHTML = "";
            const li = document.createElement("li");
            li.textContent = `ID: ${cancion.id}, Nombre: ${cancion.nombre}, Artista: ${cancion.artista}, Genero: ${cancion.genero}, Duracion: ${cancion.duracion}`;
            listaCanciones.appendChild(li);
        })
        .catch(error => {
            console.error("Error al buscar la cancion:", error);
            alert("Cancion no encontrada");
        });
}
function buscarCancionPorNombre(nombre){
    fetch(`/api/canciones/${nombre}`)
        .then(response => {if (response.ok){
            return response.json();
        } else {
            throw new Error("Cancion no encontrada");
        }
        }).then(cancion => {
        const listaCanciones =document.getElementById("lista-canciones");
        listaCanciones.innerHTML = "";
        const li = document.createElement("li");
        li.textContent = `ID: ${cancion.id}, Nombre: ${cancion.nombre}, Artista: ${cancion.artista}, Genero: ${cancion.genero}, Duracion: ${cancion.duracion}`;
        listaCanciones.appendChild(li);
    }).catch(error => {console.error("Error al buscar la cancion", error);
        alert("cancion no encontrada");
    });
}

function eliminarCancionPorId(id) {
    fetch(`/api/canciones/${id}`, {
        method: "DELETE"
    })
        .then(response => {
            if (response.ok) {
                alert("Cancion eliminada correctamente!");
                fetchCanciones(); // Actualizar la lista de canciones
            } else {
                throw new Error("Error al eliminar la cancion");
            }
        })
        .catch(error => console.error("Error al eliminar la cancion: ", error));
}

function eliminarTodasLasCanciones() {
    fetch("/api/canciones", {
        method: "DELETE"
    })
        .then(response => {
            if (response.ok) {
                alert("Todas las canciones han sido eliminadas!");
                fetchCanciones(); // Actualizar la lista de canciones
            } else {
                throw new Error("Error al eliminar todas las canciones");
            }
        })
        .catch(error => console.error("Error al eliminar todas las canciones: ", error));
}


