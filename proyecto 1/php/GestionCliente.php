<?php
include 'vars.php';

# Verificar si se enviaron los parámetros requeridos
if (empty($_GET["id_cliente"])) {
    http_response_code(400);
    exit("Falta el ID del cliente");
}

if (empty($_GET["nombre"])) {
    http_response_code(400);
    exit("Falta el nombre del cliente");
}

if (empty($_GET["apellidos"])) {
    http_response_code(400);
    exit("Falta el apellido del cliente");
}

if (empty($_GET["correo"])) {
    http_response_code(400);
    exit("Falta el correo del cliente");
}

$id_cliente = $_GET["id_cliente"];
$nombre = $_GET["nombre"];
$apellidos = $_GET["apellidos"];
$correo = $_GET["correo"];

try {
    # Crear una nueva conexión a la base de datos
    $conex = new PDO("sqlite:" . $fichero);
    $conex->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    # Preparar la consulta para insertar los datos del cliente
    $sentencia = $conex->prepare("INSERT INTO Cliente(id_cliente, nombre, apellidos, correo) VALUES (:id_cliente, :nombre, :apellidos, :correo);");
    $sentencia->bindParam(':id_cliente', $id_cliente);
    $sentencia->bindParam(':nombre', $nombre);
    $sentencia->bindParam(':apellidos', $apellidos);
    $sentencia->bindParam(':correo', $correo);

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
