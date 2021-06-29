import Anuncio_mascota from "./Anuncio_mascota.js";

let anuncios = [];
let anunciosFiltrados = [];


const getCocineros = () => {

    //Instanciar obj xmlHTTP
    const xhr = new XMLHttpRequest();
    //Asignar un handler a la peticion


    xhr.onreadystatechange = () => {

        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 299) {
                anuncios = JSON.parse(xhr.responseText);
                if (anuncios.length > 0) {
                    handlerLoadList(anuncios);
                }

            } else {
                const statusText = xhr.statusText || "ocurrio un error";
                console.error(`Error: ${xhr.status} : ${statusText}`);

            }

        }

    };

    //abrir la peticion
    xhr.open("GET", "http://127.0.0.1:5000/mascotas/");
    //enviar peticion
    xhr.send();
}
const altaAnuncio = (anuncio) => {

    //Instanciar obj xmlHTTP
    const xhr = new XMLHttpRequest();
    //Asignar un handler a la peticion


    xhr.onreadystatechange = () => {



        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 299) {
                data = JSON.parse(xhr.responseText);
                console.log(data);

            } else {
                const statusText = xhr.statusText || "ocurrio un error";
                console.error(`Error: ${xhr.status} : ${statusText}`);

            }

        }

    };

    //abrir la peticion
    xhr.open("POST", "http://127.0.0.1:5000/mascotas/");
    //Seteamos las cabeceras
    xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    //enviar peticion
    xhr.send(JSON.stringify(anuncio));
}
const updateAnuncio = (anuncio, id) => {

    //Instanciar obj xmlHTTP
    const xhr = new XMLHttpRequest();
    //Asignar un handler a la peticion


    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 299) {
                data = JSON.parse(xhr.responseText);
                console.log(data);

            } else {
                const statusText = xhr.statusText || "ocurrio un error";
                console.error(`Error: ${xhr.status} : ${statusText}`);

            }

        }

    };

    //abrir la peticion
    xhr.open("PUT", "http://127.0.0.1:5000/mascotas/" + id);
    //Seteamos las cabeceras
    xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    //enviar peticion
    xhr.send(JSON.stringify(anuncio));
}
const deleteAnuncio = (id) => {

    //Instanciar obj xmlHTTP
    const xhr = new XMLHttpRequest();
    //Asignar un handler a la peticion

    xhr.onreadystatechange = () => {



        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 299) {
                data = JSON.parse(xhr.responseText);
                console.log(data);

            } else {
                const statusText = xhr.statusText || "ocurrio un error";
                console.error(`Error: ${xhr.status} : ${statusText}`);

            }

        }

    };

    //abrir la peticion
    xhr.open("DELETE", `http://127.0.0.1:5000/mascotas/${id}`);

    //enviar peticion
    xhr.send();
}

window.addEventListener("DOMContentLoaded", () => {

    document.forms[0].addEventListener("submit", handlerSubmit);
    
    document.addEventListener("click", handlerClick);
    getCocineros();

})

function handlerSubmit(e) {
    e.preventDefault();
    const frm = e.target;

    if (frm.id.value) {
        let id = parseInt(frm.id.value);
        const anuncioEditado = new Anuncio_mascota(
            parseInt(frm.id.value),
            frm.titulo.value,
            "Venta",
            frm.descripcion.value,
            frm.precio.value,
            frm.tipo.value,
            frm.raza.value,
            frm.fecha.value,
            frm.vacuna.value
        );
        if (confirm("Confirma modificacion?")) {
            agregarSpinner();

            setTimeout(() => {
                updateAnuncio(anuncioEditado, id);
                eliminarspinner();
            }, 2000);
        }
    } else {
        console.log("Dando de alta");
        const nuevoAnuncio = new Anuncio_mascota(
            Date.now(),
            frm.titulo.value,
            "Venta",
            frm.descripcion.value,
            frm.precio.value,
            frm.tipo.value,
            frm.raza.value,
            frm.fecha.value,
            frm.vacuna.value

        );
        agregarSpinner();

        setTimeout(() => {
            altaAnuncio(nuevoAnuncio);
            eliminarspinner();
        }, 2000);
    }

    limpiarForm(e.target);
}


function handlerClick(e) {
    if (e.target.matches("td")) {
        const id = e.target.parentNode.dataset.id;
        console.log(id);
        cargarFrm(id);
    } else if (e.target.matches("#btnEliminar")) {
        let id = parseInt(document.forms[0].id.value);
        if (confirm("Confirma baja?")) {
            agregarSpinner();
            setTimeout(() => {

                deleteAnuncio(id);
                eliminarspinner();
            }, 2000);
        }
        limpiarForm(document.forms[0]);
    } else if (e.target.matches("#btnCancelar")) {
        limpiarForm(document.forms[0]);
    }
}
function handlerLoadList(e) {
    renderizarLista(crearTabla(anuncios), document.getElementById("divLista"));
}
function renderizarLista(lista, contenedor) {
    
    while (contenedor.hasChildNodes()) {
        contenedor.removeChild(contenedor.firstChild);
    }
    if (lista) {
        contenedor.appendChild(lista);
    }
}


function crearTabla(items) {
    const tabla = document.createElement("table");
    tabla.appendChild(crearThead(items[0]));
    tabla.appendChild(crearTbody(items));
    
    return tabla;
}

function crearThead(item) {
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');

    for (const key in item) {
        if (key !== "id") {
            const th = document.createElement('th');
            th.style.backgroundColor = "Green";
            th.textContent = key;
            tr.appendChild(th);
        }
    }
    thead.appendChild(tr);
    return thead;
}
function crearTbody(items) {
    const tbody = document.createElement('tbody');
    items.forEach(item => {
        const tr = document.createElement('tr');
        for (const key in item) {
            if (key === "id") {
                tr.setAttribute("data-id", item[key])
            }
            else {
                const td = document.createElement('td');
                const texto = document.createTextNode(item[key]);
                td.appendChild(texto);
                tr.appendChild(td);
            }
        }
        tbody.appendChild(tr);
    });
    return tbody;
}
function agregarSpinner() {
    let spinner = document.createElement("img");
    spinner.setAttribute("src", "./assets/spinner.gif");
    spinner.setAttribute("alt", "imagen spinner");
    document.getElementById("spinner-container").appendChild(spinner);
}
function eliminarspinner() {
    document.getElementById("spinner-container").innerHTML = "";
}
function limpiarForm(frm) {
    frm.reset();
    document.getElementById("btnEliminar").classList.add("oculto");
    document.getElementById("btnCancelar").classList.add("oculto");
    document.getElementById("btnSubmit").value = "Alta anuncio";
    document.forms[0].id.value = "";
}
function cargarFrm(id) {

    const { titulo, descripcion, precio, transaccion, tipo, raza, fecha, vacuna } = anuncios.filter((a) => a.id === parseInt(id))[0];
    const form = document.forms[0];
    form.titulo.value = titulo;
    form.descripcion.value = descripcion;
    form.precio.value = precio;
    form.tipo.value = tipo;
    form.raza.value = raza;
    form.fecha.value = fecha;
    form.vacuna.value = vacuna;
    form.id.value = id;
    document.getElementById("btnSubmit").value = "Modificar";
    document.getElementById("btnEliminar").classList.remove("oculto");
    document.getElementById("btnCancelar").classList.remove("oculto");

}


