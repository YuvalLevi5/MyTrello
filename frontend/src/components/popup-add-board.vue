<template>
  <div class="popup add-board-popup" ref="container">
    <div slot="header" class="task-popup-header">
      <h2>Create board</h2>
      <img class="close-svg" @click="togglePopup" src="../../src/svgs/close_FILL0_wght400_GRAD0_opsz48.svg" alt="" />
    </div>

    <main ref="main" class="main-popup-add-board">
      <div class="background"
        :style="[{ backgroundImage: `url(${selectedBgImg})` }, { backgroundColor: selectedBgColor }]">
        <div>
          <img src="../svgs/liner.svg" alt="">
        </div>
      </div>

      <div class="background-gallery">
        <div class="images">
          <img v-for="(image, idx) in coverImgsUrls" :key="idx" :src="image" @click="selectBgImg(image)">
        </div>
      </div>

      <div class="colors">
        <div class="color-container" v-for="(color, idx) in colors" :key="idx" :style="{ backgroundColor: color }"
          @click="selectBgColor(color)">
          <div class="screen"></div>
        </div>
      </div>

      <div class="title">
        <header>Board title <span>*</span></header>
        <input type="text" v-model="newBoard.title">
        <span>👋 Board title is required</span>
      </div>

      <button @click="createBoard" class="create-board-btn" :style="checkIfTitle">Create</button>
    </main>
  </div>
</template>

<script>
import { boardService } from '../service/board-service-copy.js'
// import { boardService } from '../service/board-service'

export default {
  name: 'Covermenu',
  data() {
    return {

      selectedBgImg: 'https://images.unsplash.com/photo-1561912847-95100ed8646c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      selectedBgColor: '#29CCE5',
      colors: [
        '#7BC86C',
        '#F5DD29',
        '#FFAF3F',
        '#EF7564',
        '#CD8DE5',
        '#5BA4CF',
        '#29CCE5',
        '#6DECA9',
        '#FF8ED4',
        '#172B4D',
      ],
      coverImgsUrls: [
        'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1275&q=80',
        'https://images.unsplash.com/photo-1561912847-95100ed8646c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1577009683331-950dd313c8d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1495236698374-12a308600d13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1293&q=80',
      ],
      newBoard: boardService.getEmptyBoard(),
    }
  },
  methods: {
    selectBgImg(url) {
      this.selectedBgColor = null
      this.selectedBgImg = url
    },
    selectBgColor(hex) {
      this.selectedBgImg = null
      this.selectedBgColor = hex
    },
    async saveBoard() {
      const newBoard = await this.$store.dispatch({ type: 'saveBoard', board: this.newBoard })
      // this.$router.push('/board/' + newBoard._id)
    },
    openMenu(menuAction) {
      this.$store.commit({ type: 'openMenu', menuAction })
    },
    closeMenu() {
      this.$store.commit({ type: 'closeMenu' })
    },
    async createBoard() {
      if (!this.newBoard.title) return
      // this.closeMenu()
      this.newBoard.style.bgCover = this.selectedBgImg
      this.newBoard.style.bgColor = this.selectedBgColor
      await this.saveBoard()
      await this.$store.dispatch({ type: 'loadBoards' })
      this.newBoard = boardService.getEmptyBoard()
    },
    togglePopup() {
      this.$emit('togglePopup')
    }
  },
  computed: {
    checkIfTitle() {
      if (!this.newBoard.title) return {
        'cursor': 'not-allowed',
        'backgroundColor': ' rgba(9, 30, 66, 0.04)',
        'border': 'none',
        'color': '#a5adba',
      }
    },
  }
}
</script>
