<?php
include 'vars.php';

if (empty($_GET["id"])) {
    http_response_code(400);
    exit("Falta id");
}

$producto_id = $_GET["id"];

if (!is_numeric($producto_id)) {
    http_response_code(400);
    exit("ID inválido");
}

try {
    $conex = new PDO("sqlite:" . $fichero);
    $conex->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $sentencia = $conex->prepare("DELETE FROM Productos WHERE id = :id");
    $sentencia->bindParam(':id', $producto_id, PDO::PARAM_INT);
    $resultado = $sentencia->execute();

    if ($resultado) {
        http_response_code(200);
        echo "Producto eliminado correctamente";
    } else {
        http_response_code(400);
        echo "Error al eliminar el producto";
    }
} catch(PDOException $exc) {
    http_response_code(500);
    echo "Lo siento, ocurrió un error: " . $exc->getMessage();
} finally {
    $conex = null;
}
?>