import React, { useState } from "react";

export const EliminaProductos = () => {
    const [id, setId] = useState("");
    const [message, setMessage] = useState("");

    const onInputChange = ({ target }) => {
        setId(target.value);
    };

    const validateForm = () => {
        if (!id) {
            setMessage("El campo Id es obligatorio.");
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

        console.log(`http://localhost/proyecto1/php/BajaProducto.php?id=${id}`);

        try {
            const response = await fetch(`http://localhost/proyecto1/php/BajaProducto.php?id=${id}`, {
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
                <button type="submit" className="w3-btn w3-red">Eliminar</button>
            </p>
            {message && <p>{message}</p>}
        </form>
    );
};
