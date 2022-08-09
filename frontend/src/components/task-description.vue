<template>
    <section class="task-description">
        <div class="description-header">
            <img class="desc-svg" src="../../src/svgs/description.svg" alt="" />
            <h4 class="desc-title">Description</h4>
        </div>

        <div v-if="description">
            <textarea class="description-textarea-edit" type="text" v-model="description" id="myTextAreaDescription"
                @click="addFocus" placeholder="Add a more detailed description" />
            <div class="description-action flex" v-if="userWantDesc"> 
                <button class="add-description" @click="editDesc">Save</button>
                <button class="cancel-add-description" @click="cancelDesc">Cancel</button>
            </div>
        </div>
        <div v-else>
            <textarea class="description-textarea" type="text" id="myTextAreaDescription" v-model="newDescription"
                @click="addFocus" placeholder="Add a more detailed description" />
            <div class="description-action flex" v-if="userWantDesc">
                <button class="add-description" @click="saveDesc">Save</button>
                <button class="cancel-add-description" @click="cancelDesc">Cancel</button>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        description: String,
    },
    data() {
        return {
            newDescription: '',
            userWantDesc: false
        }
    },
    methods: {
        saveDesc() {
            this.$emit("save-desc", this.newDescription);
            this.cancelDesc()
            // this.userWantDesc = false
        },
        editDesc() {
            const description = this.description
            console.log('description: ' , description)
            this.$emit("save-desc", this.description);
            this.cancelDesc()
            // this.userWantDesc = false
        },
        addFocus() {
            document.getElementById("myTextAreaDescription").classList.add("focus")
            this.userWantDesc = true
        },
        cancelDesc() {
            document.getElementById("myTextAreaDescription").classList.remove("focus")
            this.newDescription = ''
            this.userWantDesc = false
        },
    },
    created() {
        this.userWantDesc = false
    }

}
</script>

<style lang="scss" scoped>
</style>