<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Header</title>
</head>
<body>

    <header>

    <a href="../index.php" class="logo">
        <img src="assets/img/independiente-logo.png" alt="logo">
    </a>
        
    <div class="botones-nav">
        <a class="boton-link" href="#">Entradas Digitales</a>
        <a class="boton-link" href="#">Asociate</a>
        <a class="boton-link" href="#">Sede Digital</a>
        <a class="boton-link" href="#" onclick="cerrarSesion(event)">Cerrar sesión</a>
    </div>
    <script>
        function cerrarSesion(event) {
        // Esto previene que el navegador siga el enlace (#)
        event.preventDefault(); 
        
        // Eliminar el token de localStorage
        localStorage.removeItem('token'); 
        
        // Redirigir al usuario a la página de login
        window.location.href = "/proyecto/pages/auth/login.html"; 
        }
    </script>  

    </header>
    
</body>
</html>
