<template>
    <section class="container mx-auto mt-6">
        <div class="md:grid md:grid-cols-3 md:gap-4">
            <AppUpload />
            <AppManageSongs />
        </div>
    </section>
</template>

<script>
import AppManageSongs from '../components/AppManageSongs.vue'
import AppUpload from '../components/AppUpload.vue'
export default {
    name: 'ManageView',
    components: {
        AppUpload,
        AppManageSongs
    }
}
</script>
