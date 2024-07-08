const form = document.querySelector('form');
const sectionLogin = document.getElementById('container_login');
const sectionConsultas = document.getElementById('container_consultasclientes');

// Función para guardar los datos de acceso en localStorage
function guardarDatosAcceso(username) {
    localStorage.setItem('username', username);
}

// Función para comprobar si hay datos de acceso guardados en localStorage
function comprobarDatosAccesoGuardados() {
    const username = localStorage.getItem('username');
    if (username) {
        // Mostrar la sección de consultas de clientes si hay un usuario guardado
        sectionConsultas.style.display = 'flex';
        // Ocultar la sección de login
        sectionLogin.style.display = 'none';
    }
}

// Comprobar si ya hay datos de acceso guardados al cargar la página
comprobarDatosAccesoGuardados();

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === '1234') {
        // Guardar el nombre de usuario en localStorage
        guardarDatosAcceso(username);

        // Mostrar la sección de consultas de clientes si el inicio de sesión es exitoso
        sectionConsultas.style.display = 'flex';
        // Ocultar la sección de login
        sectionLogin.style.display = 'none';
    } else {
        // Mostrar mensaje de error u otra lógica si el inicio de sesión falla
        alert('Usuario o contraseña incorrectos');
    }

});
