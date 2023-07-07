import * as multer from 'multer';

import * as path from 'path';

import * as fs from 'fs';

import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

//폴더 만듬
const createFolder = (folder: string) => {
  try {
    console.log('💾 Create a root uploads folder...');

    fs.mkdirSync(path.join(__dirname, '..', `uploads`)); //  현재폴더 부모폴더에 upload파일 생성
  } catch (error) {
    console.log('The folder already exists...');
  }

  try {
    console.log(`💾 Create a ${folder} uploads folder...`);

    fs.mkdirSync(path.join(__dirname, '..', `uploads/${folder}`)); // 현재폴더 부모폴더의 upload 파일밑에 폴더 생성
  } catch (error) {
    console.log(`The ${folder} folder already exists...`);
  }
};

//폴더 만들고 폴더에 파일 저장
const storage = (folder: string): multer.StorageEngine => {
  createFolder(folder);

  return multer.diskStorage({
    destination(req, file, cb) {
      //* 어디에 저장할 지

      const folderName = path.join(__dirname, '..', `uploads/${folder}`);

      cb(null, folderName);
    },

    filename(req, file, cb) {
      //* 어떤 이름으로 올릴 지

      const ext = path.extname(file.originalname); //파일 속성 추출  .html  .exe .jpg .png

      const fileName = `${path.basename(
        file.originalname,

        ext,
      )}${Date.now()}${ext}`;

      cb(null, fileName);
    },
  });
};

//upload 폴더 밑에 저장할 folder 이름 , 파일의 저장할 위치 저장할 이름에 대한 설정을 만드는 반환하는 함수
//FileInterceptor('file') 의 Option 인자에 반환받은 값 넣어준다.
export const multerOptions = (folder: string) => {
  const result: MulterOptions = {
    storage: storage(folder),
  };

  return result;
};
