<template>
    <div class="col-span-1">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
            <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
                <span class="card-title">Upload</span>
                <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
            </div>
            <div class="p-6">
                <div
                    class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid"
                    :class="{ 'bg-green-400 border-green-400 border-solid': isDragover }"
                    @drag.prevent.stop="onDrag"
                    @dragstart.prevent.stop="onDragStart"
                    @dragend.prevent.stop="onDragEnd"
                    @dragover.prevent.stop="onDragOver"
                    @dragenter.prevent.stop="onDragEnter"
                    @dragleave.prevent.stop="onDragLeave"
                    @drop.prevent.stop="onDrop"
                >
                    <h5>Drop your files here</h5>
                </div>
                <input type="file" multiple @change="onInputChange" />
                <hr class="my-6" />
                <div v-for="upload in uploads" :key="upload.name" class="mb-4">
                    <div class="font-bold text-sm" :class="upload.textClass">
                        <i :class="upload.icon"></i> {{ upload.name }}
                    </div>
                    <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
                        <div
                            class="transition-all progress-bar"
                            :class="upload.variant"
                            :style="{ width: `${upload.currentProgress}%` }"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { firebaseStorage, auth, firebaseCollections } from '@/includes/firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { setDoc, doc } from 'firebase/firestore'

export default {
    name: 'AppUpload',
    data() {
        return {
            isDragover: false,
            uploads: []
        }
    },
    methods: {
        async upload(file) {
            if (file.type !== 'audio/mpeg') {
                return
            }

            const songRef = ref(firebaseStorage, `songs/${file.name}`)
            const task = uploadBytesResumable(songRef, file)
            const uploadIndex =
                this.uploads.push({
                    name: file.name,
                    task,
                    currentProgress: 0,
                    variant: 'bg-blue-400',
                    icon: 'fas fa-spinner fa-spin',
                    textClass: ''
                }) - 1

            task.on(
                'state_changed',
                (snapshot) => {
                    const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    const upload = this.uploads[uploadIndex]
                    upload.currentProgress = percentage
                    console.log(percentage)
                },
                (error) => {
                    console.log(error)
                    const upload = this.uploads[uploadIndex]
                    upload.variant = 'bg-red-400'
                    upload.icon = 'fas fa-times'
                    upload.textClass = 'text-red-400'
                },
                async () => {
                    const upload = this.uploads[uploadIndex]
                    const fileName = task.snapshot.ref.name
                    const song = {
                        uid: auth.currentUser.uid,
                        displayName: auth.currentUser.displayName,
                        originalName: fileName,
                        modifiedName: fileName,
                        genre: '',
                        commentCount: 0
                    }

                    song.url = await getDownloadURL(task.snapshot.ref)
                    const newDocument = await doc(firebaseCollections.songs, fileName)
                    await setDoc(newDocument, song)

                    upload.variant = 'bg-green-400'
                    upload.icon = 'fas fa-check'
                    upload.textClass = 'text-green-400'
                }
            )
        },
        onDrag() {},
        onDragStart() {},
        onDragEnd() {
            this.isDragover = false
        },
        onDragOver() {
            this.isDragover = true
        },
        onDragEnter() {
            this.isDragover = true
        },
        onDragLeave() {
            this.isDragover = false
        },
        async onDrop(event) {
            this.isDragover = false
            const { files } = event.dataTransfer
            await this.handleFiles(files)
        },
        async onInputChange(event) {
            const { files } = event.target
            await this.handleFiles(files)
        },
        async handleFiles(files) {
            const filesArray = [...files]
            for (const file of filesArray) {
                await this.upload(file)
            }
        }
    },
    beforeUnmount() {
        this.uploads.forEach((upload) => {
            upload.cancel()
        })
    }
}
</script>
