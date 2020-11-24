
import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

const imagesFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: imagesFolder,
  storage: multer.diskStorage({
    destination: imagesFolder,
    filename(request, file, callbackFunction) {
      const fileHash = crypto.randomBytes(8).toString('hex');
      const filename = `${fileHash}-${file.originalname}`;
      return callbackFunction(null, filename);
    },
  }),
};