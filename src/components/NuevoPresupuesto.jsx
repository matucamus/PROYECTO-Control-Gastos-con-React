import {useState} from 'react'
import Mensaje from './Mensaje'

const NuevoPresupuesto = ({presupuesto, setPresupuesto,  setIsValidPresupuesto}) => {

  const[mensaje, setMensaje] = useState("")

  const handlePresupuesto =(e) =>{
    //evitar que se envie el formulario
    e.preventDefault();
    //validar si es un numero y es mayor a 0
    if(!presupuesto || presupuesto < 0 ){
      console.log("no es un presupuesto valido")
      setMensaje("no es un presupuesto valido");
      //detener la ejecucion con return
      return;
    }
    setMensaje("");
    //si pasa la validacion
    setIsValidPresupuesto(true);
    
    
  }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
      <form onSubmit={handlePresupuesto} className='formulario'>
        <div className='campo'>
          <label>Definir Presupuesto</label>

          <input 
            className='nuevo-presupuesto'
            type='number'
            placeholder='Añade tu Presupuesto'
            value={presupuesto}
            onChange={e => setPresupuesto(Number(e.target.value))}
          />
        </div>

        <input type='submit' value="Añadir"/>

        {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}

      </form>

    </div>
  )
}

export default NuevoPresupuesto