import { useState,useEffect } from 'react'
import Header from './components/Header'
import Filtros from './components/Filtros'
import ListadoGastos from './components/ListadoGastos'
import Modal from './components/Modal'
import { generarId } from './helpers'

import IconoNuevoGasto from './img/nuevo-gasto.svg'


function App() {
  // Definir el state

  const [gastos, setGastos] = useState(
    localStorage.getItem("gastos") ? JSON.parse(localStorage.getItem("gastos")) : []
  ); // [{nombre: '', cantidad: '', categoria: ''}

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto")) ?? 0
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [gastoEditar, setGastoEditar] = useState({});

  const [filtro, setFiltro] = useState('');

  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0){
      setModal(true);

      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }
  }, [gastoEditar])

  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto ?? 0);

  }, [presupuesto])

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos)?? [] );
  }, [gastos])

  useEffect(() => {
    if(filtro){
      //filtrar los gastos POR CATEGORIA
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro);
      setGastosFiltrados(gastosFiltrados);
    }

  },[filtro]);



  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem("presupuesto"));

    if(presupuestoLS > 0){
      setIsValidPresupuesto(true);
    }

  }, []);


  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({});

    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  }

  const guardarGasto = gasto => {
    //actualizar el state
   if(gasto.id){
      const gastosActualizados = gastos.map(gastoState =>gastoState.id ===
         gasto.id ? gasto : gastoState);
    setGastos(gastosActualizados);  
    setGastoEditar({});
   }else{
    //nuevo gasto
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
   }

    setAnimarModal(false);
    setTimeout(() => {
        setModal(false);
    }, 500);
  }
  
  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id);
    setGastos(gastosActualizados);
  }


  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        gastos = {gastos}
        setGastos = {setGastos}
        presupuesto = {presupuesto}
        setPresupuesto = {setPresupuesto}
        isValidPresupuesto = {isValidPresupuesto}
        setIsValidPresupuesto = {setIsValidPresupuesto} 
      />
      
      {isValidPresupuesto &&(

        <>
        <main>
          <Filtros
            filtro = {filtro}
            setFiltro = {setFiltro}
          />
        <ListadoGastos
          gastos = {gastos}
          setGastoEditar = {setGastoEditar}
          eliminarGasto = {eliminarGasto}
          filtro = {filtro}
          gastosFiltrados = {gastosFiltrados}
        />
        </main>

         <div className='nuevo-gasto'>
        <img 
        src={IconoNuevoGasto} 
        alt="ICONO NUEVO GASTO" 
        onClick={handleNuevoGasto}
        />

      </div>
      </>
      )}

      {modal && <Modal
        
                setModal = {setModal}
                animarModal = {animarModal}
                setAnimarModal = {setAnimarModal}
                guardarGasto = {guardarGasto}
                gastoEditar = {gastoEditar}
                setGastoEditar = {setGastoEditar}
              />}
    

    </div>
   
  )
}

export default App




