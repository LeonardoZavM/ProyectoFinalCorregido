import React, { useEffect, useState } from 'react';

export const TablaClientes = () => {
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
            Vista de Clientes
            <table class="w3-table-all">
                <thead>
                    <tr>
                        <td>id</td>
                        <td>nombre</td>
                        <td>apellidos</td>
                        <td>correo</td>
                    </tr>
                </thead>
                <tbody>
                    {data.map(d => {
                        return (
                            <tr key={d.id}>
                                <td>{d.id}</td>
                                <td>{d.nombre}</td>
                                <td>{d.apellidos}</td>
                                <td>{d.correo}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <button onClick={todos}>Mostrar</button>
        </div>
    );
};
