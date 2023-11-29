import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPresuesto from './ControlPresuesto'

const Header = ({gastos ,presupuesto, setPresupuesto, isValidPresupuesto, setIsValidPresupuesto, setGastos}) => {
  return (
    <header>
        <h1>Planificador de Gastos</h1>

        {isValidPresupuesto ? (
            <ControlPresuesto
              gastos = {gastos}
              setGastos = {setGastos}
              presupuesto = {presupuesto}
              setPresupuesto = {setPresupuesto}
              setIsValidPresupuesto = {setIsValidPresupuesto}
            />
        ): (
              <NuevoPresupuesto
              presupuesto = {presupuesto}
              setPresupuesto = {setPresupuesto}
              setIsValidPresupuesto={setIsValidPresupuesto}
            />
        )}
        
        


    </header>
  )
}

export default Header