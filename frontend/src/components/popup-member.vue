<template>
    <div class="popup popup-member">
        <div slot="header" class="task-popup-header">
            <h2>Members</h2>
            <img class="close-svg"  @click="togglePopup" src="../../src/svgs/close_FILL0_wght400_GRAD0_opsz48.svg" alt="" />
        </div>
        <div slot="main" class="task-popup-main">
            <input type="text" v-model="searchStr" placeholder="Search for members..." class="search-member" />
            <ul class="clean-list" v-if="memberList">
                <li v-for="member in memberList" :key="member._id" class="member-details"
                    :class="{ 'member-selected': isSelected(member._id) }" @click="toggleAddMember(member)">
                    <member-preview :member="member" />

                    <h4 class="member-name">{{ member.fullname }}<span></span></h4>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import memberPreview from "./member-preview.vue";

export default {
    props: {
        task: Object,
    },
    data() {
        return {
            searchStr: "",
            boardMembers: null,
            taskMembers: null,
        };
    },
    created() {
        this.taskMembers = JSON.parse(JSON.stringify(this.task.members)) || [];
    },
    methods: {
        togglePopup() {
            this.$emit("toggle-popup", "Member");
        },
        isSelected(id) {
            const taskMembers = this.taskMembers;
            if (!taskMembers) return;
            return taskMembers.some(({ _id }) => _id === id);
        },
        toggleAddMember(member) {
            if (!this.taskMembers) this.taskMembers = [];
            if (!this.isSelected(member._id)) {
                this.taskMembers.push(member);
                this.$emit("assign-task-member", member);
            } else {
                const memberIdx = this.taskMembers.findIndex(
                    ({ _id }) => _id === member._id
                );
                this.taskMembers.splice(memberIdx, 1);
                this.$emit("remove-task-member", member._id);
            }
        },
    },
    computed: {
        memberList() {
            const members = this.$store.getters.currBoard.members;
            return members.filter((member) => {
                return member.fullname
                    .toLowerCase()
                    .includes(this.searchStr.toLowerCase());
            });
        },
    },

    components: {
        memberPreview,
    },
};
</script>
