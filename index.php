<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Independiente</title>
    <link rel="stylesheet" href="estilos/index.css">
    <link rel="stylesheet" href="estilos/carrusel.css">
    <link href='https://cdn.boxicons.com/fonts/basic/boxicons.min.css' rel='stylesheet'>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
</head>
<body>
    <header>

        <div class="logo">
            <img src="img/logo.png" alt="logo">
            <p>INDEPENDIENTE</p>
        </div>
            
        <nav>
            <a href="">Entradas digitales</a>
            <a href="">Asociate</a>
            <a href="">Sede Digital</a>
        </nav>

    </header>

    <div class="content">

        <div class="noticia1">

           <?php
           include 'conexion_db/conexion.php';
            $sql = "SELECT * FROM noticias WHERE tipo='principal' ORDER BY fecha DESC LIMIT 4";
            $resultado = $conexion->query($sql);
            while($noticia = $resultado->fetch_assoc()) {
                echo "<div class='noticia-principal' style='background-image: url(\"{$noticia['img']}\");'>";
                echo "<h2>{$noticia['titulo']}</h2>";
                echo "<p>{$noticia['contenido']}</p>";
                echo "</div>";  
            }
            $conexion->close();
        ?>
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

    <div class="mas-noticias">

      <div class="titulo">
      <h2>Más noticias</h2>
      </div>
        
      <div class="contenedor-noticias"> 
          <div class="content-noticias">
              <img src="img/img1.jpeg" alt="">
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing
                  elit. Officiis doloribus harum, nobis et voluptatum quod
              </p>
          </div>

          <div class="content-noticias">
              <img src="img/img1.jpeg" alt="">
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing
                  elit. Officiis doloribus harum, nobis et voluptatum quod
              </p>
          </div>

          <div class="content-noticias">
              <img src="img/img1.jpeg" alt="">
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing
                  elit. Officiis doloribus harum, nobis et voluptatum quod
              </p>
          </div>

          <div class="content-noticias">
              <img src="img/img1.jpeg" alt="">
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing
                  elit. Officiis doloribus harum, nobis et voluptatum quod
              </p>
          </div>
        </div>
    </div>

    <h1 class="jugadores-title">Plantel de jugadores</h1>

      <div class="carousel-container">
        <div class="carousel">
            <?php

            include 'conexion_db/conexion.php';

            // Consulta SQL para obtener los jugadores
            $sql = "SELECT nombre, posicion, imagen_url, descripcion FROM jugadores";
            $resultado = $conexion->query($sql);
            
            // Genera las cartas
            if ($resultado->num_rows > 0) {
                while($jugador = $resultado->fetch_assoc()) {
                    echo '<div class="player-card">
                            <div class="player-image">
                                <img src="' . $jugador['imagen_url'] . '" alt="' . $jugador['descripcion'] . '" />
                            </div>
                            <div class="player-info">
                                <div class="player-name">' . $jugador['nombre'] . '</div>
                                <div class="player-position">' . $jugador['posicion'] . '</div>
                            </div>
                          </div>';
                }
            } else {
                echo "<p>No hay jugadores disponibles</p>";
            }
             $conexion->close();
            ?>
        </div>
    </div>
<script src="script.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>

<footer class="footer">
  <div class="footer-content">
    <p>&copy; 2025 Club Atlético Independiente</p>
    <p>Diseñado para hinchas del Rojo ❤️</p>
  </div>
</footer>

</html>