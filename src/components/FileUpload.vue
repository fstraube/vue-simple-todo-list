<template>
  <v-row justify="center">
    <v-col align="center" md="3">
      <input
        type="file"
        ref="fileInput"
        style="display: none"
        id="upload-file"
        @change="(e) => onFileChanged(e)"
      />
      <v-btn fab color="primary" @click="clickUploadBtn">
        <v-icon>mdi-file-upload</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import UploadService from "../services/FileUploadService";

export default {
  name: "FileUpload",
  data: () => ({
    currentFile: null,
    progress: 0,
  }),
  methods: {
    clickUploadBtn() {
      this.$refs.fileInput.click();
    },
    onFileChanged(e) {
      this.currentFile = e.target.files[0];
      UploadService.upload(this.currentFile, (event) => {
        this.progress = Math.round((100 * event.loaded) / event.total);
      })
        .then((response) => {
          console.log(response);
          this.currentFile = null;
        })
        .catch((error) => {
          console.error(error.message);
          this.currentFile = null;
        });
    },
  },
};
</script>


