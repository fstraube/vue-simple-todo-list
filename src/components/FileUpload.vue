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
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            fab
            color="primary"
            @click="clickUploadBtn"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-file-upload</v-icon>
          </v-btn>
        </template>
        <span>Upload</span>
      </v-tooltip>
    </v-col>
  </v-row>
</template>

<script>
import UploadService from "../services/FileUploadService";

export default {
  name: "FileUpload",
  data: () => ({
    currentFile: null,
  }),
  methods: {
    clickUploadBtn() {
      this.$refs.fileInput.click();
    },
    async onFileChanged(e) {
      this.currentFile = e.target.files[0];
      try {
        const res = await UploadService.upload(this.currentFile);
        this.$emit("upload-success", res.data.message);
        this.currentFile = null;
      } catch (error) {
        this.$vToastify.error(`Error Upload: ${error.message}`);
      }
    },
  },
};
</script>


