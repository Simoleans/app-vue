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
            </div>
        </div>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 px-12">
        <button v-on:click="diaQuery" class="text-blue-500 focus:outline-none font-bold px-12 py-2 rounded shadow-sm" :class="activeQuery.dia ? 'bg-gray-300' : 'bg-gray-100'">Día</button>
        <button v-on:click="mesQuery" class="text-blue-500 focus:outline-none font-bold px-12 py-2 rounded shadow-sm" :class="activeQuery.mes ? 'bg-gray-300' : 'bg-gray-100'">Mes</button>
        <button v-on:click="allQuery" class="text-blue-500 focus:outline-none font-bold px-12 py-2 rounded shadow-sm md:col-span-1 lg:col-span-1 col-span-2" :class="activeQuery.all ? 'bg-gray-300' : 'bg-gray-100'">Siempre</button>
    </div>
    <!-- <div class="grid grid-cols-1 px-12 mt-9">
        <table class="text-left p-12">
            <thead class="bg-black flex text-white w-full">
                <tr class="flex w-full mb-4">
                    <th class="p-4 w-1/4">One</th>
                    <th class="p-4 w-1/4">Two</th>
                    <th class="p-4 w-1/4">Three</th>
                    <th class="p-4 w-1/4">Four</th>
                </tr>
            </thead>
            <tbody class="bg-grey-light flex flex-col items-center justify-between overflow-y-scroll w-full" id="tbody-data" style="height: 50vh;">
                <tr class="flex w-full mb-4">
                    <td class="p-4 w-1/4">Dogs</td>
                    <td class="p-4 w-1/4">Cats</td>
                    <td class="p-4 w-1/4">Birds</td>
                    <td class="p-4 w-1/4">Fish</td>
                </tr>
                <tr class="flex w-full mb-4">
                    <td class="p-4 w-1/4">Dogs</td>
                    <td class="p-4 w-1/4">Cats</td>
                    <td class="p-4 w-1/4">Birds</td>
                    <td class="p-4 w-1/4">Fish</td>
                </tr>
            </tbody>
	    </table>
    </div> -->
    <div class="mt-6">
        <h2 v-show="loading"> Cargando...</h2>
        <h2 v-show="emptyData"> No tiene registros, pulse <router-link  :to="{ name: 'calculate', params: { }}" class="text-blue-300  hover:text-blue-400 font-bold">Aquí</router-link>
    para hacer un registro.</h2>
    </div>
    <div class="grid grid-cols-4 gap-4 py-6 px-12" v-show="!emptyData">
        <div class="rounded-lg shadow-sm mb-4" v-for="p in paginated" :key="p.id">
            <div class="rounded-lg shadow-lg border-4 border-blue-500 border-opacity-25 hover:border-opacity-50 bg-gray-100 hover:shadow-xl relative overflow-hidden">
                <div class="px-3 pt-8 pb-10 text-center relative z-10">
                    <h4 class="text-xl uppercase text-gray-500 leading-tight">{{ p.monto }}</h4>
                    <h3 class="text-lg text-red-700 font-semibold leading-tight my-3">-{{ p.comision }}</h3>
                    <p class="text-xs text-green-500 leading-tight">{{ p.asunto }}</p>
                    <!-- <p class="text-xs text-green-500 leading-tight">▲ 57.1%</p> -->
                </div>
            </div>
        </div>
    </div>
    <div class="flex justify-end space-x-4 px-10 py-2" v-show="!emptyData && !loading">
        <buttom class="p-4 cursor-pointer bg-blue-200 rounded shadow-md" @click="prev">Anterior</buttom>
        <buttom class="p-4 cursor-pointer bg-blue-200 rounded shadow-md" @click="next">Siguiente</buttom>
    </div>
    
    
    
</template>
<script>
import {onUnmounted, onMounted } from 'vue'

import { pagos,suma,loading,activeQuery,mesQuery,diaQuery,allQuery,queryDay,emptyData,paginated,indexEnd,indexStart,next,prev} from "@/composables/query";

export default {
    setup(){
        queryDay();

        return {
            pagos,
            suma,
            loading,
            activeQuery,
            mesQuery,
            diaQuery,
            allQuery,
            emptyData,
            paginated,
            indexEnd,
            indexStart,
            next,
            prev
        }
    }
}
</script>
