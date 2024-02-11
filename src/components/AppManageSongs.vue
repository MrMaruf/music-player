<template>
    <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
            <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
                <span class="card-title">My Songs</span>
                <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
            </div>
            <div class="p-6">
                <div
                    class="border border-gray-200 p-3 mb-4 rounded"
                    v-for="song in songs"
                    :key="song.id"
                >
                    <div>
                        <h4 class="inline-block text-2xl font-bold">{{ song.modifiedName }}</h4>
                        <button
                            class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
                            @click.prevent.stop="onRemoveSong(song)"
                        >
                            <i class="fa fa-times"></i>
                        </button>
                        <button
                            class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
                            @click.prevent.stop="song.isCurrentlyEditing = !song.isCurrentlyEditing"
                        >
                            <i class="fa fa-pencil-alt"></i>
                        </button>
                    </div>
                    <div
                        :class="{ 'opacity-0 hidden': !song.isCurrentlyEditing }"
                        class="transition-opacity"
                    >
                        <form class="flex flex-col">
                            <div class="mb-3 h-fit">
                                <label class="inline-block mb-2">Title</label>
                                <input
                                    type="text"
                                    class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                                    placeholder="Enter Song Title"
                                    v-model="song.newModifiedName"
                                />
                            </div>
                            <div class="mb-3">
                                <label class="inline-block mb-2">Genre</label>
                                <input
                                    type="text"
                                    class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                                    placeholder="Enter Genre"
                                    v-model="song.newGenre"
                                />
                            </div>
                            <div>
                                <button
                                    type="button"
                                    class="py-1.5 px-3 rounded text-white bg-green-600 mr-2"
                                    @click.prevent.stop="onSaveChanges(song)"
                                    :class="{ 'opacity-35': !song.isCurrentlyEditing || isSaving }"
                                    :disabled="!song.isCurrentlyEditing || isSaving"
                                >
                                    Save changes
                                </button>
                                <button
                                    type="button"
                                    class="py-1.5 px-3 rounded text-white bg-gray-600"
                                    @click.prevent.stop="onGoBack(song)"
                                    :class="{ 'opacity-35': !song.isCurrentlyEditing || isSaving }"
                                    :disabled="!song.isCurrentlyEditing || isSaving"
                                >
                                    Go Back
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { firebaseStorage, auth, firebaseCollections } from '@/includes/firebase'
import { ref, deleteObject } from 'firebase/storage'
import { updateDoc, doc, getDocs, where, query, deleteDoc } from 'firebase/firestore'

export default {
    name: 'AppManageSongs',
    data() {
        return {
            songs: [],
            isSaving: false
        }
    },
    methods: {
        async onRemoveSong(songToDelete) {
            const reply = confirm(
                `Are you sure you want to delete this song: ${songToDelete.modifiedName}?`
            )
            if (reply) {
                const songRef = ref(firebaseStorage, `songs/${songToDelete.originalName}`)
                await deleteObject(songRef)

                const doc = doc(firebaseCollections.songs, songToDelete.originalName)
                await deleteDoc(doc)
                
                const deletedSongIndex = this.songs.findIndex(
                    (song) => song.originalName === songToDelete.originalName
                )
                this.songs = [...this.songs.splice(deletedSongIndex, 1)];
                
            }
        },
        async onSaveChanges(song) {
            this.isSaving = true
            const { newGenre, newModifiedName, isCurrentlyEditing, ...songObjectToSave } = song
            if (!isCurrentlyEditing) {
                console.warn('This song is not being edited. Triggered save might be an error')
                return
            }
            const document = await doc(firebaseCollections.songs, song.originalName)
            song.genre = newGenre
            song.modifiedName = newModifiedName
            await updateDoc(document, songObjectToSave)
            this.isSaving = false
        },
        onGoBack(song) {
            console.log('go back')
            song.newGenre = song.genre
            song.newModifiedName = song.modifiedName
            song.isCurrentlyEditing = false
        }
    },
    async beforeMount() {
        const songsCollection = firebaseCollections.songs
        const getUserSongsQuery = query(songsCollection, where('uid', '==', auth.currentUser.uid))
        const querySnapshot = await getDocs(getUserSongsQuery)
        const songs = []
        querySnapshot.forEach((doc) => {
            const data = doc.data()
            songs.push({
                ...data,
                id: doc.id,
                isCurrentlyEditing: false,
                newModifiedName: data.modifiedName,
                newGenre: data.genre
            })
        })
        console.log(songs)
        this.songs = [...songs]
    }
}
</script>

<style></style>
