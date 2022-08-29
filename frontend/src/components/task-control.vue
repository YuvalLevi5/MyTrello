<template>
    <section class="flex flex-col task-control">


        <div class="flex justify-between items-center">
            <h3 class="suggested-settings">Suggested</h3>
            <div class="flex flex-center svg-holder">
                <img class="settings-svg" src="../../src/svgs/settings.svg" alt="">
            </div>
        </div>

        <div class="action-btn">
            <img class="close-svg" src="../../src/svgs/user.svg" alt="" />
            <span class="action-span">Join</span>
        </div>

        <h3 class="add-to-card-txt">Add to card</h3>

        <div class="action-btn">
            <img class="close-svg" @click="togglePopup('Member')" src="../../src/svgs/user.svg" alt="" />
            <span class="action-span" @click="togglePopup('Member')">Members</span>
            <popup-member v-if="isMemberOpen" :task="task" @toggle-popup="togglePopup"
                @remove-task-member="removeTaskMember" @assign-task-member="assignTaskMember" />
        </div>

        <div class="action-btn">
            <img class="close-svg" @click="togglePopup('Label')" src="../../src/svgs/label.svg" alt="">
            <span class="action-span" @click="togglePopup('Label')">Labels</span>
        </div>
        <popup-label v-if="isLabelOpen" @set-task-labels="setTaskLabels" @toggle-popup="togglePopup" tabindex="0"
            ref="Label" :task="task">
        </popup-label>

        <div class="action-btn">
            <img @click="togglePopup('Checklist')" class="close-svg" src="../../src/svgs/check.svg" alt="" />
            <span @click="togglePopup('Checklist')" class="action-span">Checklist</span>
            <popup-checklist v-if="isChecklistOpen" @add-checklist="setChecklist" @toggle-popup="toggleCheklist" />
        </div>

        <div class="action-btn">
            <img class="close-svg" @click="togglePopup('Duedate')" src="../../src/svgs/date.svg" alt="">
            <span class="action-span" @click="togglePopup('Duedate')">Dates</span>
            <popup-duedate v-if="isDuedateOpen" @toggle-popup="togglePopup" @save-date="saveDate"
                :taskDuedate="task.duedate" ref="Duedate" />
        </div>


        <div class="action-btn">
            <img class="close-svg" @click="togglePopup('Attachment')" src="../../src/svgs/attachment.svg" alt="">
            <span class="action-span" @click="togglePopup('Attachment')">Attachement</span>
            <popup-attachment v-if="isAttachmentOpen" @attachFile="saveAttachments" @toggle-popup="togglePopup"
                :attachments="task.attachments" ref="Attachment"></popup-attachment>
        </div>

        <div class="action-btn">
            <img class="close-svg" @click="togglePopup('Cover')" src="../../src/svgs/screen.svg" alt="">
            <span class="action-span" @click="togglePopup('Cover')">Cover</span>
        </div>
        <popup-cover v-if="isCoverOpen" :task="task" @setCoverColor="saveTask" @setCoverImg="saveTask"
            @toggle-popup="togglePopup" @removeCover="saveTask" @attachFile="saveAttachments" />

    </section>
</template>

<script>
import { boardService } from '../service/board-service';
import popupChecklist from './popup-cheklist.vue'
import popupDuedate from './popup-duedate.vue'
import popupLabel from './popup-label.vue'
import popupAttachment from './popup-attachment.vue';
import popupCover from './popup-cover.vue';
import popupMember from './popup-member.vue'



export default {
    props: {
        task: Object,
    },
    components: {
        popupChecklist,
        popupDuedate,
        popupLabel,
        popupAttachment,
        popupCover,
        popupMember,
    },
    data() {
        return {
            isChecklistOpen: false,
            isDuedateOpen: false,
            isLabelOpen: false,
            isAttachmentOpen: false,
            isCoverOpen: false,
            isMemberOpen: false
        }
    },
    methods: {
        togglePopup(str) {
            var dataStr = `is${str}Open`;
            this[dataStr] = !this[dataStr];
        },
        toggleCheklist() {
            this.isChecklistOpen = false
        },
        setChecklist(checklist) {
            const task = JSON.parse(JSON.stringify(this.task))
            checklist.id = boardService._makeId();
            if (!task.checklists) task.checklists = []
            task.checklists.push(checklist);
            this.saveTask(task)
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
        setTaskLabels({ labelIds }) {
            this.task.labelIds = labelIds;
            const task = JSON.parse(JSON.stringify(this.task))
            this.saveTask(task);
        },
        saveAttachments(file) {
            if (!this.task.attachments) this.task.attachments = []
            this.task.attachments.push(file)
            const task = JSON.parse(JSON.stringify(this.task))
            this.saveTask(task)
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
    }

}
</script>