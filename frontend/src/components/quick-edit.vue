<template>
  <router-view></router-view>
  <section class="quick-card-editor" :style="taskPlace" v-if="task">
    <div class="quick-edit">
      <div>
        <popup-label @click.stop v-if="isLabelOpen" :task="task" @set-task-labels="setTaskLabels"
          @toggle-popup="togglePopup" />
        <popup-member @click.stop v-if="isMemberOpen" :task="task" @toggle-popup="togglePopup"
          @remove-task-member="removeTaskMember" @assign-task-member="assignTaskMember" />
        <popup-cover @click.stop v-if="isCoverOpen" :task="task" @setCoverColor="saveTask" @setCoverImg="saveTask"
          @toggle-popup="togglePopup" @removeCover="saveTask" @attachFile="saveAttachments" />
        <popup-duedate @click.stop v-if="isDuedateOpen" @toggle-popup="togglePopup" @save-date="saveDate"
          :taskDuedate="task.duedate" ref="Duedate" />
      </div>
      <div @click.stop class="card-editor">
        <div class="card-details">
          <form>
            <textarea @click.stop v-model="task.title"></textarea>
          </form>
        </div>
        <button @click.stop="saveTask">Save</button>
      </div>
      <div class="quick-card-editor-buttons">
        <button @click.prevent="openCardDetails">Open card</button>
        <button @click.stop="togglePopup('Label')">Edit labels</button>
        <button @click.stop="togglePopup('Member')">Change members</button>
        <button @click.stop="togglePopup('Cover')">Change cover</button>
        <button @click.stop="togglePopup('Duedate')">Edit dates</button>
      </div>
    </div>
  </section>
</template>

<script>
import popupLabel from './popup-label.vue'
import popupMember from './popup-member.vue'
import popupCover from './popup-cover.vue'
import popupDuedate from './popup-duedate.vue'


export default {
  props: {
    task: Object,
    boardId: String,
    groupId: String,
    position: Object
  },
  // emits: {
  //   togglePopup
  // },
  emits: ["togglePopup", "click", "taskEdited"],
  components: {
    popupLabel,
    popupDuedate,
    popupCover,
    popupMember,
  },
  data() {
    return {
      isLabelOpen: false,
      isMemberOpen: false,
      isCoverOpen: false,
      isDuedateOpen: false,
    }
  },
  methods: {
    saveTask() {
      const task = JSON.parse(JSON.stringify(this.task))
      this.$emit('taskEdited', task)
    },
    openCardDetails() {
      this.$router.push(`/board/${this.boardId}/${this.groupId}/${this.task.id}`)
      this.$emit('togglePopup')
    },
    closeModal() {
      this.$emit('togglePopup')
    },
    openLabelEdit() {
      this.isLabelOpen = !this.isLabelOpen
    },
    togglePopup(str) {
      var dataStr = `is${str}Open`;
      this[dataStr] = !this[dataStr];
    },
    // async saveTask(task) {
    //   console.log('task: ' , task)
    //   await this.$store.dispatch({ type: "saveTask", task });
    // },
    setTaskLabels({ labelIds }) {
      this.task.labelIds = labelIds;
      const task = JSON.parse(JSON.stringify(this.task))
      this.saveTask(task);
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
    saveAttachments(file) {
      if (!this.task.attachments) this.task.attachments = []
      this.task.attachments.push(file)
      const task = JSON.parse(JSON.stringify(this.task))
      this.saveTask(task)
    },
    goToBoard() {
      this.$router.push(`/board/${this.boardId}`)
      this.$emit('togglePopup')
    },
    saveDate(duedate) {
      this.task.duedate = duedate;
      const task = JSON.parse(JSON.stringify(this.task))
      this.togglePopup("Duedate");
      this.saveTask(task);
    },
  },
  computed: {
    taskPlace() {
      return {
        'top': this.position.top - 12 + 'px',
        // 'left': this.position.left + 'px',
        'width': this.position.width + 'px',
        'position': 'fixed',
        'z-index': 10
      }
    }
  }
}
</script>
