<template>
  <section class="board-menu">
    <div class="header">
      <button class="back-button">
        <font-awesome-icon icon="fa-solid fa-chevron-left" />
      </button>
      <h3>{{ title }}</h3>
      <button @click="$emit('close-menu')" class="close-button">
        <font-awesome-icon icon="fa-solid fa-xmark" />
      </button>
    </div>
    <hr />
    <div v-if="changeBackground" class="change-background">
      <div v-for="color in colors" :key="color" class="color-option-container">
        <div
          @click="$emit('color-change', color)"
          class="color-option"
          :style="{ backgroundColor: color }"
        ></div>
      </div>
    </div>
    <div v-else class="board-menu-content">
      <ul>
        <li @click="changeBackground = true">
          <div class="icon" :style="iconBackground"></div>
          <p>Change background</p>
        </li>
        <li>
          <div class="icon">
            <img src="../svgs/archive.svg" />
          </div>
          <p>Archived items</p>
        </li>
      </ul>
      <hr />
      <div class="activity-list">
        <div class="activity-header">
          <i></i>
          <p>Activity</p>
        </div>
        <div
          class="activity"
          v-for="activity in board.activities"
          :key="activity.id"
        >
          <span class="avatar">
            <img :src="activity.byMember.imgUrl" />
          </span>
          <div class="activity-info">
            <span class="member-name">{{ activity.byMember.fullname }}</span>
            <p>{{ activity.txt }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    board: Object,
  },

  data() {
    return {
      changeBackground: false,
      archivedMenu: false,
      colors: [
        'rgb(0, 121, 191)',
        'rgb(210, 144, 52)',
        'rgb(81, 152, 57)',
        'rgb(176, 70, 50)',
        'rgb(137, 96, 158)',
        'rgb(205, 90, 145)',
        'rgb(75, 191, 107)',
        'rgb(0, 174, 204)',
        'rgb(131, 140, 145)',
      ],
    }
  },

  computed: {
    title() {
      if (this.changeBackground) return 'Change background'
      else if (this.archivedMenu) return 'Archived Items'
      else return 'Menu'
    },
    iconBackground() {
      return this.board.imgUrl
        ? { backgroundImage: `url(${this.board.imgUrl})` }
        : { backgroundColor: this.board.style.backgroundColor }
    },
  },
}
</script>
