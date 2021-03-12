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

const getFile = (fileName) => {
  return http.get(`/fileData/${fileName}`);
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

const downloadFile = (data) => {
  const fileName = `${data.title}_${data.id}.txt`;
  return http.get(`/download/${fileName}`);
};

export default {
  upload,
  saveFile,
  deleteFile,
  getFile,
  getListFileData,
  downloadFile,
};
