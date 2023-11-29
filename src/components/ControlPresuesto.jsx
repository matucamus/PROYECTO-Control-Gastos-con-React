import {useState, useEffect} from 'react'
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';  
import 'react-circular-progressbar/dist/styles.css'; 

const ControlPresuesto = ({gastos, setGastos, presupuesto, setPresupuesto, setIsValidPresupuesto}) => {

    const [porcentaje, setPorcentaje] = useState(0);

    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);


    useEffect(() => {
       const totalGastado =gastos.reduce((total, gasto) => total + gasto.cantidad, 0);

       const totalDisponible = presupuesto - totalGastado;

       //calcular porcentaje
         const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2);

        setDisponible(totalDisponible);
        setGastado(totalGastado);
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje);
        }, 1500);

    }, [gastos])


    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
         })
    }
    const handleResetApp = () => {
        const resultado =confirm("¿Estas seguro que deseas resetear la app?");
        if(resultado){
            setGastos([]);
             setPresupuesto(0);
            setIsValidPresupuesto(false);
        }
    }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <CircularProgressbar
            styles={buildStyles({
                
                textColor: porcentaje > 100 ? "red" : "#3e98c7",
                pathColor: porcentaje > 100 ? "red" : "#3e98c7",
                trailColor: "#d6d6d6",
                backgroundColor: "#3e98c7",
              })}
            value={porcentaje}
            text={`${porcentaje}% Gastado`}
            />
        </div>

        <div className='contenido-presupuesto'>
            <button 
                className='reset-app' 
                type='button'
                onClick={handleResetApp}
            >
                Resetear App

            </button>
            <p>
                <span>Presupuesto: </span>{formatearCantidad(presupuesto)}
            </p>
            <p className={`${disponible < 0 ? "negativo" : ""}`}>
                <span>Disponible: </span>{formatearCantidad(disponible)}
            </p>
            <p>
                <span>Gastado: </span>{formatearCantidad(gastado)}
            </p>

        </div>

    </div>
  )
}

export default ControlPresuesto