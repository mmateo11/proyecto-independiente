<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Header</title>
</head>
<body>

    <header>
    <?php if(isset($soloCerrarSesion) && $soloCerrarSesion === true): ?>
    <a class="boton-link" href="#" onclick="cerrarSesion(event)">Cerrar sesión</a>
    <?php else: ?>

    <a href="/proyecto/index.php" class="logo">
        <img src="/proyecto/assets/img/independiente-logo.png" alt="logo">
    </a>
        
    <div class="botones-nav">
        <a class="boton-link" href="/proyecto/pages/partidos/partidos.php">Entradas Digitales</a>
        <a class="boton-link" id="btnsocios" href="#">Asociate</a>
        <a class="boton-link" id="btnsededigital" href="#">Sede Digital</a>
        <a class="boton-link" id="btncerrarsesion" href="#" >Cerrar sesión</a>
    </div>
    <?php endif; ?>
    </header>

</body>
</html>
