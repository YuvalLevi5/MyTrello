<template>
    <li class="clean-list task-checklist">
        <div class="flex justify-between items-center checklist-header">
            <div class="flex align-center items-center t-and-i">
                <img class="check-svg" src="../../src/svgs/check.svg" alt="" />
                <input class="input-checklist-title" @change="editTitle" v-model="checklist.title" />
            </div>
            <button @click="deleteChecklist" v-if="!isEditTitleOpen" class="button">
                Delete
            </button>
        </div>

        <div class="checklist-meter flex align-center items-center">
            <p class="checklist-percentage">{{ progressPercentage }}%</p>

            <div class="meter">
                <span :style="'width:' + progressPercentage + '%'">
                    <span class="progress"></span>
                </span>
            </div>
        </div>

        <form>

    <li v-for="todo in checklist.todos" :key="todo.id" class="items-list clean-list flex  align-center items-center"
        :style="[todo.isDone ? { 'text-decoration': 'line-through' } : '']">
        <input class="checklist-checkbox" type="checkbox" :ref="todo.id" :id="todo.id" :name="todo.id"
            @click="toggleChecked(todo)" :checked="todo.isDone" />
        <div class="flex justify-between items-center item">
            <input class="input-checklist-txt" :for="todo.id" @change="editTodo(todo)" v-model="todo.txt" />
            <span @click.prevent="deleteTodo(todo)" class="">x </span>
        </div>
    </li>

    <footer class="add-item-footer">
        <div v-if="!isAddTodoOpen" class="add-card">
            <button @click="isAddTodoOpen = true" class="button">
                Add an item
            </button>
        </div>
        <form class="save-item" v-else>
            <textarea class="task" type="text" v-model="todo.txt" @change="addTodo"
                placeholder="Enter a title for this item" />
            <div class="save-item-actions">
                <button @click.prevent="addTodo" class="button">Add item</button>
                <svg @click="isAddTodoOpen = false" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24"
                    height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path fill="none" stroke="#000" stroke-width="2" d="M3,3 L21,21 M3,21 L21,3"></path>
                </svg>
            </div>
        </form>
    </footer>
    </form>
    </li>
</template>

<script>
import { boardService } from "../service/board-service";
import editableText from "./editable-text.vue";

export default {
    props: {
        checklist: Object,
    },
    data() {
        return {
            checklistTitle: "",
            todo: {
                txt: "",
                isDone: false,
            },
            isEditTitleOpen: false,
            isAddTodoOpen: false,

            currTodoId: "",
            isEditTodoOpen: false,
        };
    },
    computed: {
        progressPercentage() {
            if (!this.checklist.todos.length) return 0;
            const doneTodos = this.checklist.todos.filter((todo) => todo.isDone);
            const progress = Math.floor(
                (doneTodos.length / this.checklist.todos.length) * 100
            );
            return progress;
        },
    },
    methods: {
        openAddTodo() {
            this.isAddTodoOpen = true;
        },
        setCurrTodo(todoId) {
            this.currTodoId = todoId;
        },
        openEditTitle() {
            this.isEditTitleOpen = true;
        },
        editTitle() {
            // this.checklist.title = this.checklistTitle;
            this.saveChecklist()
        },
        addTodo() {
            console.log(this.todo.txt)
            // this.todo.txt = val
            if (!this.todo.txt) return
            if (!this.checklist.todos) this.checklist.todos = [];
            console.log(':hhhhhhhh ')
            this.todo.id = boardService._makeId();
            this.checklist.todos.push({ ...this.todo });
            this.saveChecklist();
            console.log(this.checklist);
            this.todo = {
                txt: "",
                isDone: false,
            };
        },
        editTodo(todo) {
            const idx = this.checklist.todos.findIndex(({ id }) => id === todo.id);
            this.checklist.todos.splice(idx, 1, todo);
            this.saveChecklist();
        },
        deleteTodo(todo) {
            const idx = this.checklist.todos.findIndex(({ id }) => id === todo.id);
            this.checklist.todos.splice(idx, 1);
            this.saveChecklist();
        },
        toggleChecked(todo) {
            const checkBox = document.getElementById(todo.id);
            // const checkBox = this.$refs[todoId]
            if (checkBox.checked) todo.isDone = true;
            else todo.isDone = false;

            this.saveChecklist();
        },
        deleteChecklist() {
            this.$emit("delete-checklist", this.checklist.id);
        },
        saveChecklist() {
            this.$emit("save-todo", { ...this.checklist });
        },
    },
    components: {
        editableText,
    },
};
</script>
