<template>
    <div class="popup popup-cover">
        <div slot="header" class="task-popup-header">
            <h2>Cover</h2>
            <img class="close-svg" @click="togglePopup" src="../../src/svgs/close_FILL0_wght400_GRAD0_opsz48.svg"
                alt="" />
        </div>
        <div>
            <div class="size-section">
                <label>
                    Size
                    <div v-if="getCoverImg || task.style?.bgColor" class="size-container">
                        <button @click="setCoverSize(true)" :class="{ active: this.task.style.isCover }">
                            <img v-if="getCoverImg" class="full" :src="getCoverImg" />
                            <div v-else class="color full" :style="{ background: task.style.bgColor }" />
                            <div class="over" v-if="getCoverImg" />
                            <!-- <div class="demmy title" :style="darkStyle" />
                            <div class="demmy text" :style="darkStyle" /> -->
                        </button>
                        <button @click="setCoverSize(false)" :class="{ active: !this.task.style.isCover }">
                            <img v-if="getCoverImg" class="split" :src="getCoverImg" />
                            <div v-else class="color split" :style="{ background: task.style.bgColor }" />
                            <div class="demmy title" />
                            <div class="demmy text" />
                        </button>
                    </div>
                </label>
            </div>
            <button @click="removeCover" class="remove-cover-btn">remove cover</button>
            <div>
                <span>Colors</span>
                <div class="colors">
                    <button @click="setCoverColor(color)" :style="{ backgroundColor: color }" class="color"
                        v-for="color in colors" :key="color"></button>
                </div>
            </div>
            <div class="attachments">
                <header>Attachments</header>
                <div v-if="task.attachments" class="attachments-images">
                    <button @click="setCoverImg(attachment.url)" v-for="attachment in task.attachments"
                        :key="attachment.id" class="set-attachment-cover"
                        :style="{ backgroundImage: 'url(' + attachment.url + ')' }"></button>
                </div>

                <div class="upload">
                    <label class="remove-cover-btn" for="file">Upload a cover image</label>
                    <input @change="addFile" type="file" id="file" style="display: none" />
                </div>
            </div>
            <div>
                <header>Photos from unsplash</header>
                <div class="unsplash">
                    <img @click="setCoverImg(image)" v-for="(image, idx) in coverImgsUrls" :key="idx" :src="image" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Covermenu',
    props: {
        task: Object,
    },
    components: {
    },
    data() {
        return {
            file: {},
            colors: [
                '#7BC86C',
                '#F5DD29',
                '#FFAF3F',
                '#EF7564',
                '#CD8DE5',
                '#5BA4CF',
                '#29CCE5',
                '#6DECA9',
                '#FF8ED4',
                '#172B4D',
            ],
            coverImgsUrls: [
                'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1275&q=80',
                'https://images.unsplash.com/photo-1561912847-95100ed8646c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                'https://images.unsplash.com/photo-1577009683331-950dd313c8d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                'https://images.unsplash.com/photo-1495236698374-12a308600d13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1293&q=80',
                'https://images.unsplash.com/photo-1618897996318-5a901fa6ca71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80',
                'https://images.unsplash.com/photo-1513171920216-2640b288471b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80'
            ],
        }
    },

    methods: {
        setCoverColor(color) {
            if (!this.task.style) this.task.style = { bgImg: '', bgColor: '', isCover: false, isShadow: true }
            this.task.style.bgImg = ''
            this.task.style.bgColor = color
            this.task.style.isCover = true

            this.$emit('setCoverColor', this.task)
        },
        setCoverImg(url) {
            if (!this.task.style) this.task.style = { bgImg: '', bgColor: '', isCover: false, isShadow: true }
            this.task.style.bgColor = null
            this.task.style.bgImg = url
            this.task.style.isCover = true

            this.$emit('setCoverImg', this.task)
        },
        removeCover() {
            this.task.style = null
            this.$emit('removeCover', this.task)
        },
        addFile(ev) {
            var file = ev.target.files[0]
            var fReader = new FileReader()
            fReader.readAsDataURL(file)
            fReader.onloadend = (event) => {
                this._makeFileObj(event.target.result)
            }
        },
        _makeFileObj(url) {
            this.file = { id: this._makeId(), title: 'new file', url }
            this.$emit('attachFile', this.file)
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
            this.$emit("toggle-popup", "Cover");
        },
        setCoverSize(isFull) {
            console.log(isFull)
            this.task.style.isCover = isFull;
            this.$emit('setCoverImg', this.task)
            // this.setCover();
        },
    },
    computed: {
        getCoverImg() {
            if (!this.task.style) return null
            const img = this.task.style.bgImg;
            if (!img) return null;
            return img
        },
    },
    created() { },
}
</script>
