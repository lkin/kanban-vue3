<template>
  <h3 v-if="!auth">You are not logged in</h3>
  <KanbanBoard v-if="auth"/>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

import KanbanBoard from '../components/KanbanBoard'

export default {
    name: "Home",
    setup() {
        const store = useStore();
        const auth = computed(() => store.state.authenticated)

        return {
            auth
        }
    },
    components: {KanbanBoard}
}
</script>

<style>

</style>