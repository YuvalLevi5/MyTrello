<template>
  <section class="home-view">
    <home-header></home-header>
    <div class="home-layout">
      <div class="hero">
        <div class="hero-sign-up">
          <h1>Trello helps teams move work forward.</h1>
          <p>
            Collaborate, manage projects, and reach new productivity peaks. From
            high rises to the home office, the way your team works is
            unique—accomplish it all with Trello.
          </p>
          <button @click="this.$router.push('/board')">Get started</button>
        </div>
        <img src="../assets/imgs/hero.webp" />
      </div>
      <div class="main-content">
        <h2>It’s more than work. It’s a way of working together.</h2>
        <p>
          Start with a Trello board, lists, and cards. Customize and expand with
          more features as your teamwork grows. Manage projects, organize tasks,
          and build team spirit—all in one place.
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import homeHeader from '../components/homer-header.vue'
export default {
  created() {
    this.$store.dispatch({ type: 'loadBoards' })
  },
  components: {
    homeHeader
  }
}
</script>

<style>
.home-page h1 {
  text-align: center;
}
</style>
