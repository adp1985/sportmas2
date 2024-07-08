
document.getElementById('formularioconsultas').addEventListener('submit', function(event) {
    event.preventDefault(); 
    let nombre = document.getElementById("nombre").value.trim(); 
    let resultadoDiv = document.getElementById("Resultado-Nombre"); 
    if (nombre === "") { 
        resultadoDiv.textContent = 'Los campos no pueden estar vacios, por favor rellénelos.';
        resultadoDiv.style.color = 'yellow';
        return; 
    } 
    if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(nombre)){
        resultadoDiv.textContent = 'Por favor, ingrese un nombre válido.';
        resultadoDiv.style.color = 'yellow';
        return; 
    }
    alert("Muchas gracias por mandarnos tu consulta, te responderemos lo más rápido posible!");
    window.location.reload(); 
})
 