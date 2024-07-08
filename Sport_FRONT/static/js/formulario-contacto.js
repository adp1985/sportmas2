const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    telefono: /^(11|[2-9]\d{1,4})\d{6,8}$/ // 7 a 14 números.
}

document.getElementById('form-contacto').addEventListener('submit', function(event) {
    event.preventDefault(); 
    let plan_seleccionado = document.getElementById("plan").value.toLowerCase();
    let servicios_seleccionados = document.querySelectorAll('input[name="servicios"]:checked');
    let limite_servicios;

    // Determinar el límite de selección según el plan elegido
    switch (plan_seleccionado) {
        case 'bronce':
            limite_servicios = 2;
            break;
        case 'plata':
            limite_servicios = 4;
            break;
        case 'oro':
        case 'diamante':
            limite_servicios = servicios_seleccionados.length; // Sin límite para oro y diamante
            break;
        default:
            limite_servicios = 0; // Por defecto, no hay límite
            break;
    }

    let nombre_ingresado = document.getElementById("nombre").value.trim(); 
    let mail_ingresado = document.getElementById("mail").value.trim();
    let telefono_ingresado = document.getElementById("tel").value.trim();
    let resultadoDiv = document.getElementById("resultado"); 
    
    if (nombre_ingresado === "" || mail_ingresado === "" || telefono_ingresado === "") { 
        resultadoDiv.textContent = 'Los campos no pueden estar vacíos, por favor rellénelos.';
        resultadoDiv.style.color = 'yellow';
        return; 
    } 
    if (!expresiones.nombre.test(nombre_ingresado)) {
        resultadoDiv.textContent = 'Por favor, ingrese un nombre válido.';
        resultadoDiv.style.color = 'yellow';
        return; 
    }
    if (!expresiones.telefono.test(telefono_ingresado)) {
        resultadoDiv.textContent = 'Por favor, ingrese un número válido. Recuerde no incluir +54 ni 0 al comienzo.';
        resultadoDiv.style.color = 'yellow';
        return;
    }
    // Validar la cantidad de checkboxes seleccionados
    if (servicios_seleccionados.length > limite_servicios) {
        resultadoDiv.textContent = 'Para el plan ' + plan_seleccionado.charAt(0).toUpperCase() + plan_seleccionado.slice(1) + ', solo puede seleccionar ' + limite_servicios + ' opciones.';
        resultadoDiv.style.color = 'yellow';
        return;
    }
    
    let genero_ingresado = obtenerGeneroSeleccionado();
    let observaciones_consulta = document.getElementById("consulta-textarea").value;
    let tieneAptoFisico = document.getElementById("aptofisico").value;
    let datos = {
        nombre: nombre_ingresado,
        mail: mail_ingresado,
        tel: telefono_ingresado,
        genero: genero_ingresado,
        servicios: Array.from(servicios_seleccionados).map(servicio => servicio.value),
        plan: plan_seleccionado,
        consulta: observaciones_consulta,
        aptofisico: tieneAptoFisico
    };
    
    enviarDatosAlBackEnd(datos)
        .then(response => {
            if (response.ok) {
                alert('¡Muchas gracias por inscribirte a Sport+! ¡Te esperamos!');
                resultadoDiv.textContent = 'Datos enviados correctamente.';
                resultadoDiv.style.color = 'green';
                // Resetear el formulario solo si los datos fueron enviados correctamente
                document.getElementById('form-contacto').reset();
            } else {
                throw new Error('Error al enviar los datos');
            }
        })
        .catch(err => {
            resultadoDiv.textContent = 'Error al enviar los datos. Por favor, inténtelo nuevamente.';
            resultadoDiv.style.color = 'red';
            console.error('Error:', err);
        });
});

function obtenerGeneroSeleccionado() {
    // Obtener todos los elementos de radio con name="genero"
    var radios = document.getElementsByName('genero');
  
    // Recorrer los radios para encontrar el que está seleccionado
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        return radios[i].value; // Devolver el valor del radio seleccionado
      }
    }
  
    return null; // Si ningún radio está seleccionado, devolver null o manejar el caso según sea necesario
}

function enviarDatosAlBackEnd(datos) {
    let url = "https://sportmas2.pythonanywhere.com/clientes";
    var options = {
        body: JSON.stringify(datos),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    
    return fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('La red no responde');
            }
            return response;
        });
}
