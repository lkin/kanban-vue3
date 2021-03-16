<template>
    <div class="col-md input-group">
        <input 
            v-model="newTask" 
            class="form-control" 
            placeholder="Enter Task" 
            @keyup.enter="add"
        >
        <button 
            class="btn btn-secondary" 
            @click="add"
        >Add</button>
    </div>
</template>

<script>
export default {
    name: 'AddTask',
    props: {
        i: { type: Number},
        addNewTask: { type: Function },
    },
    data() {
        return {
            newTask: ''
        }
    },
    methods: {
        add() {
            if (this.newTask) {
                this.addNewTask(this.i, this.newTask)
                this.newTask = ''
            }
        }
    }
}
</script>

<style>

</style>