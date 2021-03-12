<template>
  <v-list dense>
    <v-list-item class="listItem" v-for="todo in todos" :key="todo.id">
      <v-list-item-action>
        <v-checkbox
          :input-value="todo.done"
          @change="toogleCheckbox(todo.id)"
        />
      </v-list-item-action>
      <v-list-item-content>
        <v-container>
          <v-row>
            <v-col align="left" class="overline text-decoration-line-through">
              {{ todo.title }}
            </v-col>
            <v-col class="overline">
              {{ moment(todo.timestamp) }}
            </v-col>
          </v-row>
        </v-container>
      </v-list-item-content>
      <v-list-item-icon justify="center">
        <v-col justify="center">
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                v-on:click="downloadTodo(todo.id)"
                v-bind="attrs"
                v-on="on"
                >mdi-file-download</v-icon
              >
            </template>
            <span>Download</span>
          </v-tooltip>
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-on:click="deleteTodo(todo.id)" v-bind="attrs" v-on="on"
                >mdi-delete</v-icon
              >
            </template>
            <span>Delete</span>
          </v-tooltip>
        </v-col>
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
import moment from "moment";
export default {
  name: "Done",
  props: ["todos"],
  methods: {
    moment(timestamp) {
      return moment(timestamp).format("LLL");
    },
    toogleCheckbox(id) {
      this.$emit("undone", id);
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
