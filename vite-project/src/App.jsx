import { Route, Routes, Navigate } from 'react-router-dom'
import { NavBar } from './navbar'
import { TablaClientes } from './TablaClientes'
import { TablaProductos } from './TablaProductos'
import { AltasClientes } from './AltasClientes'
import { AltasProductos } from './AltasProductos'
import { ActualizaClientes } from './ActualizaClientes'
import { EliminaProductos } from './EliminaProductos'
import { EliminaClientes } from './EliminaClientes'
import './App.css'

const Home = () => {
  return <h1>Menu</h1>;
};
function App() {
  return (
    <>
      <div className='w3-container'>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/TablaClientes" element={<TablaClientes/>}></Route>
          <Route path="/TablaProductos" element={<TablaProductos/>}></Route>
          <Route path="/AltasClientes" element={<AltasClientes/>}></Route>
          <Route path="/AltasProductos" element={<AltasProductos/>}></Route>
          <Route path="/ActualizaClientes" element={<ActualizaClientes/>}></Route>
          <Route path="/EliminaProductos" element={<EliminaProductos/>}></Route>
          <Route path="/EliminaClientes" element={<EliminaClientes/>}></Route>
          <Route path="/*" element={<Navigate to='/' />}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App