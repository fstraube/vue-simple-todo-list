<template>
  <v-list>
    <v-list-item class="listItem" v-for="todo in todos" :key="todo.id">
      <v-list-item-action>
        <v-checkbox
          :input-value="todo.done"
          @change="toogleCheckbox(todo.id)"
        ></v-checkbox>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title align="left" v-text="todo.title">
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-icon>
        <v-icon v-on:click="downloadTodo(todo.id)">mdi-file-download</v-icon>
        <span></span>
        <v-icon v-on:click="deleteTodo(todo.id)">mdi-delete</v-icon>
      </v-list-item-icon>
    </v-list-item>
  </v-list>
</template>

<style scoped>
.listItem:hover {
  background: lightblue;
}
</style>

<script>
export default {
  name: "ToDos",
  props: ["todos"],
  methods: {
    toogleCheckbox(id) {
      this.$emit("done", id);
    },
    deleteTodo(id) {
      this.$emit("delete-todo", id);
    },
    downloadTodo(id) {
      this.$emit("download-todo", id);
    },
  },
};
</script>
