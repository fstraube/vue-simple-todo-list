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
    <FileUpload v-on:upload-success="uploadSuccess" />
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

<style scoped>
.listItem:hover {
  background: lightblue;
}
</style>

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
    this.getFileData();
  },
  methods: {
    uploadSuccess(msg) {
      this.updateToDoList(msg);
    },
    async getFileData() {
      try {
        const res = await UploadService.getListFileData();
        if (res.data.length !== 0) {
          this.updateToDoList("");
        }
      } catch (error) {
        this.$vToastify.error(`Error file data: ${error.message}`);
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
      createdToDo.url = `http://localhost:8081/download/${createdToDo.title}_${createdToDo.id}.txt`;
      this.saveTodo(createdToDo);
      this.todo = "";
    },
    async saveTodo(updatedTodo) {
      try {
        const res = await UploadService.saveFile(updatedTodo);
        this.updateToDoList(res.data.message);
      } catch (error) {
        this.$vToastify.error(`Error save data: ${error.message}`);
      }
    },
    async updateToDoList(msg) {
      try {
        const res = await UploadService.getListFileData();
        this.todos = [];
        if (res.data.length !== 0) {
          res.data.map((todo) => this.todos.push(todo));
        }
        msg !== "" ? this.$vToastify.success(msg) : null;
      } catch (error) {
        this.$vToastify.error(`Error update data: ${error.message}`);
      }
    },
    setToDone(id) {
      const currentTodo = this.todos.filter((todo) => todo.id === id);
      const updatedTodo = { ...currentTodo[0], done: true };
      this.saveTodo(updatedTodo);
    },
    setToUndone(id) {
      const currentTodo = this.todos.filter((todo) => todo.id === id);
      const updatedTodo = { ...currentTodo[0], done: false };
      this.saveTodo(updatedTodo);
    },
    async deleteTodo(id) {
      const deleteTodo = this.todos.filter((todo) => todo.id === id);
      try {
        const res = await UploadService.deleteFile(deleteTodo[0]);
        this.updateToDoList(res.data.message);
      } catch (error) {
        this.$vToastify.error(`Error delete file: ${error.message}`);
      }
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
