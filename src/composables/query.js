import { db } from '@/components/firebaseInit'
import { ref,reactive,watch,computed } from 'vue'
import moment from 'moment';

    let pagos = ref([]);
    let loading = ref(true);
    let emptyData = ref(false);
    let current = ref(1);
    let pageSize = ref(6);
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
        current.value = 1;
        activeQuery.dia = false;
        activeQuery.all = false;
        activeQuery.mes = true;
        db.collection("pagos").orderBy('created_at').startAt(moment().startOf('month').format('YYYY-MM-DD')).endAt(moment().endOf('month').format('YYYY-MM-DD'))
        .get()
        .then(function(querySnapshot) {
            let docs = []
            var lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
            console.log("last", lastVisible);
            querySnapshot.forEach(function(doc) {
                docs.push({
                    ...doc.data(),
                    id : doc.id
                })
            });
            console.log('doc',docs);
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
        current.value = 1;
        queryDay()
        
    }

    /**
     * Query para traer todos los registros del año actual
     */
    const allQuery = async () => {
        current.value = 1;
        activeQuery.dia = false;
        activeQuery.all = true;
        activeQuery.mes = false;

        const ref = db.collection("pagos").orderBy('created_at');

        const d = await ref.get();

        let docs = [];

        d.docs.forEach(function(doc) {
            docs.push({
                ...doc.data(),
                id : doc.id
            })
        });
        
        pagos.value = [...docs];
        loading.value = false;
        emptyData.value = pagos.value.length <= 0 ? true : false;
    }

    const indexStart = computed(() => {
        return (current.value - 1) * pageSize.value;
    });

    const indexEnd = computed(() => {
        return indexStart.value + pageSize.value;
    });

    const paginated = computed(() => {
        return pagos.value.slice(indexStart.value, indexEnd.value);
    });

    const prev = () => {
        if (current.value == 1) {
            return;
        }else{
            current.value--;
        }
    }
    const next = () => {
        if (paginated.value.length < pageSize.value) {
            return;
        }else{
            current.value++;
        }
    }

export {pagos,suma,loading,activeQuery,emptyData,mesQuery,diaQuery,allQuery,queryDay,paginated,indexEnd,indexStart,prev,next};

