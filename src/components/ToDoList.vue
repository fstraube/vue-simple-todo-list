<template>
  <v-container mt-16>
    <v-row>
      <v-col align="center">
        <div class="text-h4">Simple ToDo List</div>
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
import UploadService from "../services/FileUploadService";

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
  created() {
    this.getUploadedFiles();
  },
  methods: {
    async getUploadedFiles() {
      try {
        const response = await UploadService.getListFileData();
        if (response.data.length !== 0) {
          response.data.map((todo) =>
            todo.id === "" ? (todo.id = uuidv4()) : todo.id
          );
          response.data.map((todo) =>
            todo.timestamp === ""
              ? (todo.timestamp = new Date())
              : todo.timestamp
          );
          response.data.map((todo) => this.todos.push(todo));
        }
      } catch (error) {
        console.log(error);
      }
    },
    async onEnter() {
      if (this.todo === "") return;
      const createdToDo = {
        id: uuidv4(),
        title: this.todo,
        done: false,
        timestamp: new Date(),
      };
      await UploadService.saveFile(createdToDo);
      location.reload();
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
