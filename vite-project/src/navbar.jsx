import { NavLink } from "react-router-dom"
export const NavBar = () => {
  return (
    <div className="w3-bar w3-black">
        <NavLink to='/' className="w3-bar-item w3-button">Inicio</NavLink>
        <NavLink to='/AltasClientes' className="w3-bar-item w3-button">Altas Clientes</NavLink>
        <NavLink to='/AltasProductos' className="w3-bar-item w3-button">Altas Productos</NavLink>
        <NavLink to='/TablaClientes' className="w3-bar-item w3-button">Clientes</NavLink>
        <NavLink to='/TablaProductos' className="w3-bar-item w3-button">Productos</NavLink>
        <NavLink to='/ActualizaClientes' className="w3-bar-item w3-button">Editar Clientes</NavLink>
        <NavLink to='/EliminaProductos' className="w3-bar-item w3-button">Elimina Productos</NavLink>
        <NavLink to='/EliminaClientes' className="w3-bar-item w3-button">Elimina Clientes</NavLink>
        
    </div>
  )
}