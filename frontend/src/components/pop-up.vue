<template>
  <div class="popup" ref="container">
    <header ref="header">
      <slot name="header"></slot>
    </header>
    <main ref="main">
      <slot name="main"> </slot>
    </main>
    <footer ref="footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
export default {
  mounted() {
    //const beforeHeight = this.$refs.container.getBoundingClientRect().height;
    this.$nextTick(() => {
      const containerHeight = this.$refs.container.getBoundingClientRect()
        .height;
      // const diff = beforeHeight - containerHeight;
      const main = this.$refs.main;
      const footerHeight = this.$refs.footer.getBoundingClientRect().height;
      const headerHeight =
        this.$refs.header.getBoundingClientRect().height + 25;
      main.style.maxHeight =
        containerHeight - (footerHeight + headerHeight) + "px";
      //console.log("file: pop-up.vue - line 24 - this.$nextTick - diff", diff);
      //main.style.maxHeight = containerHeight - diff + "px";
    });
  },
  components: {},
};
</script>
