import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + '../../../public/images');
  },
  filename: (req, file, cb) => {
    const [_, fileType] = file.mimetype.split('/');
    cb(null, `${Date.now()}-${file.fieldname}.${fileType}`);
  },
});
const limits = {
  fieldNameSize: 250,
  fieldSize: 5 * 1024 * 1024,
  fileSize: 16777216,
  files: 10,
};
const fileFilter = (req, file, cb) => {
  const [_, fileType] = file.mimetype.split('/');
  const availableTypes = ['jpg', 'jpeg', 'png'];
  if (!availableTypes.includes(fileType)) {
    return cb(null, false);
  }
  cb(null, true);
};
const upload = multer({
  storage,
  limits,
  fileFilter,
});

const FileMiddleware = {
  dataUpload: upload.array('images'),
};

export default FileMiddleware;
