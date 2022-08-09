<template>
  <input type="text" />
  <p>Members</p>
  <input
    @input="$emit('filter', filterByTxt)"
    type="search"
    v-model="filterByTxt"
    placeholder="Search members"
  />
  <ul>
    <li
      @click="$emit('memberClicked', member)"
      v-for="member in boardMembers"
      :key="member._id"
    >
      {{ member.fullname }}
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      filterByTxt: '',
    }
  },

  props: {
    boardMembers: Array,
  },

  emits: ['memberClicked', 'filter'],
}
</script>

<style></style>
