<template>
    <section class="popup">
        <div v-if="!isDelete" class="label-edit-popup">
            <div slot="header" class="task-popup-header">
                <h2>{{ action }} label</h2>
                <img class="close-svg" @click="closeLabelEdit" src="../../src/svgs/close_FILL0_wght400_GRAD0_opsz48.svg"
                    alt="" />
                <!-- <button @click="closeLabelEdit" class="btn close icon x"></button> -->
            </div>

            <div slot="main">
                <h3 class="edit-label-title title-m">Name</h3>
                <input type="text" v-model="labelToEdit.title" />
                <h3 class="edit-label-title ">Select color</h3>
                <ul class="clean-list colors">
                    <li v-for="(color, idx) in colors" :key="'c' + idx" >
                        <button @click="setLabelColor(color.color)" :style="{ 'background-color': color.color }"
                            class="btn color" :class="{ 'color-in-use': color.selected }"></button>
                    </li>
                </ul>
                <div class="flex justify-between edit-label-actions">
                    <button @click="saveLabel" class="add-label-btn">Save</button>
                    <button @click="toggleIsDelete" class="delete-label-btn">
                        Delete
                    </button>
                </div>
            </div>
        </div>

        <div v-else="isDelete" class="delete-label-popup">
            <div slot="header" class="task-popup-header">
                <h2>Delete Label?</h2>
                <img class="close-svg" @click="toggleIsDelete" src="../../src/svgs/close_FILL0_wght400_GRAD0_opsz48.svg"
                    alt="" />
            </div>
            <div slot="main">
                <p class="info-delete">
                    There is no undo. This will remove this label from all cards and destroy its history.
                </p>
                <button @click="removeBoardLabel" class="delete-label-btn">
                    Delete
                </button>
            </div>
        </div>


    </section>
</template>

<script>
// import utilService from "../../../services/util.service";
import { boardService } from "../service/board-service";
export default {
    props: {
        label: Object,
        action: String,
    },
    data() {
        return {
            colors: [
                { color: "#61bd4f", selected: false },
                { color: "#f5dd29", selected: false },
                { color: "#ff9f1a", selected: false },
                { color: "#eb5a46", selected: false },
                { color: "#c377e0", selected: false },

                { color: "#0079bf", selected: false },
                { color: "#00c2e0", selected: false },
                { color: "#51e898", selected: false },
                { color: "#ff78cb", selected: false },
                { color: "#344563", selected: false },
            ],
            labelToEdit: null,
            isDelete: false,
        };
    },
    created() {
        if (this.label) this.labelToEdit = { ...this.label };
        else
            this.labelToEdit = {
                // id: boardService._makeId(),
                color: this.colors[0].color,
                title: "",
            };
        if (this.label) this.setSelectedColor(this.label.color);
    },
    methods: {
        closeLabelEdit() {
            this.$emit("closeLabelEdit");
        },
        setLabelColor(selectedColor) {
            this.setSelectedColor(selectedColor);
            this.labelToEdit.color = selectedColor;
        },
        setSelectedColor(selectedColor) {
            this.colors.forEach(
                (color) => (color.selected = color.color === selectedColor)
            );
        },
        saveLabel() {
            // if (!this.labelToEdit.id) this.labelToEdit.id = boardService._makeId();
            this.$emit("save-label", this.labelToEdit);
        },
        toggleIsDelete() {
            this.isDelete = !this.isDelete;
        },
        removeBoardLabel() {
            this.toggleIsDelete();
            this.$emit("remove-board-label", this.labelToEdit.id);
            this.closeLabelEdit();
        },
    },

    computed: {},
    components: {
    },
};
</script>