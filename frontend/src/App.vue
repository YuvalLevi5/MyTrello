<template>
  <router-view />
</template>

<script>
// import { RouterLink, RouterView } from 'vue-router'

export default {
  created() {
    this.$store.dispatch({ type: 'loadBoards' })
  },

  components: {
  },
}
</script>
