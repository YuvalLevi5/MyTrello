<template>
  <app-header style="backgroundColor: #026AA7" />

  <section class="board-list" v-if="boards">
    <div class="boards-container">
      <h1 class="board-list-header">Workspace</h1>
      <div v-if="isStarredBoards" class="starred-boards">
        <div class="boards-status">
          <span>
            <font-awesome-icon class="icon" icon="fa-regular fa-star" />
          </span>
          <h3>Starred boards</h3>
        </div>
        <div class="boards">
          <board-preview @board-starred="saveBoard" v-for="board in starredBoards" :board="board" :key="board._id" />
        </div>
      </div>
      <div class="recent-boards">
        <div class="boards-status">
          <span>
            <font-awesome-icon class="icon" icon="fa-regular fa-clock" />
          </span>
          <h3>Recently viewed</h3>
        </div>
        <div class="boards">
          <board-preview @board-starred="saveBoard" v-for="board in recentBoards" :board="board" :key="board._id" />
          <div class="create-board" @click="isCreate = !isCreate">Create new board</div>
          <popup-add-board v-if="isCreate" @togglePopup="isCreate = !isCreate" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import boardPreview from '../components/board-preview.vue'
import popupAddBoard from '../components/popup-add-board.vue'
import appHeader from '../components/app-header.vue'

export default {
  data() {
    return {
      isCreate: false,
    }
  },

  methods: {
    saveBoard(board) {
      this.$store.dispatch({ type: 'saveBoard', board })
    },
    deleteBoard(boardId) {
      this.$store.dispatch({ type: 'deleteBoard', boardId })
    },
  },

  computed: {
    boards() {
      return this.$store.getters.boards
    },
    starredBoards() {
      return this.boards.filter((board) => board.isStarred)
    },
    recentBoards() {
      return this.boards.filter((board) => !board.isStarred)
    },
    isStarredBoards() {
      return this.boards.some((board) => board.isStarred)
    },
  },

  components: {
    boardPreview,
    popupAddBoard,
    appHeader,
  },
}
</script>
