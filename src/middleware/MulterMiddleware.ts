import multer from 'multer';

const diskStorage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, 'public/uploads/');
  },
  filename(req, file, callback) {
    callback(null, file.originalname);
  },
});

export const upload = multer({ storage: diskStorage });
