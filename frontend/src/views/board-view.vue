<template>

  <div v-if="board" class="main-board-preview" :style="boardBackground">
    <div v-if="blackScreen" class="black-screen" @click="rToBoard"></div>

    <section class="board-headers">
      <app-header />
      <board-header v-if="board" @board-update="saveBoard" :board="board" />
    </section>
    <section v-if="board" class="board-view">
      <router-view></router-view>
      <div v-if="board" class="board-canvas">
        <div class="board-fixed-container">
          <Container @drop="onColumnDrop($event)" group-name="cols" tag="div" orientation="horizontal">
            <Draggable v-for="(group, idx) in board.groups" :key="group.id">
              <div>
                <group-preview class="group-container" @saveBoard="saveBoard" :key="group.id" :group="group"
                  :boardId="board._id" :idx="idx" :board="board" @onEditIsToggle="editIsToggle"
                  @checkSaveBoard="checkSaveBoard" />
              </div>
            </Draggable>

            <div class="add-new-group">
              <button class="btn-add-group" v-if="!isAddNewGroup" @click="isAddNewGroup = true">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="icon"
                  height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path fill="none" stroke="#FFFFFF" stroke-width="2" d="M12,22 L12,2 M2,12 L22,12"></path>
                </svg>
                &nbsp; Add another list
              </button>

              <form v-else class="group-preview">
                <input class="input-title" v-model="newGroup.title" type="text" @change="addGroup"
                  placeholder="Enter list title" />

                <div class="save-element-section">
                  <button @click.prevent="addGroup">Add list</button>
                  <svg @click="isAddNewGroup = false" stroke="currentColor" fill="currentColor" stroke-width="0"
                    viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path fill="none" stroke="#000" stroke-width="2" d="M3,3 L21,21 M3,21 L21,3"></path>
                  </svg>
                </div>
              </form>
            </div>
          </Container>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { boardService } from '../service/board-service-copy.js'
import { Container, Draggable } from 'vue3-smooth-dnd'
import { applyDrag } from '../service/helpers.js'
import groupPreview from '../components/group-preview.vue'
import editableText from '../components/editable-text.vue'
import boardHeader from '../components/board-header.vue'
import appHeader from '../components/app-header.vue'
import { eventBus } from '../service/eventBus.service.js'


import { socketService, SOCKET_EMIT_SET_BOARD, SOCKET_EVENT_UPDATE_BOARD, SOCKET_EVENT_BOARD_UPDATED } from '../service/socket.service'

export default {
  name: 'board-view',
  components: {
    Container,
    Draggable,
    groupPreview,
    editableText,
    boardHeader,
    appHeader,
  },
  data() {
    return {
      isAddNewGroup: false,
      newGroup: JSON.parse(JSON.stringify(this.$store.getters.getEmptyGroup)),
      blackScreen: false,
      counter: 0,
    }
  },
  async created() {
    try {
      const { boardId } = this.$route.params
      await this.$store.dispatch({ type: 'getById', boardId })
      socketService.emit(SOCKET_EMIT_SET_BOARD, boardId)
      socketService.on(SOCKET_EVENT_BOARD_UPDATED, this.updateBoard)
      eventBus.on('close-task', this.rToBoard)
    } catch (err) {
      console.log('Somthing went wrong with this board,', err)
    }
  },
  methods: {
    rToBoard() {
      this.blackScreen = !this.blackScreen
      eventBus.emit('close-edit')
      this.$router.push(`/board/${this.board._id}`)
    },
    updateBoard(board) {
      // this.$store.commit({ type: 'setCurrBoard', currBoard: board })
      this.$store.dispatch({ type: 'saveBoardFromSocket', board, });
    },
    checkSaveBoard(board) {
      this.counter += 1
      if (this.counter === board.groups.length) {
        this.$store.dispatch({ type: 'saveBoard', board, });
        this.counter = 0
      }
    },
    goToEdit(groupId, taskId) {
      this.$router.push(`/board/${this.board._id}/${groupId}/${taskId}`)
    },
    onColumnDrop(dropResult) {
      const board = Object.assign({}, this.board)
      board.groups = this.applyDrag(board.groups, dropResult)
      this.$store.commit({
        type: 'setCurrBoard',
        board,
      })
      this.saveBoard(board)
    },
    getCardPayload(groupId) {
      return (index) => {
        return this.currBoard.groups.filter((p) => p.id === groupId)[0].tasks[
          index
        ]
      }
    },
    async saveBoard(board) {
      await this.$store.dispatch({ type: 'saveBoard', board })
    },
    async addGroup() {
      this.newGroup.id = ''

      if (!this.newGroup.title) return
      await this.$store.dispatch({ type: 'saveGroup', group: this.newGroup })
      this.newGroup = JSON.parse(
        JSON.stringify(this.$store.getters.getEmptyGroup)
      )
    },
    editIsToggle() {
      this.blackScreen = !this.blackScreen
    },
    applyDrag(arr, dragResult) {
      const { removedIndex, addedIndex, payload } = dragResult
      if (removedIndex === null && addedIndex === null) return arr
      const result = [...arr]
      let itemToAdd = payload
      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0]
      }
      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
      }
      return result;
    },
  },
  computed: {
    board() {
      return this.$store.getters.currBoard
      // return this.$store.getters.currBoard
      // return JSON.parse(JSON.stringify(this.$store.getters.currBoard))
    },
    boardBackground() {
      if (this.board.style.bgCover) {
        return { backgroundImage: `url(${this.board.style.bgCover})` }
      } else if (this.board.style.bgColor) {
        return { backgroundColor: this.board.style.bgColor }
      }
    },
    boradClass() {
      if (this.blackScreen) return {
        "backgroundColor": '#000000a3',
        "z-index": "10",
        // "width": "100vh",
        "height": "100%",
        "position": 'fixed',
        "right": '0',
        "left": '0',
        "top": '0',
        "bottom": '0',
      }
    }
  },
  unmounted() { },
}
</script>

<style>
.smooth-dnd-container.horizontal {
  display: flex !important;
}
</style>
