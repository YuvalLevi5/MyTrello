<template>
    <div class="popup attachment-popup">
        <div slot="header" class="task-popup-header">
            <h2>Add attachment</h2>
            <button @click="togglePopup" class="btn close">X</button>
        </div>

        <div slot="main">
            <ul>
                <div class="computer">
                    <input @change="addFile" type="file"  id="file" style="display: none">
                    <label for="file">Computer</label>
                </div>
            </ul>

            <form @submit.prevent="readLink" class="link-box">
                <span class="add-attach-title">Attach a link</span>
                <input v-model="url" type="url" class="attach-title-input">
                <button class="add-attach-btn">Attach</button>
            </form>


        </div>

    </div>
</template>
 <script>
 import { uploadImg } from '../service/img-upload.service'

export default {
    name: 'ProjectApp',
    emits: ['attachFile'],

    components: {
    },
    data() {
        return {
            url: null,
            file: {}
        };
    },
    created() {

    },
    methods: {
        async addFile(ev) {
            var file = ev.target.files[0]
            // var fReader = new FileReader()
            // fReader.readAsDataURL(file)
            // fReader.onloadend = (event) => {
            //     this._makeFileObj(event.target.result)
            // }
            const res = await uploadImg(file)
            this._makeFileObj(res.url)
        },
        _makeFileObj(url) {
            console.log(url)
            this.file = { id: this._makeId(), title: 'new file', url }
            this.$emit('attachFile', this.file)
        },
        readLink() {
            const url = this.url
            this._makeFileObj(url)
        },
        _makeId(length = 8) {
            var text = ''
            var possible =
                'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
            for (var i = 0; i < length; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length))
            }
            return text
        },
        togglePopup() {
            this.$emit("toggle-popup", "Attachment");
        }

    },
    computed: {
    },
    unmounted() { },
};
</script>
 <style>
 </style>