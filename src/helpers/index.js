export const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const date =  Date.now().toString(36);  
    return random + date;
}


export const formatearFecha = (fecha) => {
    const fechaNueva = new Date(fecha);
    const opciones = { 
        year: 'numeric', 
         month: 'long', 
         day: 'numeric',
    }
    return fechaNueva.toLocaleDateString('es-ES', opciones);
}