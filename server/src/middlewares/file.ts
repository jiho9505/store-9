import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import { NextFunction, Request, Response } from 'express';

import env from '../../config/env';
import { convertImageUrlStringToArray } from '../utils/review';
import constant from '../utils/constant';

const s3 = new aws.S3({
  accessKeyId: env.aws.accessKeyId,
  secretAccessKey: env.aws.secrectAccessKey,
  region: env.aws.region,
});

const storage = multerS3({
  s3,
  bucket: env.aws.bucket,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: 'public-read',
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(null, `public/${Date.now()}-${file.fieldname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const [_, fileType] = file.mimetype.split('/');
  const availableTypes = ['jpg', 'jpeg', 'png'];
  if (!availableTypes.includes(fileType)) {
    return cb(null, false);
  }
  cb(null, true);
};

const limits = {
  fieldNameSize: 250,
  fieldSize: 5 * 1024 * 1024,
  fileSize: 16777216,
  files: 10,
};

const upload = multer({ storage, fileFilter, limits });

const FileMiddleware = {
  dataUpload: upload.array('images'),
  dataDelete: (req: Request, res: Response, next: NextFunction) => {
    const { review } = res.locals;
    const { images } = convertImageUrlStringToArray(review);
    const keyArray = images.map((image) => ({ Key: image }));

    const params = {
      Bucket: env.aws.bucket,
      Delete: {
        Objects: keyArray,
        Quiet: false,
      },
    };
    s3.deleteObjects(params, (err, data) => {
      if (err) {
        console.error(err);
        res
          .status(constant.STATUS_SERVER_ERROR)
          .json({ ok: false, message: constant.S3_SAVE_ERROR });
        return;
      } else {
        next();
      }
    });
  },
};

export default FileMiddleware;
