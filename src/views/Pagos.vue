<template>
    <div class="grid grid-cols-2 gap-4 p-12">
        <div class="col-span-2 md:col-span-1 hover:shadow-lg">
            <div class="flex flex-col bg-gray-300 shadow-sm rounded p-4">
                <div class="flex flex-col items-center justify-center flex-shrink-0 h-12 w-full rounded-xl bg-yellow-100 text-yellow-700">
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M5 8a1 1 0 011-1h1V6a1 1 0 012 0v1h1a1 1 0 110 2H9v1a1 1 0 11-2 0V9H6a1 1 0 01-1-1z" />
                        <path fill-rule="evenodd" d="M2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8zm6-4a4 4 0 100 8 4 4 0 000-8z" clip-rule="evenodd" />
                    </svg>
                </div>
                <div class="flex flex-col flex-grow ml-4 items-center pt-2">
                    <div class="text-sm text-gray-500 dark:text-white">Total Monto (Hoy)</div>
                    <div class="font-bold text-lg dark:text-white">{{ sumToday.comision }} BsS</div>
                </div>
                <div class="flex flex-col flex-grow ml-4 items-center pt-2">
                    <div class="text-sm text-gray-500 dark:text-white">Total Monto (Mes)</div>
                    <div class="font-bold text-lg dark:text-white">{{ sumToday().monto }} BsS</div>
                </div>
                <div class="flex flex-col flex-grow ml-4 items-center pt-2">
                    <div class="text-sm text-gray-500 dark:text-white">Total Monto Todo</div>
                    <div class="font-bold text-lg dark:text-white">{{ sumToday.monto }} BsS</div>
                </div>
            </div>
        </div>
        <div class="col-span-2 md:col-span-1  hover:shadow-lg">
            <div class="flex flex-col bg-gray-300 shadow-sm rounded p-4">
                <div class="flex flex-col items-center justify-center flex-shrink-0 h-12 w-full rounded-xl bg-blue-100 text-blue-500">
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                    </svg>
                </div>
                <div class="flex flex-col flex-grow ml-4 items-center pt-2">
                    <div class="text-sm text-gray-500 dark:text-white">Total Comisiones (Hoy)</div>
                    <div class="font-bold text-lg dark:text-white">{{ sumToday.comision }} BsS</div>
                </div>
                <div class="flex flex-col flex-grow ml-4 items-center pt-2">
                    <div class="text-sm text-gray-500 dark:text-white">Total Comisiones (Mes)</div>
                    <div class="font-bold text-lg dark:text-white">{{ sumToday.comision }} BsS</div>
                </div>
                <div class="flex flex-col flex-grow ml-4 items-center pt-2">
                    <div class="text-sm text-gray-500 dark:text-white">Total Comisiones Todo</div>
                    <div class="font-bold text-lg dark:text-white">{{ sumToday.comision }} BsS</div>
                </div>
            </div>
        </div>
    </div>
    <ul id="example-1">
        <h2 v-show="loading"> Cargando...</h2>
        <ul id="example-2">
            <li v-for="p in pagos" :key="p.id">
                {{ p.comision }} - {{ p.monto }} / {{ p.created_at }}
            </li>
        </ul>
    </ul>
</template>
<script>
import { db } from '@/components/firebaseInit'
import { ref,reactive,computed,watch } from 'vue'
import moment from 'moment';
import { queryToday } from "@/composables/query";
// import { testing,pagos as p } from "@/composables/test";


export default {
    setup(){
        let pagos = ref([])
        let loading = ref(true);


        db.collection("pagos")
        .get()
        .then(function(querySnapshot) {
            let docs = []
            querySnapshot.forEach(function(doc) {
                docs.push({
                    ...doc.data(),
                    id : doc.id
                })
            });
            pagos.value = [...docs];
            loading.value = false;
            // let sumaComision = pagos.value.reduce((a, {comision}) => parseFloat(a) + parseFloat(comision), 0);
            // console.log('datos sum',sumaComision)
            sumToday(pagos);
            console.log('datos fetch',pagos)
            
            console.log('sum',sumToday(pagos))
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });

        
       
        console.log('datos fuera ',pagos)
        console.log('datos fuera todo',pagos)
        
       
            const sumToday = (d) => {
                
                // console.log('sumToday',d)
                let sumaComision = d.value.reduce((a, {comision}) => parseFloat(a) + parseFloat(comision), 0);
                let sumaMonto = d.value.reduce((a, {monto}) => parseFloat(a) + parseFloat(monto), 0);
            
                let object = {
                    comision : sumaComision,
                    monto : sumaMonto
                }
            
                return object;
             } 
            // // 
            //  console.log('function',sumToday(pagos))
            return {
                pagos,
                sumToday,
                loading
            }
    }
}
</script>
