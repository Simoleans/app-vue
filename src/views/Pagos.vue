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
                    <div class="text-sm text-gray-500 dark:text-white">Total Monto</div>
                    <div class="font-bold text-lg dark:text-white">{{ suma.today.monto }} BsS</div>
                </div>
                <!-- <div class="flex flex-col flex-grow ml-4 items-center pt-2">
                    <div class="text-sm text-gray-500 dark:text-white">Total Monto (Mes)</div>
                    <div class="font-bold text-lg dark:text-white">{{ sumToday.monto }} BsS</div>
                </div>
                <div class="flex flex-col flex-grow ml-4 items-center pt-2">
                    <div class="text-sm text-gray-500 dark:text-white">Total Monto Todo</div>
                    <div class="font-bold text-lg dark:text-white">{{ sumToday.monto }} BsS</div>
                </div> -->
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
                    <div class="text-sm text-gray-500 dark:text-white">Total Comisiones</div>
                    <div class="font-bold text-lg dark:text-white">{{ suma.today.comision }} BsS</div>
                </div>
                <!-- <div class="flex flex-col flex-grow ml-4 items-center pt-2">
                    <div class="text-sm text-gray-500 dark:text-white">Total Comisiones (Mes)</div>
                    <div class="font-bold text-lg dark:text-white">{{ sumToday.comision }} BsS</div>
                </div>
                <div class="flex flex-col flex-grow ml-4 items-center pt-2">
                    <div class="text-sm text-gray-500 dark:text-white">Total Comisiones Todo</div>
                    <div class="font-bold text-lg dark:text-white">{{ sumToday.comision }} BsS</div>
                </div> -->
            </div>
        </div>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 px-12">
        <button v-on:click="diaQuery" class="text-blue-500 focus:outline-none font-bold px-12 py-2 rounded" :class="activeQuery.dia ? 'bg-gray-300' : 'bg-gray-100'">Día</button>
        <button v-on:click="mesQuery" class="text-blue-500 focus:outline-none font-bold px-12 py-2 rounded" :class="activeQuery.mes ? 'bg-gray-300' : 'bg-gray-100'">Mes</button>
        <button v-on:click="allQuery" class="text-blue-500 focus:outline-none font-bold px-12 py-2 rounded md:col-span-1 lg:col-span-1 col-span-2" :class="activeQuery.all ? 'bg-gray-300' : 'bg-gray-100'">Siempre</button>
    </div>
    <ul id="example-1" class="mt-6">
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
import { ref,reactive,watch } from 'vue'
import moment from 'moment';
import { queryToday } from "@/composables/query";
// import { testing,pagos as p } from "@/composables/test";


export default {
    setup(){
        let pagos = ref([]);
        let suma = reactive({
            today : {
                comision : 0,
                monto : 0
            }
        });
        let loading = ref(true);

        let activeQuery = reactive({
            dia : true,
            mes : false,
            all : false
        })

        db.collection("pagos").where('created_at','==',moment().format('YYYY-MM-DD'))
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
            
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
        
        let watchSum = watch(pagos,(v) => {
            sumToday(v)
        });

        watch(activeQuery,(v) =>{
            loading.value = true;
            pagos.value = [];
        });

        const sumToday = (d) => {
            
            let sumaComision = d.reduce((a, {comision}) => parseFloat(a) + parseFloat(comision), 0);
            let sumaMonto = d.reduce((a, {monto}) => parseFloat(a) + parseFloat(monto), 0);

            suma.today.comision = sumaComision.toFixed(2);
            suma.today.monto = sumaMonto.toFixed(2);
        
        } 


            const mesQuery = () => {
                activeQuery.dia = false;
                activeQuery.all = false;
                activeQuery.mes = true;
                db.collection("pagos").orderBy('created_at').startAt(moment().startOf('month').format('YYYY-MM-DD')).endAt(moment().endOf('month').format('YYYY-MM-DD'))
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
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });
            }

            const diaQuery = () => {
                activeQuery.dia = true;
                activeQuery.all = false;
                activeQuery.mes = false;
                db.collection("pagos").where('created_at','==',moment().format('YYYY-MM-DD'))
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
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });
                
                let watchSum = watch(pagos,(v) => {
                    sumToday(v)
                });

            }

            const allQuery = () => {
                activeQuery.dia = false;
                activeQuery.all = true;
                activeQuery.mes = false;
                db.collection("pagos").orderBy('created_at').startAt(moment().startOf('year').format('YYYY-MM-DD')).endAt(moment().endOf('year').format('YYYY-MM-DD'))
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
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });
            }
            
            return {
                pagos,
                suma,
                loading,
                activeQuery,
                mesQuery,
                diaQuery,
                allQuery
            }
    }
}
</script>
