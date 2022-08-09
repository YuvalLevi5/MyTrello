<template>
    <el-form class="demo-form-inline">
        <el-input v-model="title" />
        <el-button type="primary" @click="onSubmit">Add</el-button>
    </el-form>
</template>

<script >

export default {
    data() {
        return {
            title: 'Checklist'
        }
    },
    methods: {
        onSubmit() {
            var id = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for (var i = 0; i < 5; i++) {
                id += characters.charAt(Math.floor(Math.random() *
                    characters.length));
            }

            const checklist = {
                title: this.title,
                id,
                todos: []
            }
            this.$emit('addChecklist', checklist)
        }
    }
}
</script>
