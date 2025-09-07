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

  <h1>Panel de Administración - noticias </h1>

  <form id="noticiaForm">
    <input type="hidden" id="noticiaId">
    <input type="text" id="titulo" placeholder="titulo" required>
    <select id="tipo" required>
        <option value="PRINCIPAL">PRINCIPAL</option>
        <option value="SECUNDARIO">SECUNDARIO</option>
    </select>
    <input type="text" id="descripcion" placeholder="descripcion" required>
    <input type="url" id="url_imagen" placeholder="URL Imagen" required>
    <button type="submit">Guardar</button>
</form>

  <table>
    <thead>
      <tr>
        <th>titulo</th>
        <th>tipo</th>
        <th>descripcion</th>
        <th>fecha</th>
        <th>url_imagen</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody id="noticiaTable"></tbody>
  </table>

  <script src="./noticias.js"></script>
</body>
</html>
