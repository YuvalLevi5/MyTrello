<template>
  <div class="task-duedate" v-if="duedate.date">
    <h4 class="task-info-headline">Due Date</h4>
    <div class="duedate-date flex items-center gap-1">
      <input class="task-checkbox" type="checkbox" v-model="isComplete" @change="toggleComplete" />
      <div class="flex date">
        <p  @click="togglePopup" v-if="date" class="task-text-details">{{ dueDateFixed }} <span class="task-complete" v-if="this.duedate.isComplete"> {{
            status
        }}</span> </p>
        <popup-duedate v-if="isDuedateOpen" @toggle-popup="togglePopup" @save-date="saveDate"
          :taskDuedate="task.duedate" ref="Duedate" />
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import popupDuedate from "./popup-duedate.vue";

export default {
  props: {
    duedate: Object,
    task: Object
  },
  data() {
    return {
      isComplete: null,
      isDuedateOpen: false,
    };
  },
    components: {
    popupDuedate
  },
  created() {
    this.isComplete = this.duedate.isComplete;
  },
  methods: {
    toggleComplete() {
      this.$emit("set-completion", this.isComplete);
    },
    togglePopup() {
      this.isDuedateOpen = !this.isDuedateOpen
    },
    async saveTask(task) {
      await this.$store.dispatch({ type: "saveTask", task });
    },
    saveDate(duedate) {
      this.task.duedate = duedate;
      const task = JSON.parse(JSON.stringify(this.task))
      this.togglePopup("Duedate");
      this.saveTask(task);
    },
  },
  computed: {
    date() {
      const duedate = new Date(parseInt(this.duedate.date));
      const day = moment(duedate).format("MMM D");
      const hour = moment(duedate).format("hh:mm A");
      const date = {
        day,
        hour,
      };
      return date;
    },
    status() {
      if (this.duedate.isComplete) return 'complete';
      if (parseInt(this.duedate.date) - Date.now() < 0) return 'overdue';
      return null;
    },
    dueDateFixed() {
      if (this.duedate) {
        var fixedDate = (new Date(this.duedate.date) + '').slice(4, 10)
        fixedDate += ' at 12:00 AM'
        return fixedDate
      }
    },
  },
};
</script>

<style>
</style>