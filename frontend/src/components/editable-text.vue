<template>
    <section @click="editDescription" class="editable-text">
        <form v-if="isEditing" @submit.prevent="setText">
            <textarea ref="input" :placeholder="placeholder"></textarea>
            <div>
                <button>Save</button>
                <button type="button" @click.stop="closeTextarea">x</button>
            </div>
        </form>
        <template v-else>
            <p v-if="value">{{ value }}</p>
            <p v-else>
                Enter a {{ type }} for this {{ elementType }}...
            </p>
        </template>
    </section>
</template>

<script>
export default {
    props: {
        isEditFirst: Boolean,
        type: "",
        title: String,
        value: String,
        elementType: String,
    },
    data() {
        return {
            isEditing: false,
        };
    },
    created() {
        if (this.isEditFirst) this.isEditing = this.isEditFirst;
    },
    methods: {
        editDescription() {
            this.isEditing = true;
        },
        setText() {
            const val = this.$refs.input.value;
            this.$emit("addTask", val);
            this.closeTextarea();
        },
        closeTextarea() {
            this.isEditing = false;
            this.$emit("close-textarea");
        },
    },
    computed: {
        placeholder() {
            return `Enter a ${this.type} for this ${this.elementType}..`;
        },
    },
    mounted() {
        if (this.$refs?.input) this.$refs.input.focus();
    },
};
</script>

<style>
</style>