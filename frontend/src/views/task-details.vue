<template>
    <section class="task-details-container" v-if="task">
        <img class="close-task-svg" @click="closeTask" src="../../src/svgs/close_FILL0_wght400_GRAD0_opsz48.svg"
            alt="" />

        <div class="main-task-content">
            <div>
                <div v-if="task.style" :style="taskCoverStyle" :class="taskCoverClass" class="task-cover">
                </div>
                <div class="header flex justify-between items-center task-details-title">
                    <div class="flex align-center items-center header-container">
                        <img class="header-svg" src="../../src/svgs/screen.svg" alt="" />
                        <input class="task-title" @change="saveTask(task)" v-model="task.title" />
                    </div>
                </div>
            </div>


            <div class="task-content flex justify-between">
                <div class="task-actions">
                    <task-control :task="task" @set-checklist="saveChecklist" />
                </div>

                <div class="task-main-content">
                    <member-list v-if="task.members && task.members.length" :members="task.members" :task="task"
                        :isTaskRelated="true" :isInTask="true" @remove-task-member="removeTaskMember" />
                    <task-label v-if="task.labelIds && task.labelIds.length" :taskLabelIds="task.labelIds"
                        :task="task" />
                    <task-duedate v-if="task.duedate" :duedate="task.duedate" @set-completion="setCompletion"
                        :task="task" />
                    <task-description :description="task.description" @save-desc="saveDescription" />

                    <task-checklist v-if="task.checklists" v-for="checklist in task.checklists" :key="checklist.id"
                        class="checklist-container" :checklist="checklist" @save-todo="saveTodo"
                        @delete-checklist="deleteChecklist" />

                    <div>
                        <task-attachements v-for="attachement in task.attachments" :key="attachement.id"
                            :attachement="attachement" :task="task" @removeAttachment="removeAttachment"
                            @updateAttachment="updateAttachment" @toggleCover="saveTask" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import searchListModal from '../components/search-list-modal.vue'
import checklistModal from '../components/awsome-cmps/checklist-modal.vue'
import datePicker from '../components/awsome-cmps/date-picker.vue'
import filePicker from '../components/awsome-cmps/file-picker.vue'

import { boardService } from '../service/board-service'

// description
// TRY SOMTHING NEW
import taskControl from '../components/task-control.vue'
import taskChecklist from '../components/task-checklist.vue'
import taskDuedate from '../components/task-duedate.vue'
import taskDescription from '../components/task-description.vue'
import taskLabel from '../components/task-label.vue'
import taskAttachements from '../components/task-attachements.vue'
import memberList from '../components/member-list.vue'
import { eventBus } from '../service/eventBus.service'

export default {

    data() {
        return {
            // task: null,
            boardLabels: null,
            boardMembers: null,
            lablesModalIsShow: false,
            membersModalIsShow: false,
            windowHeight: window.innerHeight
        }
    },
    async created() {
    },
    components: {
        searchListModal,
        checklistModal,
        datePicker,
        filePicker,
        taskControl,
        taskChecklist,
        taskDuedate,
        taskDescription,
        taskLabel,
        taskAttachements,
        memberList,
    },
    methods: {

        saveChecklist(checklist) {
            const task = this.task;
            task.checklists.push(checklist);
            this.saveTask(task);
        },
        saveTask(task) {
            this.$store.dispatch({ type: "saveTask", task });
        },
        saveTodo(checklist) {
            const idx = this.task.checklists.findIndex(
                ({ id }) => id === checklist.id
            )
            this.task.checklists.splice(idx, 1, checklist);
            const task = this.task;
            this.saveTask(task)
        },
        deleteChecklist(checklistId) {
            const idx = this.task.checklists.findIndex(
                ({ id }) => id === checklistId
            );
            this.task.checklists.splice(idx, 1);
            const task = this.task;
            this.saveTask(task);
        },
        setCompletion(isComplete) {
            this.task.duedate.isComplete = isComplete;
            this.saveTask(this.task);
        },
        saveDescription(description) {
            this.task.description = description
            this.saveTask(this.task)
        },
        async closeTask() {
            eventBus.emit('close-task')
            const board = await this.$store.getters.currBoard
            this.$router.push(`/board/${board._id}`)
        },
        removeAttachment(attachmentId) {
            const idx = this.task.attachments.findIndex(attachment => {
                return attachment.id === attachmentId
            })
            this.task.attachments.splice(idx, 1)
            this.saveTask(this.task)
        },
        updateAttachment(updatedAttachment) {
            const idx = this.task.attachments.findIndex(attachment => {
                return attachment.id === updatedAttachment.id
            })
            this.task.attachments.splice(idx, 1, updatedAttachment)
            this.saveTask(this.task)
        },
        removeTaskMember(id) {
            const memberIdx = this.task.members.findIndex(({ _id }) => _id === id);
            if (memberIdx < 0) return;
            this.task.members.splice(memberIdx, 1);
            this.saveTask(this.task);
        },

    },
    computed: {
        task() {
            return JSON.parse(JSON.stringify(this.$store.getters.currTask));
        },
        taskCoverStyle() {
            if (this.task.style.bgImg)
                return { backgroundImage: 'url(' + this.task.style.bgImg + ')' }
            else return { backgroundColor: this.task.style.bgColor }
        },
        taskCoverClass() {
            if (this.task.style.bgImg) return 'task-cover-img'
            else return 'task-cover-color'
        }
    }
}
</script>

<style>
</style>
