<template>
  <div v-if="!isPopupEdit" class="popup popup-label" ref="popupLabel">
    <div slot="header" class="task-popup-header">
      <h2>Labels</h2>
      <img class="close-svg" @click.prevent="togglePopupLabel()" src="../../src/svgs/close_FILL0_wght400_GRAD0_opsz48.svg"
        alt="" />
    </div>

    <div slot="main">
      <input type="search" v-model="searchStr" placeholder="Search labels..." class="search-label" />
      <ul v-if="boardLabels" class="clean-list label-list ">

        <li v-for="label in boardLabels" :key="label.id" class="flex justify-between label items-center gap-1">
          <div :class="{ 'label-in-use': isUsed(label.id) }" :style="{
            backgroundColor: label.color
          }" class="label-main flex justify-between items-center" @click="toggleSelectLabel(label.id)">

            <span  class="label-title">
              {{ label.title }}
            </span>
            <img class="close-svg" v-if="isUsed(label.id)" src="../../src/svgs/check-sign.svg" alt="" />
          </div>
          <img class="edit-svg" @click="openLabelEdit($event, 'Change', label)" src="../svgs/edit.svg" alt="">
        </li>

      </ul>

      <span @click="openLabelEdit($event, 'Create')" class="create-new-label-btn">
        Create a new label
      </span>
    </div>
  </div>
  <popup-label-edit v-else :action="action" :label="selectedLabel" @save-label="saveLabel"
    @closeLabelEdit="closeLabelEdit" @remove-board-label="removeBoardLabel" />
</template>

<script>
import { boardService } from "../service/board-service";
import popupLabelEdit from "./popup-label-edit.vue";
export default {
  props: {
    task: Object,
  },
  data() {
    return {
      isPopupEdit: false,
      action: "",
      selectedLabel: null,
      searchStr: "",
      leftPos: null,
      topPos: null,
    };
  },
  methods: {
    toggleSelectLabel(labelId) {
      if (this.taskLabelIdEdit.includes(labelId)) {
        const labelIdx = this.taskLabelIdEdit.findIndex((id) => id === labelId);
        this.taskLabelIdEdit.splice(labelIdx, 1);
      } else this.taskLabelIdEdit.push(labelId);
      this.$emit("set-task-labels", { labelIds: this.taskLabelIdEdit });
      this.$forceUpdate();
    },
    isUsed(labelId) {
      const label = this.taskLabelIdEdit.find((id) => {
        return id === labelId;
      });
      return !!label;
    },
    openLabelEdit(ev, editAction, label) {
      this.selectedLabel = label;
      this.action = editAction;
      this.isPopupEdit = true;
    },
    closeLabelEdit() {
      this.isPopupEdit = !this.isPopupEdit;
    },
    togglePopupLabel() {
      this.$emit("toggle-popup", "Label");
    },
    async saveLabel(label) {
      if (!label.id) {
        label.id = boardService._makeId()
        this.boardLabels.push(label)
      } else {
        const idx = this.boardLabels.findIndex((currLabel) => currLabel.id === label.id)
        this.boardLabels.splice(idx, 1, label)

      }

      await this.$store.dispatch({
        type: "saveBoardLabels",
        labels: this.boardLabels,
      });
      this.closeLabelEdit();
    },
    async removeBoardLabel(id) {
      const labelIdx = this.boardLabels.findIndex((label) => label.id === id);
      if (labelIdx >= 0) this.boardLabels.splice(labelIdx, 1);
      await this.$store.dispatch({
        type: "saveBoardLabels",
        labels: this.boardLabels,
      });
    },
  },
  mounted() {
  },
  computed: {
    boardLabels() {
      const boardLabels = this.$store.getters.currBoard.labels;
      return boardLabels.filter((label) => {
        return label.title.toLowerCase().includes(this.searchStr.toLowerCase());
      });
    },
    taskLabelIdEdit() {
      const taskLabels = this.task.labelIds;
      if (!taskLabels) return [];
      return [...taskLabels];
    },
  },
  components: {
    popupLabelEdit,
  },
};
</script>