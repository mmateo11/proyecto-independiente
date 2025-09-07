<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Independiente</title>
    <link rel="stylesheet" href="API/node_modules/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="API/node_modules/bootstrap-icons/font/bootstrap-icons.css">
    <link rel="stylesheet" href="assets/estilos/index.css">
    <link rel="stylesheet" href="assets/estilos/login.css">
    <link rel="stylesheet" href="pages/components/header.css">
    <link rel="stylesheet" href="pages/components/footer.css">
    <link rel="stylesheet" href="assets/estilos/carrusel.css">
    <link rel="stylesheet" href="assets/estilos/copas.css">
    <!-- SweetAlert2 CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">
    <!-- SweetAlert2 JS -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.all.min.js"></script>

</head>
<body>

  <?php
  include "pages/components/header.php";
  ?>

  <div id="modalSocio" class="modal">
    <div class="modal-content">
      <span id="cerrarModal" class="cerrar">&times;</span>
      <h2>Hacerse Socio</h2>
      <form id="formSocio" method="POST">
        <label for="nombre">Nombre y Apellido</label>
        <input type="text" id="nombre" name="nombre" required />

        <label for="fecha_nac">Fecha de Nacimiento</label>
        <input type="date" id="fecha_nac" name="fecha_nac" required />

        <label for="email">Correo</label>
        <input type="email" id="email" name="email" required />

        <label for="password">Contraseña</label>
        <input type="password" id="password" name="password" required />

        <label for="metodo_pago">Método de Pago</label>
        <select id="metodo_pago" name="metodo_pago" required>
          <option value="">Seleccionar</option>
          <option value="TARJETA">Tarjeta</option>
          <option value="MERCADOPAGO">MercadoPago</option>
          <option value="PAYPAL">PayPal</option>
          <option value="EFECTIVO">Efectivo</option>
        </select>
    
        <button type="submit">Registrarse</button>
        <button type="button" id="btnIniciarSesion">¿Ya tenés cuenta? Iniciar sesión</button>
        
      </form>
    </div>
    <script src="/proyecto/pages/socios/login.js"></script>
  </div>

  

    <div class="d-flex justify-content-between align-items-center" id="cabecera">
      <!-- Redes sociales a la izquierda -->
      <ul class="d-flex gap-4" id="sociales">
          <li><a href="//x.com/Independiente" target="_blank"><span class="bi bi-twitter"></span></a></li>
          <li><a href="//instagram.com/independiente" target="_blank"><span class="bi bi-instagram"></span></a></li>
          <li><a href="//facebook.com/Independiente" target="_blank"><span class="bi bi-facebook"></span></a></li>
          <li><a href="//youtube.com/Independiente" target="_blank"><span class="bi bi-youtube"></span></a></li>
      </ul>

      <!-- Sponsors a la derecha -->
      <ul class="d-flex gap-4" id="sponsors">
          <li><a href="#"><img src="" alt="Sponsor 1" height="30"></a></li>
          <li><a href="#"><img src="" alt="Sponsor 2" height="30"></a></li>
          <li><a href="#"><img src="ruta_logo3.png" alt="Sponsor 3" height="30"></a></li>
      </ul>
  </div>



  <div class="principales">

  <script src="pages/noticias/noticias.js"></script>
  </div>

  <div class="container my-5">

    <h1 class="jugadores-title">Multimedia</h1>
    <!-- Video grande arriba -->
    <div class="row justify-content-center mb-4">
      <div class="col-12 col-md-8">
        <div class="ratio ratio-16x9">
          <iframe src="https://www.youtube.com/embed/BEXX7YuR6Ks" title="Video 1" allowfullscreen></iframe>
        </div>
      </div>
    </div>

    <!-- Dos videos abajo -->
    <div class="row justify-content-center g-3">
      <div class="col-6 col-md-4">
        <div class="ratio ratio-16x9">
          <iframe src="https://www.youtube.com/embed/KCpFH_4KjNM" title="Video 2" allowfullscreen></iframe>
        </div>
      </div>
      <div class="col-6 col-md-4">
        <div class="ratio ratio-16x9">
          <iframe src="https://www.youtube.com/embed/uCjIZg5hMmk" title="Video 3" allowfullscreen></iframe>
        </div>
      </div>
    </div>

  </div>

  <div class="noticias-flex">
    <div class="noticia-flex-item">
      <div class="noticia-overlay">
        <img src="assets/img/img1.jpeg" alt="">
        <div class="noticia-texto">Titulo de noticia 1</div>
      </div>
      <p class="noticia-descripcion">
        Texto descriptivo de la noticia 1.
      </p>
    </div>
</div>

<div class="carousel-container">
    <button class="carousel-button prev">‹</button>
    <div class="carousel-track-container">
        <ul class="carousel-track">
            <!-- Las tarjetas de los jugadores -->
        </ul>
    </div>
    <button class="carousel-button next">›</button>
</div>

<script src="pages/jugadores/jugadores.js"></script>

    
<div class="copas-lista">
  <div class="titulo">
    <h2>Rey de copas</h2>
  </div>
    <a href="libertadores.html" class="copa-item">
      <div class="copa-item-imgbox">
        <img src="assets/img/copas/libertadores.png" alt="Libertadores">
        <span class="copa-cantidad">7</span>
      </div>
      <span class="copa-nombre">Libertadores</span>
    </a>
    <a href="interamericana.html" class="copa-item">
      <div class="copa-item-imgbox">
        <img src="assets/img/copas/interamericana.png" alt="Interamericana">
        <span class="copa-cantidad">3</span>
      </div>
      <span class="copa-nombre">Interamericana</span>
    </a>
  <!-- Repite para cada copa -->
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
crossorigin="anonymous"></script>

<?php
  include "pages/components/footer.php";
?>

</body>
</html>