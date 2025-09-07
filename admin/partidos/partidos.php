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

  <h1>Panel de Administración - Partidos </h1>

    <form id="partidoForm">
        <input type="hidden" id="partidoId">
        <input type="text" id="rival" placeholder="rival" required>
        <input type="number" id="golesLocal" placeholder="Goles Independiente" min="0" required>
        <input type="number" id="golesRival" placeholder="Goles Rival" min="0" required>
        <input type="date" id="fecha" name="fecha" required>
        <button type="submit">Guardar</button>
    </form>

  <table>
    <thead>
      <tr>
        <th>Rival</th>
        <th>Resultado</th>
        <th>fecha</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody id="partidoTable"></tbody>
  </table>

  <script src="./partidos.js"></script>
</body>
</html>
