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
            <v-col align="left" class="overline">
              {{ todo.title }}
            </v-col>
            <v-col class="overline">
              {{ moment(todo.timestamp) }}
            </v-col>
          </v-row>
        </v-container>
      </v-list-item-content>
      <v-list-item-icon>
        <v-col justify="center">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                :href="todo.url"
                download
                target="_blank"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-file-download</v-icon>
              </v-btn>
            </template>
            <span>Download</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-on:click="deleteTodo(todo.id)" v-bind="attrs" v-on="on">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
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
  name: "ToDos",
  props: ["todos"],
  methods: {
    moment(timestamp) {
      return moment(timestamp).format("LLL");
    },
    toogleCheckbox(id) {
      this.$emit("done", id);
    },
    deleteTodo(id) {
      this.$emit("delete-todo", id);
    },
  },
};
</script>
