<template>
  <v-row>
    <v-col>
      <input id="upload-file" type="file" @change="(e) => onFileChanged(e)" />
      <label htmlFor="upload-file">
        <v-icon>mid-upload</v-icon>
      </label>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "FileUpload",
  data: () => ({
    currentFile: null,
  }),
  methods: {
    onFileChanged(e) {
      this.currentFile = e.target.files[0];
    },
  },
};
</script>


