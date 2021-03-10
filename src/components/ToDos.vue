<template>
  <v-list>
      <v-list-item v-for="(todos, index) in todos" :key="index">
           <v-list-item-action>
              <v-checkbox 
              :input-value="todos.done" 
              :change="toogleCheckbox"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
          <v-list-item-title align="left" v-text="todos.title"></v-list-item-title>
        </v-list-item-content>
         <v-list-item-icon>
          <v-icon v-on:click="deleteTodo(todos.id)">mdi-delete</v-icon>
        </v-list-item-icon>
      </v-list-item>
  </v-list>
</template>

<script>
  export default {
    name: 'ToDos',
    props: ['todos'],
    methods: {
        toogleCheckbox(todo){
            console.log(todo)
        },
    deleteTodo(id) {
      this.$emit('delete-todo', id);
    },
  },
  }
</script>
