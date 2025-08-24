const form = document.getElementById('registerform');
const mensaje = document.getElementById('mensaje');

form.addEventListener('submit', async (e) => {
e.preventDefault(); // evita que se recargue la página

const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

try {
const response = await fetch('http://localhost:3000/auth/register', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ email, password }) // aquí se manda el body
});

const data = await response.json();

if (!response.ok) {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: data.error || 'Credenciales inválidas',
        timer: 1000,
        showConfirmButton: false
    });
    } else {
    Swal.fire({
        icon: 'success',
        title: 'Login exitoso',
        text: data.message || 'Bienvenido!',
        timer: 1000,
        showConfirmButton: false
    }).then(() => {
        window.location.href = '../../index.php'; // ajusta según tu estructura de carpetas
    });
    }

} catch (error) {
    Swal.fire({
    icon: 'error',
    title: 'Error de conexión',
    text: 'No se pudo conectar con el servidor',
    timer: 3000,
    showConfirmButton: false
    });
}
});