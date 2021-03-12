import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:8081',
  headers: {
    'Content-type': 'application/json',
  },
});

const upload = (file, onUploadProgress) => {
  let formData = new FormData();
  formData.append('file', file);
  return http.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress,
  });
};

const getListFileData = () => {
  return http.get('/listFileData');
};

const saveFile = (data) => {
  return http.post('/saveFile', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const deleteFile = (data) => {
  return http.post('/deleteFile', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export default {
  upload,
  saveFile,
  deleteFile,
  getListFileData,
};
