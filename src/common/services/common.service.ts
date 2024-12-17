import { AppConfigService } from '@common/config/api/config.service';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import * as moment from 'moment';
import { GeneralParameterRepository } from 'src/models/general_parameter/general_parameter.repository';
import { path as appRoot } from 'app-root-path';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import * as bcript from 'bcrypt';
import * as Joi from 'joi';
import * as fs from 'fs';
import { Upload } from '@aws-sdk/lib-storage';
import {
  GetObjectCommand,
  PutObjectCommandInput,
  S3,
} from '@aws-sdk/client-s3';

let cryptoSecret = process.env.CRYPTO_SECRET;
const IV_LENGTH = 16; // For AES, this is always 16
let generalParameterData = {};
let timeUpdated = 0;
let iv = Buffer.from(cryptoSecret).toString('hex').slice(0, 16);

@Injectable()
export class CommonService {
  private s3Client: S3;

  constructor(private readonly appConfig: AppConfigService) {
    this.s3Client = new S3({
      region: this.appConfig.AWS_BUCKET_REGION,
      endpoint: this.appConfig.AWS_BUCKET_URL,
      credentials: {
        accessKeyId: this.appConfig.AWS_ACCESS_KEY,
        secretAccessKey: this.appConfig.AWS_SECRET_ACCESS_KEY,
      },
      forcePathStyle: true,
    });
  }

  @InjectRepository(GeneralParameterRepository)
  private generalParameterRepository: GeneralParameterRepository;

  public changePhone(hp: string, convertTo: string): string {
    const phone = hp.replace(/\D/g, '');
    if (phone.length < 6 || phone.length >= 15) {
      return '';
    }

    if (convertTo == '62') {
      if (phone.substring(0, 2) == '62') {
        return phone;
      } else if (phone.substring(0, 2) == '08') {
        return `62${phone.substring(1)}`;
      }
    }

    if (convertTo == '08') {
      if (phone.substring(0, 2) == '08') {
        return phone;
      } else if (phone.substring(0, 2) == '62') {
        return `0${phone.substring(2)}`;
      } else {
        return '';
      }
    }

    return phone;
  }

  async bcriptSign(password) {
    const bcriptSecret = bcript.genSaltSync(10);
    return bcript.hashSync(password, bcriptSecret);
  }

  async bcriptCompare(plainPass, hashPass) {
    return bcript.compareSync(plainPass, hashPass);
  }

  exceptionTrhow(statusCode: number, message: string) {
    throw new HttpException(
      {
        statusCode: statusCode,
        message,
      },
      statusCode,
    );
  }

  validateEmail(email: string): boolean {
    let result = true;
    const schema = Joi.string().email().empty();
    const validate = schema.validate(email);
    result = validate.error ? false : true;
    return result;
  }

  capitalizeFirstLetter(text: string) {
    return text?.charAt(0)?.toUpperCase() + text?.slice(1);
  }

  public async randString(
    length: number,
    chars: string,
    frontText: string,
  ): Promise<string> {
    var result = `${frontText}`;
    const rand = (char: string) => {
      let result = ``;
      for (var i = char.length + frontText.length; i > 0; --i)
        result += chars[Math.floor(Math.random() * chars.length)];
      return result;
    };
    const afterRand: string = frontText + (await rand(chars));
    for (var i = length - frontText.length; i > 0; --i)
      result += afterRand[Math.floor(Math.random() * afterRand.length)];
    return result;
  }

  public async cryptoEncrypt(text: any) {
    const cipher = crypto.createCipheriv(
      'aes-256-cbc',
      this.appConfig.CRYPTO_SECRET,
      iv,
    );
    var encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
    return encrypted;
  }

  public async cryptoDecrypt(text: string) {
    var decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      this.appConfig.CRYPTO_SECRET,
      iv,
    );
    var decrypted =
      decipher.update(text, 'hex', 'utf8') + decipher.final('utf8');
    return decrypted;
  }

  async generalParameter(): Promise<any> {
    const currentTime = moment().startOf('days').unix();
    if (timeUpdated !== currentTime) {
      const generalParameters = await this.generalParameterRepository.find({
        where: { status: 1 },
      });
      for (let index = 0; index < generalParameters.length; index++) {
        const generalParameter = generalParameters[index];
        generalParameterData[generalParameter.name] = generalParameter.value;
      }
    }
    return generalParameterData;
  }

  public pagination = (page: number, row: number, totalRow: number) => {
    const dataPerPage = row;
    const totalPage = Math.ceil(totalRow / dataPerPage);
    const currentPage = page;
    const firstData = dataPerPage * currentPage;

    return {
      query: ` OFFSET ${firstData} LIMIT ${dataPerPage}`,
      dataPerPage: dataPerPage,
      totalPage: totalPage,
      currentPage: currentPage,
      totalData: totalRow,
    };
  };

  async base64ToFile(
    imageBase64: string,
    folderPath: string,
    filename: string,
  ) {
    const basePath = `${appRoot}/../public`;
    if (!existsSync(`${basePath}${folderPath}`)) {
      mkdirSync(`${basePath}${folderPath}`, { recursive: true });
    }
    const fullPath = `${basePath}${folderPath}/${filename}`;
    writeFileSync(fullPath, imageBase64, 'base64');
    return `${this.appConfig.BASE_URL}${folderPath}/${filename}`;
  }

  public async uploadToS3(filePath: string, filename: string) {
    try {
      const fileContent = fs.readFileSync(filePath);

      const params: PutObjectCommandInput = {
        Bucket: this.appConfig.AWS_BUCKET_NAME,
        Key: filename,
        Body: fileContent,
        ContentType: 'image/jpeg',
      };

      const upload = new Upload({
        client: this.s3Client,
        params,
      });

      await upload.done();

      return;
    } catch (error) {
      throw new Error('Error uploading photo to S3: ' + error.message);
    }
  }

  public async getImageS3(filename: string, filepath: string) {
    const getData = await this.s3Client.send(
      new GetObjectCommand({
        Bucket: this.appConfig.AWS_BUCKET_NAME,
        Key: filename,
      }),
    );

    const getImage = (await getData?.Body?.transformToString(
      'base64',
    )) as string;
    const getBuffer = Buffer.from(getImage, 'base64');
    fs.writeFileSync(filepath, getBuffer);

    return getBuffer;
  }
}
