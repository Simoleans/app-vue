<template>
    <h1>Hola {{ user.email }} || {{ user.displayName }}</h1>
</template>

<script>
import { inject } from 'vue'
export default {
    setup() {
        const user = inject("infoUser");
        return {
            user
        }
    }
}
</script>