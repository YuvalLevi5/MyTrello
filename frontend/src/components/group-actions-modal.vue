<template>
    <section class="group-actions">
        
        <span class="title">List actions</span>
        <svg @click="$emit('close-group-actions')" class="close-actions-group" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24"
            height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path fill="none" stroke="#5e6c84" stroke-width="2" d="M3,3 L21,21 M3,21 L21,3"></path>
        </svg>
        <button class="option">Delete</button>
        <button class="option">Delete</button>
    </section>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
</style>