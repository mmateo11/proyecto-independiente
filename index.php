<!DOCTYPE html>
<html lang="es">
<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Independiente</title>
    <link rel="stylesheet" href="API/node_modules/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="API/node_modules/bootstrap-icons/font/bootstrap-icons.css">
    <link rel="stylesheet" href="assets/estilos/index.css">
    <link rel="stylesheet" href="pages/components/header.css">
    <link rel="stylesheet" href="pages/components/footer.css">
    <link rel="stylesheet" href="assets/estilos/carrusel.css">
    <link rel="stylesheet" href="assets/estilos/copas.css">
</head>
<body>

  <?php
  include "pages/components/header.php";
  ?>

  <div class="cabecera clearfix pb-1 pb-sm-2">
    
    <div class="float-right float-sm-left clearfix">
        <ul id="sociales" class="list-unstyled d-inline-block mt-4 mr-3">
            <li class="list-inline-item">
                <a href="//twitter.com/Independiente" target="_blank">
                    <span class="bi bi-twitter"></span>
                </a>
            </li>
        </ul>
    </div>

  </div>

  <div class="content">

    <div class="noticia1">

      <h2>NOTICIA</h2>
      <P>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa,
      consequatur ipsam iste voluptate eveniet numquam nemo. Quaerat necessitatibus,
      nihil eum consectetur doloremque quisquam facilis eaque. Sequi necessitatibus expedita sunt officia?</P>    

    </div>

    <div class="noticia1">

        <h2>NOTICIA</h2>
        <P>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa,
        consequatur ipsam iste voluptate eveniet numquam nemo. Quaerat necessitatibus,
        nihil eum consectetur doloremque quisquam facilis eaque. Sequi necessitatibus expedita sunt officia?</P>    

    </div>

    <div class="noticia1">

        <h2>NOTICIA</h2>
        <P>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa,
        consequatur ipsam iste voluptate eveniet numquam nemo. Quaerat necessitatibus,
        nihil eum consectetur doloremque quisquam facilis eaque. Sequi necessitatibus expedita sunt officia?</P>    

    </div>

    <div class="noticia1">

        <h2>NOTICIA</h2>
        <P>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa,
        consequatur ipsam iste voluptate eveniet numquam nemo. Quaerat necessitatibus,
        nihil eum consectetur doloremque quisquam facilis eaque. Sequi necessitatibus expedita sunt officia?</P>    

    </div>

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
    <div class="noticia-flex-item">
      <div class="noticia-overlay">
        <img src="assets/img/img1.jpeg" alt="">
        <div class="noticia-texto">Título noticia 2</div>
      </div>
      <p class="noticia-descripcion">
        Texto descriptivo de la noticia 2.
      </p>
    </div>
    <div class="noticia-flex-item">
      <div class="noticia-overlay">
        <img src="assets/img/img1.jpeg" alt="">
        <div class="noticia-texto">Título noticia 3</div>
      </div>
      <p class="noticia-descripcion">
        Texto descriptivo de la noticia 3.
      </p>
    </div>
    <div class="noticia-flex-item">
      <div class="noticia-overlay">
        <img src="assets/img/img1.jpeg" alt="">
        <div class="noticia-texto">Título noticia 4</div>
      </div>
      <p class="noticia-descripcion">
        Texto descriptivo de la noticia 4.
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