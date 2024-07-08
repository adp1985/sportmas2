function modificar() {
    let id = document.getElementById("id").value;
    let nombre_ingresado = document.getElementById("nombre").value.trim(); 
    let mail_ingresado = document.getElementById("mail").value.trim();
    let telefono_ingresado = document.getElementById("telefono").value.trim();
    let genero_ingresado = obtenerGeneroSeleccionado();
    let servicios_seleccionados = Array.from(document.querySelectorAll('input[name="servicios"]:checked')).map(checkbox => checkbox.value);
    let plan_seleccionado = document.getElementById("plan").value;
    let observaciones_consulta = document.getElementById("consulta-textarea").value;
    let tieneAptoFisico = document.getElementById("aptofisico").value;

    let datos = {
        id: id,
        nombre: nombre_ingresado,
        mail: mail_ingresado,
        tel: telefono_ingresado,
        genero: genero_ingresado,
        servicios: servicios_seleccionados.join(","),
        plan: plan_seleccionado,
        consulta: observaciones_consulta,
        aptofisico: tieneAptoFisico
    };

    console.log(datos);
    enviarDatosAlBackEnd(datos, id);
}

function enviarDatosAlBackEnd(datos, id){
    let url = "https://sportmas2.pythonanywhere.com/clientes/" + id;
    var options = {
        body: JSON.stringify(datos),
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow'
    };
    fetch(url, options)
        .then(function () {
            console.log("modificado");
            alert("Registro modificado");

            // Redirigir a la página de clientes
            window.location.href = "../../templates/admin/tabla_clientes.html";
        })
        .catch(err => {
            console.error(err);
            alert("Error al Modificar");
        });
}

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