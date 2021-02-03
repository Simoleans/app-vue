<template>
    <section class="h-full bg-opacity-50 max-h-screen p-12">
        <form v-on:submit.prevent="savePago" class="container max-w-2xl mx-auto shadow-lg md:w-4/5">
            <div class="p-4 bg-gray-100 border-t-8 border-indigo-400 rounded-lg bg-opacity-5">
                <div class="max-w-sm mx-auto md:w-full">
                    <p class="text-2xl text-center">Calculadora</p>
                </div>
            </div>
            <div class="space-y-6 bg-white">
                <div class="flex gap-4 items-center justify-center">
                    <input type="text" v-model="values.porcentaje" class="rounded-lg placeholder-opacity-75 w-16 border-transparent appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-400 placeholder-gray-300 shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"/>
                    <p class="font-bold pt-3">%</p>
                </div>
                <hr/>
                <div class="flex-col space-y-5">
                    <div class="flex flex-col md:flex-row items-center">
                        <h2 class="max-w-sm mx-auto md:w-1/3">
                            Monto (BsS)
                        </h2>
                        <div class="max-w-sm mx-auto space-y-5 md:w-2/3">
                            <div>
                                <div class="relative">
                                    <input type="number" v-model="values.monto" required class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="Bolivares Soberanos"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col md:flex-row items-center">
                        <h2 class="max-w-sm mx-auto md:w-1/3">
                            Comisión (BsS)
                        </h2>
                        <div class="max-w-sm mx-auto space-y-5 md:w-2/3">
                            <div>
                                <div class="relative">
                                    <input type="number" v-model="values.comision" readonly required class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="Comisión"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="flex flex-col md:flex-row items-center">
                        <h2 class="max-w-sm mx-auto md:w-1/3">
                            Asunto del Pago
                        </h2>
                        <div class="max-w-sm mx-auto space-y-5 md:w-2/3">
                            <div>
                                <div class="relative">
                                    <textarea type="text" v-model="values.asunto" required class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 py-4 px-6 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="Asunto del pago"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-center pb-3">
                        <button type="submit" :disabled='isRequest' :class="{ 'opacity-50' : isRequest}" class="bg-blue-600 hover:shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 py-2 px-2 hover:bg-gray-blue-500 text-white font-bold rounded">
                            Guardar en mis movimientos
                        </button>
                    </div>
                </div>
            </div>
        </form>
        <div v-show="showMessage" class="absolute right-0 bottom-0 h-16 w-screen md:top-16 md:left-0 md:w-screen md:h-10 py-2 px-3 shadow-md border-t-4" :class="classAlert ? 'bg-green-500 border-green-700' : 'bg-red-500 border-red-700'" >
            <p class="text-lg font-bold">{{ messageAlert }}</p>
        </div>
    </section>
</template>

<script>
import { db } from '@/components/firebaseInit'
import { reactive,watch,ref } from 'vue'
import { data } from "@/composables/DataAuth";
import { clearField,showMessage,classAlert,messageAlert,alert } from "@/composables/function.js";
import moment from 'moment';


export default {
    setup() {
        let values = reactive({
            porcentaje : 0.30,
            monto : '',
            comision : 0,
            asunto : ''
        });

        let isRequest = ref(false);

        watch(values, (v) => {
            const formula = parseFloat(v.porcentaje) * parseInt(v.monto) / parseInt(100);
            v.comision =  isNaN(formula) ? '0' : formula.toFixed(2);
        })

        const savePago = async () => {
            isRequest.value = true;
            await db.collection("pagos").add({
                ...values,
                user : data.uid,
                created_at :moment().format('YYYY-MM-DD')
            })
            .then(function(docRef) {
                alert(true,'Se ha guardado correctamente');
                clearField(values)
                
            })
            .catch(function(error) {
                alert(false,error.message);
            });
            isRequest.value = false;
        }

        return {
            values,
            savePago,
            isRequest,
            showMessage,
            messageAlert,
            classAlert
        }
    }
}
</script>
