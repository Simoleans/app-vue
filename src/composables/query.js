import { ref } from 'vue'
import moment from 'moment';

//  const pagos = ref([]);
const queryToday = (pagos) => {
        console.log('tt',pagos)
        let sumaComision = pagos.reduce((a, {comision}) => parseFloat(a) + parseFloat(comision), 0);
        let sumaMonto = pagos.reduce((a, {monto}) => parseFloat(a) + parseFloat(monto), 0);
    
        let object = {
            comision : sumaComision,
            monto : sumaMonto
        }
    
        return object;
    } 


    export {queryToday};

// export const query = (pagos) => {
//     console.log('hola',pagos)
//     const sumToday = (pagos) => {
//         console.log('tt',pagos)
//         let sumaComision = pagos.reduce((a, {comision}) => parseFloat(a) + parseFloat(comision), 0);
//         let sumaMonto = pagos.reduce((a, {monto}) => parseFloat(a) + parseFloat(monto), 0);
    
//         let object = {
//             comision : sumaComision,
//             monto : sumaMonto
//         }
    
//         return object;
//     } 

//     return {
//         sumToday
//     }
//}
