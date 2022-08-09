<template>
  <section class="member-preview-section">
    <h4 v-if="isInTask" class="task-info-headline">Members</h4>
    <div class="member-list-container">
      <div v-if="members && members.length">
        <ul class="clean-list flex member-list">
          <li v-for="member in members" :key="member._id" @click="toggleMemberDetails($event, member)">
            <member-preview :member="member" @toggle-member-details="toggleMemberDetails" />
          </li>
          <li v-if="isInTask" class="add-member-btn" @click="openMemberPopup">
            <img @click="togglePopup()" class="plus-svg" src="../../src/svgs/plus.svg" alt="" />
            <popup-member v-if="isMemberOpen" :task="task" @toggle-popup="togglePopup"
              @remove-task-member="removeTaskMember" @assign-task-member="assignTaskMember" />
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import memberPreview from './member-preview.vue';
import popupMember from './popup-member.vue';

export default {
  props: {
    members: Array,
    isTaskRelated: Boolean,
    isInTask: Boolean,
    task: Object
  },
  data() {
    return {
      isShowMemberDetails: false,
      selectedMember: null,
      addBoardMember: false,
      isMemberOpen: false,
    };
  },
  computed: {
    filteredUsers() {
      const boardUsers = this.$store.getters.currBoard.members;
      const filteredUsers = this.$store.getters.users.filter((user) => {
        return !boardUsers.some((boardUser) => boardUser._id === user._id);
      });
      return filteredUsers;
    },
  },
  methods: {
    toggleMemberDetails(ev, member) {
      ev.stopPropagation();
      this.selectedMember = member;
      this.isShowMemberDetails = !this.isShowMemberDetails;
    },
    togglePopup() {
      this.isMemberOpen = !this.isMemberOpen
    },
    assignTaskMember(member) {
      if (!this.task.members) this.task.members = [];
      this.task.members.push(member);
      const task = JSON.parse(JSON.stringify(this.task))
      this.saveTask(task)
    },
    removeTaskMember(id) {
      const memberIdx = this.task.members.findIndex(({ _id }) => _id === id);
      if (memberIdx < 0) return;
      const deletedMember = this.task.members.splice(memberIdx, 1);
      const task = JSON.parse(JSON.stringify(this.task))
      this.saveTask(task)
    },
    async saveTask(task) {
      await this.$store.dispatch({ type: "saveTask", task });
    },
  },

  components: {
    memberPreview,
    popupMember
  },
};
</script>

