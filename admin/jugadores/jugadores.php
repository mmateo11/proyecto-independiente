<!DOCTYPE html>
<html lang="es">
<head>  
  <meta charset="UTF-8">
  <title>Admin - Jugadores</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
    th { background: #f4f4f4; }
    button { margin: 0 3px; padding: 5px 10px; cursor: pointer; }
    form { margin-bottom: 20px; }
    input { margin: 5px; padding: 5px; }
  </style>
</head>
<body>
  <?php
// admin/index.php
  $soloCerrarSesion = true;
  include '../../pages/components/header.php';
  ?>
  
  <a href="../index.php">Volver Atras</a>

  <h1>Panel de Administración - Jugadores </h1>

  <form id="playerForm">
    <input type="hidden" id="playerId">
    <input type="text" id="nombre" placeholder="Nombre" required>
    <input type="text" id="posicion" placeholder="Posición" required>
    <input type="number" id="edad" placeholder="edad" required>
    <input type="text" id="lugar_nacimiento" placeholder="lugar nacimiento" required>
    <input type="text" id="nacionalidad" placeholder="nacionalidad" required>
    <input type="number" id="peso" placeholder="peso" required>
    <input type="number" id="dorsal" placeholder="Dorsal" required>
    <input type="url" id="url_imagen" placeholder="URL Imagen" required>
    <button type="submit">Guardar</button>
  </form>

  <table>
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Posición</th>
        <th>Edad</th>
        <th>Lugar nacimiento</th>
        <th>Nacionalidad</th>
        <th>Peso</th>
        <th>Dorsal</th>
        <th>Imagen</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody id="playersTable"></tbody>
  </table>

  <script src="./jugadores.js"></script>
</body>
</html>
