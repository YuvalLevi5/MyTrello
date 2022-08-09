<template>
  <section class="board-header">
    <div class="left-nav">
      <input @focus="$event.target.select()" @change="boardTitleChange" type="text" v-model="boardCopy.title" />
      <button @click="boardStarred" class="star-icon">
        <font-awesome-icon v-if="board?.isStarred" class="starred" icon="fa-solid fa-star" />
        <font-awesome-icon v-else class="unstarred" icon="fa-regular fa-star" />
      </button>
      <span class="divider"></span>

      <div v-if="board.members?.length" class="board-header-members">
        <member-preview v-for="member in board.members" :key="member._id" class="avatar" :member="member" />
        <!-- <div v-for="member in board.members" :key="member._id" class="avatar">
          <img v-if="member.imgUrl" :src="member.imgUrl" />
          <span v-else>{{ formattedName(member.fullname) }}</span>
        </div> --> 
        <button class="invie-btn">Invite</button>
      </div>

    </div>
    <div class="right-nav">
      <button>Filter</button>
      <button @click="isMenuOpen = true">
        <font-awesome-icon icon="fa-solid fa-ellipsis" />
        <span>Show menu</span>
      </button>
      <board-menu v-if="isMenuOpen" @close-menu="isMenuOpen = false" @color-change="boardColorChange" :board="board" />
    </div>
  </section>
</template>

<script>
import boardMenu from './board-menu.vue'
import memberPreview from './member-preview.vue';

export default {
  props: {
    board: Object,
  },

  data() {
    return {
      boardCopy: null,
      isMenuOpen: false,
    }
  },

  created() {
    this.boardCopy = JSON.parse(JSON.stringify(this.board))
  },

  methods: {
    boardStarred() {
      this.boardCopy.isStarred = !this.boardCopy.isStarred
      this.$emit('board-update', this.boardCopy)
    },
    boardTitleChange() {
      this.boardCopy.title = this.boardCopy.title
      this.$emit('board-update', this.boardCopy)
    },
    boardColorChange(color) {
      this.boardCopy.style.bgColor = color
      this.boardCopy.style.bgCover = null
      this.$emit('board-update', this.boardCopy)
    },
    formattedName(memberName) {
      const spaceIdx = memberName.indexOf(' ')
      return memberName.charAt(0) + memberName.charAt(spaceIdx + 1)
    },
  },

  components: {
    boardMenu,
    memberPreview,
  },
}
</script>
