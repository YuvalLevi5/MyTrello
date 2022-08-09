<template>
    <div class="popup popup-duedate">
        <div slot="header" class="task-popup-header">
            <h2>Change due date</h2>
            <button @click="togglePopup" class="btn close">X</button>
        </div>
        <div slot="main duedate-main">
            <el-date-picker v-model="value1" type="date" placeholder="Pick a date"
                :default-value="new Date(2022, 9, 1)" />
            <button class="duedate-btn save-duedate-btn" @click="saveDate">
                Save
            </button>
            <button class="duedate-btn remove-duedate-btn" @click="removeDate">
                Remove
            </button>
        </div>
    </div>
</template>

<script>
// import popUp from "../../common/pop-up.vue";

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import moment from "moment";
import { ref } from 'vue'

export default {
    props: {
        taskDuedate: Object,
    },
    data() {
        return {
            value1: ref(''),
            date: null,
            duedate: { date: null, isComplete: false },
            isDuedate: false,
        };
    },
    created() {
        if (this.taskDuedate?.date) this.duedate = this.taskDuedate;
        else this.duedate.date = Date.now();
        this.date = new Date(parseInt(this.duedate.date))
        this.isDuedate = true;
    },
    methods: {
        setDate(date) {
            this.date = date
            this.duedate.date = moment(date).format('x');
            this.isDuedate = true;
        },
        togglePopup() {
            this.$emit("toggle-popup", "Duedate");
        },
        saveDate() {
            if (this.isDuedate)
                this.$emit("save-date", { date: this.value1, isComplete: false })
            else this.$emit("save-date", { date: '', isComplete: false });
        },
        removeDate() {
            this.$emit("save-date", { date: '', isComplete: '' })
        },
    },
    computed: {
        day() {
            if (this.isDuedate) {
                return moment(this.date).format("D/M/YYYY");
            }
            return "";
        },
        hour() {
            if (this.isDuedate) {
                return moment(this.date).format("h:mm:ss A");
            }
            return "";
        },
    },
    components: {
        // popUp,
        Datepicker,
    },
};
</script>


