<template class="app">
    <div class="mt-5">
        <div class="row mt-3 kanban">
            <div class="col-md kanban-row" v-for="(row, i) in rows" :key="row.title">
                <div class="p-2 alert alert-primary">
                    <h3>{{row.title}} ({{row.cards.length}})</h3>
                    <draggable 
                        class="list-group" 
                        group="tasks"
                        v-model="row.cards"
                        item-key="row.title"                    
                        @end="onDragEnd"
                        @change="onDragDrop"
                    >
                        <template #item="{element}">
                            <div class="list-group-item kanban-card">
                                <DeleteButton @click="deleteCard(i, element.id)"/>
                                <strong>{{ element.id }}</strong>
                                <textarea class="card-input" ref="cardText" v-model="element.text" @change="changeCard(element)"></textarea>
                            </div>
                        </template>
                    </draggable>
                    
                    <AddTask :i="i" :addNewTask="addNewTask"/>
                </div>
            </div>

        </div> 
    </div>
</template>

<script>
import axios from 'axios'
import { axiosApiInstance } from '../axios'
import draggable from 'vuedraggable'
import AddTask from '@/components/AddTask'
import DeleteButton from '@/components/DeleteButton'
import { useStore } from 'vuex'

export default {
    name: 'KanbanBoard',
    components: {
        draggable,
        AddTask,
        DeleteButton
    },
    data() {
        return {
            rows: [
                {
                    title: 'On-hold',
                    cards: []
                },
                {
                    title: 'In progress',
                    cards: []
                },
                {
                    title: 'Needs rewiev',
                    cards: []
                },
                {
                    title: 'Approved',
                    cards: []
                }
            ]
        }
    },
    mounted() {
        this.fetchData()
    },
    methods: {  
        onDragDrop(changes) {
            //console.log(changes)
        },
        async changeCard(element) {
            //console.log(row, element, element.text)
            try {
                const response = await axios.patch(`cards/${element.id}/`, 
                    {
                        "row": element.row,
                        "seq_num": element.seq_num,
                        "text": element.text,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'JWT ' + sessionStorage.getItem('token')
                        }
                    }
                )

                console.log('responseee ', response)
                // if (response.status === 200) {
                //     //const content = response.data
                //     //this.rows[i].cards.push(content)
                // } else {
                //     return false
                // } 
             
            } catch (error) {
                console.log({error})
            }
        },
        async deleteCard(row, cardId) {
            try {
                const response = await axios.delete(`cards/${cardId}`, 
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'JWT ' + sessionStorage.getItem('token')
                        }
                    }
                )

                if (response.status === 204) {
                    this.rows[row].cards = this.rows[row].cards.filter((item) => item.id !== cardId)
                } else {
                    return false
                }  

            } catch (error) {
                console.log({error})
            }
        },
        async addNewTask(i, newTask) {
            try {
                const response = await axios.post('cards/', 
                    {
                        "row": i.toString(),
                        "text": newTask
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'JWT ' + sessionStorage.getItem('token')
                        }
                    }
                )

                if (response.status === 201) {
                    const content = response.data
                    this.rows[i].cards.push(content)
                } else {
                    return false
                } 

                
            } catch (error) {
                console.log({error})
            }
        },
        onDragEnd() {
            //console.log(this.rows);
        },
        async fetchData() {
            try {
                const response = await axiosApiInstance.get('cards/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'JWT ' + sessionStorage.getItem('token')}
                    }
                )
                if (response.status === 200) {
                    const content = response.data
                    for (let i = 0; i < content.length; i++) {
                        this.rows[parseInt(content[i].row)].cards.push(content[i])    
                    }
                }

            } catch (error) {
                console.log({error})
            }
        }
    },
}
</script>
<style>
.app {
    background: #35383f;
}
.row {
    width: 100vw !important;
}
.kanban-row {
    margin: 10px;
    color: #fff; 
}
.kanban-card {
    min-height: 100px;
    margin-bottom: 10px;
    cursor: pointer;
    /* background: #191a1d;
    color: #fff; */
}
.card-input {
    border: none;
    resize: none;
    width: 100%;
    /* background: #191a1d;
    color: #fff; */
}

h3 {
    font-size: 18px;
    color: #fff;
}

.kanban-row:nth-child(1) .p-2 { background: #ff732b; }
.kanban-row:nth-child(2) .p-2 { background: #0092c2; }
.kanban-row:nth-child(3) .p-2 { background: #f8d232; }
.kanban-row:nth-child(4) .p-2 { background: #00c365; }


</style>