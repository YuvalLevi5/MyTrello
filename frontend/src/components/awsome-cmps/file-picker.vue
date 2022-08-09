<template>
    <input type="file" @change="readAdress">
</template>

<script>
export default {

    methods: {
        readAdress(ev) {
            this.$emit("atachment", ev.target.value)
        }
    }
}
</script>

<style lang="scss" scoped>
</style>