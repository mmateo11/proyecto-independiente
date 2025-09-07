<!DOCTYPE html>
<html lang="es">
<head>  
  <meta charset="UTF-8">
  <title>Admin - Jugadores</title>
</head>
<body>
  <?php
// admin/index.php
  $soloCerrarSesion = true;
  include '../pages/components/header.php';
  ?>

  <h1>Selecciona una entidad para gestionar</h1>


  <ul>
    <li>
      <a href="./jugadores/jugadores.php">Gestión de Jugadores</a>
    </li>
    <li>
      <a href="./noticias/noticias.php">Gestión de noticias</a>
    </li>
    <li>
      <a href="./partidos/partidos.php">Gestión de partidos</a>
    </li>
  </ul>

  </body>
</html>
