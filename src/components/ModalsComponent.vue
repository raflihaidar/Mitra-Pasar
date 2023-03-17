<template>
    <v-dialog v-model="dialogDisabled">
        <v-card>
            Halo
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'ModalsComponent',
    data() {
        return {
            dialogDisabled: this.disabled
        }
    },
    props: {
        disabled: {
            type: Boolean,
            default: false
        }
    }
}
</script>