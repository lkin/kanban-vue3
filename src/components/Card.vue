<template>
    <div class="list-group-item kanban-card">
        <strong>{{ element.id }}</strong>
        {{element.text}}
    </div>
</template>

<script>
export default {
    name: 'Card',
    props: {
        element: Object
    }
}
</script>

<style>

</style>