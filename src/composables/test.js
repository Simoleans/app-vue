
import { db } from '@/components/firebaseInit'
import { ref } from 'vue'
import moment from 'moment';


export const testing = (pagos) => {
    function hello(){
        console.log('function',pagos)
    }

    return {
        hello
    }
}