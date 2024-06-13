import React, { useState } from "react";

export const AltasProductos = () => {
    const [formState, setFormState] = useState({
        id: "",
        nombre: "",
        categoria: "",
        stock: "",
        proveedor: ""
    });
    const [message, setMessage] = useState("");

    const { id, nombre, categoria, stock, proveedor } = formState;

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({ ...formState, [name]: value });
    };

    const validateForm = () => {
        if (!id || !nombre || !categoria || !stock || !proveedor) {
            setMessage("Todos los campos son obligatorios.");
            return false;
        }
        if (isNaN(stock)){
            setMessage("Stock solo debe ser números.");
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

        const parametros = `id=${id}&nombre=${nombre}&categoria=${categoria}&stock=${stock}&proveedor=${proveedor}`;
        console.log(`http://localhost/proyecto1/php/RegistroProducto.php?${parametros}`);

        try {
            const response = await fetch(`http://localhost/proyecto1/php/RegistroProducto.php?${parametros}`, {
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
                <label className="w3-text-black"><b>Categoria</b></label>
                <input
                    className="w3-input w3-border w3-gray"
                    name="categoria"
                    type="text"
                    value={categoria}
                    onChange={onInputChange}
                />
            </p>
            <p>
                <label className="w3-text-black"><b>Stock</b></label>
                <input
                    className="w3-input w3-border w3-gray"
                    name="stock"
                    type="text"
                    value={stock}
                    onChange={onInputChange}
                />
            </p>
            <p>
                <label className="w3-text-black"><b>proveedor</b></label>
                <input
                    className="w3-input w3-border w3-gray"
                    name="proveedor"
                    type="text"
                    value={proveedor}
                    onChange={onInputChange}
                />
            </p>
            <p>
                <button type="submit" className="w3-btn w3-green">Ingresar</button>
            </p>
            {message && <p>{message}</p>}
        </form>
    );
};
