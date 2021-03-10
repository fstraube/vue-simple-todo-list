<template>
  <v-container mt-16>
    <v-row>
      <v-col align="center">
        <div class="text-h4">
        ToDoList
    </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center">
        <p>Completed Tasks: {{todos.filter(todo => {return todo.done === true}).length}}</p>
    <p>Pending Tasks: {{todos.filter(todo => {return todo.done === false}).length}}</p>
        </v-col>
    </v-row>
    <v-row>
      <v-col align="center">
       <v-text-field 
       solo 
       clearable 
       :value="todo" 
       v-on:keyup.enter="onEnter"
       v-model.lazy="todo"
       ></v-text-field>
      </v-col>
    </v-row>
     <v-row>
      <v-col align="center" justify="center">
        <ToDos :todos="todos" v-on:delete-todo="deleteTodo" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
            <v-divider></v-divider>
      </v-col>
    </v-row>

     <v-row>
      <v-col align="center">
        <Done :todos="todos" v-on:delete-todo="deleteTodo"/>
      </v-col>
    </v-row>
    </v-container>
</template>

<script>
import ToDos from './ToDos';
import Done from './Done';
import { v4 as uuidv4 } from 'uuid';

  export default {
    name: 'ToDoList',
    components: {
      ToDos,
      Done,
  },

    data: () => ({ 
        todo: '',
        todos: [],
 
}),
methods: {
    onEnter() {
      this.todos.push({
        id: uuidv4(),
        title: this.todo, 
      done:false,
      timestamp: new Date()
      });
      this.todo= '';
    },
    deleteTodo(id) {
      const newTodos = this.todos.filter(todo => todo.id !== id);
      this.todos = newTodos;
    },
  },
}
</script>
