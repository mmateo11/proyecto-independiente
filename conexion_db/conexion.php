<?php
$conexion = new mysqli("localhost", "root", "", "independiente");

// Verificar conexión
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}
