<template>
  <v-list>
      <v-list-item v-for="todo in todos" :key="todo.id">
          <v-list-item-action>
              <v-checkbox 
              :input-value="todo.done"
              @change="toogleCheckbox(todo.id)"></v-checkbox>
            </v-list-item-action>
          <v-list-item-content>
          <v-list-item-title 
          align="left"
          class="text-decoration-line-through" 
          v-text="todo.title">
          </v-list-item-title>
        </v-list-item-content>
         <v-list-item-icon>
          <v-icon v-on:click="deleteTodo(todo.id)">mdi-delete</v-icon>
        </v-list-item-icon>
      </v-list-item>
  </v-list>
</template>

<script>
  export default {
    name: 'Done',
    props: ['todos'],
     methods: {
        toogleCheckbox(id){
            this.$emit('undone', id);
        },
    deleteTodo(id) {
      this.$emit('delete-todo', id);
    },
  },
  }
</script>
