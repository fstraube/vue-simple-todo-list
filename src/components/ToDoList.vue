<template>
  <v-container mt-16>
    <v-row>
      <v-col align="center">
        <div class="text-h4">ToDo List</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center">
        <p>
          <v-icon color="green">mdi-check</v-icon>
          Completed Tasks:
          {{
            todos.filter((todo) => {
              return todo.done === true;
            }).length
          }}
        </p>
        <p>
          <v-icon color="primary">mdi-clock</v-icon>
          Pending Tasks:
          {{
            todos.filter((todo) => {
              return todo.done === false;
            }).length
          }}
        </p>
      </v-col>
    </v-row>
    <FileUpload />
    <v-row>
      <v-col align="center">
        <v-text-field
          solo
          clearable
          placeholder="Enter ToDo ..."
          :value="todo"
          v-on:keyup.enter="onEnter"
          v-model.lazy="todo"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row v-if="undoneTodos.length !== 0">
      <v-col align="center" justify="center">
        <ToDos
          :todos="undoneTodos"
          v-on:delete-todo="deleteTodo"
          v-on:done="setToDone"
        />
      </v-col>
    </v-row>
    <v-row v-if="undoneTodos.length !== 0 && doneTodos.length !== 0">
      <v-col>
        <v-divider></v-divider>
      </v-col>
    </v-row>

    <v-row v-if="doneTodos.length !== 0">
      <v-col align="center">
        <Done
          :todos="doneTodos"
          v-on:delete-todo="deleteTodo"
          v-on:undone="setToUndone"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ToDos from "./ToDos";
import Done from "./Done";
import FileUpload from "./FileUpload";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "ToDoList",
  components: {
    FileUpload,
    ToDos,
    Done,
  },

  data: () => ({
    todo: "",
    todos: [],
  }),
  methods: {
    onEnter() {
      if (this.todo !== "") {
        this.todos.push({
          id: uuidv4(),
          title: this.todo,
          done: false,
          timestamp: new Date(),
        });
        this.todo = "";
      }
    },
    setToDone(id) {
      this.todos.filter((todo) => (todo.id === id ? (todo.done = true) : todo));
    },
    setToUndone(id) {
      this.todos.filter((todo) =>
        todo.id === id ? (todo.done = false) : todo
      );
    },
    deleteTodo(id) {
      const updatedTodos = this.todos.filter((todo) => todo.id !== id);
      this.todos = updatedTodos;
    },
  },
  computed: {
    undoneTodos: function () {
      return this.todos.filter((todo) => todo.done === false);
    },
    doneTodos: function () {
      return this.todos.filter((todo) => todo.done === true);
    },
  },
};
</script>
