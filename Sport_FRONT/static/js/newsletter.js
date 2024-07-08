document.getElementById('newsletter').addEventListener('submit', function(event) {
    event.preventDefault();
    alert("Muchas gracias por suscribirte, ahora vas a enterarte de todas nuestras novedades!")
    window.location.reload(); 
}) 