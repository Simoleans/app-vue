import { db } from '@/components/firebaseInit'
import { ref,reactive,watch } from 'vue'
import moment from 'moment';

    let pagos = ref([]);
    let loading = ref(true);
    let emptyData = ref(false);
    let suma = reactive({
        today : {
            comision : 0,
            monto : 0
        }
    });
    let activeQuery = reactive({
        dia : true,
        mes : false,
        all : false
    })
    /**
     * Query para traer los datos del día actual.
     */
    const queryDay = () => {
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
            emptyData.value = pagos.value.length <= 0 ? true : false;
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    }

    watch(pagos,(v) => {
        sumToday(v)
    });

    watch(activeQuery,(v) =>{
        emptyData.value = false;
        loading.value = true;
        pagos.value = [];
    });

    /**
     * función para el consolidado (monto/comision)
     * @param {Object} pagos - todos los pagos del query.
     */
    const sumToday = (d) => {
        
        let sumaComision = d.reduce((a, {comision}) => parseFloat(a) + parseFloat(comision), 0);
        let sumaMonto = d.reduce((a, {monto}) => parseFloat(a) + parseFloat(monto), 0);

        suma.today.comision = sumaComision.toFixed(2);
        suma.today.monto = sumaMonto.toFixed(2);
    
    } 

    /**
     * Query para traer todos los registros del mes actual
     */
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
            emptyData.value = pagos.value.length <= 0 ? true : false;
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    }

    /**
     * Query para traer todos los registros del día, haciendo un llamado a la función queryDay()
     */
    const diaQuery = () => {
        activeQuery.dia = true;
        activeQuery.all = false;
        activeQuery.mes = false;
        queryDay()
        
    }

    /**
     * Query para traer todos los registros del año actual
     */
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
            emptyData.value = pagos.value.length <= 0 ? true : false;
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    }

export {pagos,suma,loading,activeQuery,emptyData,mesQuery,diaQuery,allQuery,queryDay};

