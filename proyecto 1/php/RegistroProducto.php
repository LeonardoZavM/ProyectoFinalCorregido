<?php

include 'vars.php';

# Verificar si se enviaron los parámetros requeridos
if (empty($_GET["id"])) {
    http_response_code(400);
    exit("Falta el ID");
}

if (empty($_GET["nombre"])) {
    http_response_code(400);
    exit("Falta el nombre");
}

if (empty($_GET["categoria"])) {
    http_response_code(400);
    exit("Falta la categoria");
}

if (empty($_GET["stock"])) {
    http_response_code(400);
    exit("Falta el stock");
}

if (empty($_GET["proveedor"])) {
    http_response_code(400);
    exit("Falta el proveedor");
}

$id = $_GET["id"];
$nombre = $_GET["nombre"];
$categoria = $_GET["categoria"];
$stock = $_GET["stock"];
$proveedor = $_GET["proveedor"];

try {
    # Crear una nueva conexión a la base de datos
    $conex = new PDO("sqlite:" . $fichero);
    $conex->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    # Preparar la consulta para insertar los datos del producto
    $sentencia = $conex->prepare("INSERT INTO Productos(id, nombre, categoria, stock, proveedor) VALUES (:id, :nombre, :categoria, :stock, :proveedor);");
    $sentencia->bindParam(':id', $id);
    $sentencia->bindParam(':nombre', $nombre);
    $sentencia->bindParam(':categoria', $categoria);
    $sentencia->bindParam(':stock', $stock);
    $sentencia->bindParam(':proveedor', $proveedor);

    # Ejecutar la consulta
    $resultado = $sentencia->execute();

    # Si se insertaron los datos correctamente, responder con un mensaje de éxito
    if ($resultado) {
        http_response_code(200);
        echo "Datos insertados correctamente";
    } else {
        http_response_code(400);
        echo "Error al insertar los datos";
    }
} catch(PDOException $exc) {
    http_response_code(500);
    echo "Lo siento, ocurrió un error: " . $exc->getMessage();
} finally {
    # Cerrar la conexión a la base de datos
    $conex = null;
}
?>
