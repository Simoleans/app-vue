import { ref } from "vue";

/**
 * @param {Object}  - objeto para limpiar inputs
 */
const clearField = (values) => {
    values.monto = "";
    values.comision = 0;
    values.asunto = "";
};

let showMessage = ref(false);
let classAlert = ref(true);
let messageAlert = ref();

/**
 * @param {boolean} - true : success | false : danger
 * @param {string}  - mensaje del alert
 */
const alert = (type, message) => {
    showMessage.value = true;
    messageAlert.value = message;
    if (!type) {
        classAlert.value = false;
    }
    setTimeout(() => {
        showMessage.value = false;
    }, 2500);
};

export { clearField, showMessage, classAlert, messageAlert, alert };
