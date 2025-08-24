const loginform = document.getElementById('loginform');
const mensaje = document.getElementById('mensaje');

loginform.addEventListener('submit', async (e) => {
e.preventDefault(); // Evita que la página se recargue

const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

try {
    const response = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
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
        if (data.rol === 'admin') {
        // Redirigir al panel de administrador
        window.location.href = '../admin/index.php'; 
    } else {
        // Redirigir a la página principal para usuarios normales
        window.location.href = '../../index.php'; 
    }
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

