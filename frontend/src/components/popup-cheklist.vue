<template>
    <div class="popup popup-checklist" ref="popupChecklist">
        <div slot="header" class="task-popup-header">
            <h2>Add Checklist</h2>
            <img class="close-svg" @click="togglePopup" src="../../src/svgs/close_FILL0_wght400_GRAD0_opsz48.svg"
                alt="" />
        </div>
        <div slot="main " class="main-add-checklist">
            <h3 class="add-checklist-title">Title</h3>
            <input type="text" name="title" class="checklist-title-input" v-model="checklist.title" />
            <button @click="addChecklist" class="add-checklist-btn">
                Add
            </button>
        </div>
    </div>
</template>

<script>
import popUp from "./pop-up.vue";
export default {
    data() {
        return {
            checklist: {
                title: "Checklist",
                todos: [],
            },
        };
    },
    methods: {
        addChecklist() {
            this.$emit("add-checklist", { ...this.checklist });
            this.checklist = {
                title: "",
            };
            this.togglePopup()
        },
        togglePopup() {
            this.$emit("toggle-popup", "Checklist");
        },
    },
    async created() {
        const pos = await this.$refs.popupChecklist.getBoundingClientRect()
    },
    components: { popUp },
};
</script>
