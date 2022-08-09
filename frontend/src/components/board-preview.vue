<template>
  <a v-if="board" class="board-link" :href="`/board/${board._id}`" :style="boardBackground">
    <div class="board-preview">
      <h3>{{ board.title }}</h3>
      <div @click.prevent="boardStarred" class="star-icon">
        <font-awesome-icon v-if="board.isStarred" class="starred" icon="fa-solid fa-star" />
        <font-awesome-icon v-else class="unstarred" icon="fa-regular fa-star" />
      </div>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    board: Object,
  },

  methods: {
    boardStarred() {
      const board = JSON.parse(JSON.stringify(this.board))
      board.isStarred = !board.isStarred
      this.$emit('board-starred', board)
    },
  },

  computed: {
    boardBackground() {
      if (!this.board.style) return 
      if (this.board.style.bgCover) {
        return { 'backgroundImage': `url(${this.board.style.bgCover})` }
      } else if (this.board.style.bgColor) {
        return { 'backgroundColor': this.board.style.bgColor }
      }
    },
  },
}
</script>
