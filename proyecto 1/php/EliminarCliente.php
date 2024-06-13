<?php
include 'vars.php';

# Verificar si vienen los parámetros requeridos
if (empty($_GET["id_cliente"])) {
    http_response_code(400);
    exit("Falta id");
}

$id_cliente = $_GET["id_cliente"];

if (!is_numeric($id_cliente)) {
    http_response_code(400);
    exit("ID inválido");
}

try {
    # Crear una nueva conexión a la base de datos
    $conex = new PDO("sqlite:" . $fichero);
    $conex->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    # Preparar la consulta para eliminar el cliente
    $sentencia = $conex->prepare("DELETE FROM Cliente WHERE id_cliente = :id_cliente");
    $sentencia->bindParam(':id_cliente', $id_cliente, PDO::PARAM_INT);
    $resultado = $sentencia->execute();

    # Si se eliminó el cliente correctamente, responder con un mensaje de éxito
    if ($resultado) {
        http_response_code(200);
        echo "Cliente eliminado correctamente";
    } else {
        http_response_code(400);
        echo "Error al eliminar el cliente";
    }
} catch(PDOException $exc) {
    http_response_code(500);
    echo "Lo siento, ocurrió un error: " . $exc->getMessage();
} finally {
    # Cerrar la conexión a la base de datos
    $conex = null;
}
?>
