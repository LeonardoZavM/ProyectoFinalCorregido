import React, { useState, useEffect } from 'react';

export const TablaProductos = () => {
    const [data, setData] = useState([]);
    const [fullData, setFullData] = useState([]);
    const getData=()=>{
        fetch('http://localhost/proyecto1/php/ListadoCliente.php')
        .then(response=>{
            if(response.ok){
                response.json()
               .then(function (datosjson){
                    const datos=datosjson.slice(0,10)
                    setData(datos)
                    setFullData(datosjson);
                });
            }
        })
    }
    const algo=useEffect(()=>{
        getData()
    },[])
    const todos = () => {
        setData(fullData);
    };

    return (
        <div>
            Vista de Productos

            <table class="w3-table-all">
                <thead>
                    <tr>
                        <td>id</td>
                        <td>nombre</td>
                        <td>categoria</td>
                        <td>stock</td>
                        <td>proveedor</td>
                    </tr>
                </thead>
                <tbody>
                    {data.map(d => {
                        return (
                            <tr key={d.id}>
                                <td>{d.id}</td>
                                <td>{d.nombre}</td>
                                <td>{d.categoria}</td>
                                <td>{d.stock}</td>
                                <td>{d.proveedor}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <button onClick={todos}>Mostrar</button>
        </div>
    );
};
