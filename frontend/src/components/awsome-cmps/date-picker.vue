<template>
    <input type="date" @change="setDouDate">
</template>

<script>
export default {
    methods: {
        setDouDate(ev) {
            //    convert to timestemps
            const date = ev.target.value

            let newDate = date.split("-");
            newDate[1]--
            newDate = new Date(newDate.join(' ')).getTime()
    
            this.$emit("setDouDate", newDate)
        }
    }
}

</script>
<style >
</style>
