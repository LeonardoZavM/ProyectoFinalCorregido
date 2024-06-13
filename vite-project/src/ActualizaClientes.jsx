import React, { useState } from "react";

export const ActualizaClientes = () => {
    const [formState, setFormState] = useState({
        id: "",
        nombre: "",
        apellidos: "",
        correo: ""
    });
    const [message, setMessage] = useState("");

    const { id, nombre, apellidos, correo } = formState;

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({ ...formState, [name]: value });
    };

    const validateForm = () => {
        if (!id || !nombre || !apellidos || !correo) {
            setMessage("Todos los campos son obligatorios.");
            return false;
        }
        if (!/^\S+@\S+\.\S+$/.test(correo)) {
            setMessage("Correo no es válido.");
            return false;
        }
        return true;
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        setMessage("");

        if (!validateForm()) {
            return;
        }

        const parametros = `id=${id}&nombre=${nombre}&apellido=${apellidos}&correo=${correo}`;
        console.log(`http://localhost/proyecto1/php/CambioCliente.php?${parametros}`);

        try {
            const response = await fetch(`http://localhost/proyecto1/php/CambioCliente.php?${parametros}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            if (response.ok) {
                const data = await response.text();
                setMessage("Operación correcta: " + data);
            } else {
                setMessage('Error en la solicitud: ' + response.status);
            }
        } catch (error) {
            setMessage('Error de red: ' + error.message);
        }
    };

    return (
        <form className="w3-container" onSubmit={onSubmit}>
            <p>
                <label className="w3-text-black"><b>Id</b></label>
                <input
                    className="w3-input w3-border w3-gray"
                    name="id"
                    type="text"
                    value={id}
                    onChange={onInputChange}
                />
            </p>
            <p>
                <label className="w3-text-black"><b>Nombre</b></label>
                <input
                    className="w3-input w3-border w3-gray"
                    name="nombre"
                    type="text"
                    value={nombre}
                    onChange={onInputChange}
                />
            </p>
            <p>
                <label className="w3-text-black"><b>Apellidos</b></label>
                <input
                    className="w3-input w3-border w3-gray"
                    name="apellidos"
                    type="text"
                    value={apellidos}
                    onChange={onInputChange}
                />
            </p>
            <p>
                <label className="w3-text-black"><b>Correo</b></label>
                <input
                    className="w3-input w3-border w3-gray"
                    name="correo"
                    type="email"
                    value={correo}
                    onChange={onInputChange}
                />
            </p>
            <p>
                <button type="submit" className="w3-btn w3-black">Actualizar</button>
            </p>
            {message && <p>{message}</p>}
        </form>
    );
};

