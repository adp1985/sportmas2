let cadena = location.search; // Cadena con los símbolos & y =

// Crear un objeto URLSearchParams con la cadena
// El objeto URLSearchParams en JavaScript es una
// interfaz que proporciona métodos y propiedades para
// trabajar con las cadenas de consulta (query strings) en URLs.
// Facilitando la obtención de parámetros y valores individuales
let datos = new URLSearchParams(cadena);

// Crear un objeto para almacenar los nombres de las variables y sus valores
let resultado = {};

// Iterar sobre los parámetros y guardar los nombres y valores en el objeto resultado
for (const [nombre, valor] of datos) {
    resultado[nombre] = valor;
}

// Imprimir el resultado
console.log(resultado); // Esto mostrará un objeto con las variables y sus valores


// Procedimiento para mostrar los datos a editar en el formulario de edición
document.getElementById("id").value = resultado["id"];
document.getElementById("nombre").value = resultado["nombre"];
document.getElementById("mail").value = resultado["mail"];
document.getElementById("telefono").value = resultado["tel"];

let generoSeleccionado = resultado["genero"];
let radiosGenero = document.getElementsByName("genero");
for (let radio of radiosGenero) {
    if (radio.value === generoSeleccionado) {
        radio.checked = true;
        break;
    }
}

if (resultado["servicios"]) {
    let serviciosSeleccionados = resultado["servicios"].split(",");
    serviciosSeleccionados.forEach(servicio => {
        let checkbox = document.getElementById(servicio.trim());
        if (checkbox) {
            checkbox.checked = true;
        }
    });
}

document.getElementById("plan").value = resultado["plan"];
document.getElementById("consulta-textarea").value = resultado["consulta"];
document.getElementById("aptofisico").value = resultado["aptofisico"];