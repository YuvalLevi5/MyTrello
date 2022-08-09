<template>
    <div class="editable-title-wrapper" ref="wrapper">
        <h2 v-if="title" class="editable-title" contenteditable="true" @blur="onBlur" @focus="toggleWrapperFocus"
            ref="title" spellcheck="false">
            {{ str }}
        </h2>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
    },
    data() {
        return {
            str: this.title,
        };
    },
    methods: {
        onBlur(ev) {
            if (ev.target.innerText) this.$emit("input", ev.target.innerText);
            else {
                this.$emit("input", this.title);
                ev.target.innerText = this.title;
            }
            this.toggleWrapperFocus();
        },
        toggleWrapperFocus() {
            this.$refs.wrapper.classList.toggle("focus");
        },
    },
};
</script>
