import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get ENV(): string {
    return this.configService.get<string>('app.ENV');
  }
  get PORT(): string {
    return this.configService.get<string>('app.PORT');
  }
  get VERSION(): string {
    return this.configService.get<string>('app.VERSION');
  }
  get NAME_PROGRAM(): string {
    return this.configService.get<string>('app.NAME_PROGRAM');
  }
  get CRYPTO_SECRET(): string {
    return this.configService.get<string>('app.CRYPTO_SECRET');
  }
  get WA_UNOFFICIAL_API(): string {
    return this.configService.get<string>('app.WA_UNOFFICIAL_API');
  }
  get WA_OFFICIAL_API(): string {
    return this.configService.get<string>('app.WA_OFFICIAL_API');
  }
  get WA_OFFICIAL_USER(): string {
    return this.configService.get<string>('app.WA_OFFICIAL_USER');
  }
  get WA_OFFICIAL_PASS(): string {
    return this.configService.get<string>('app.WA_OFFICIAL_PASS');
  }
  get WA_OFFICIAL_SENDERID(): string {
    return this.configService.get<string>('app.WA_OFFICIAL_SENDERID');
  }
  get CORE_API(): string {
    return this.configService.get<string>('app.CORE_API');
  }
  get TOKEN_FIREBASE(): string {
    return this.configService.get<string>('app.TOKEN_FIREBASE');
  }
  get TOKEN_FIREBASE_WEB(): string {
    return this.configService.get<string>('app.TOKEN_FIREBASE_WEB');
  }
  get BASE_URL(): string {
    return this.configService.get<string>('app.BASE_URL');
  }
  get RELEASE_DATE(): string {
    return this.configService.get<string>('app.RELEASE_DATE');
  }
  get BCRIPT_SECRET(): string {
    return this.configService.get<string>('app.BCRIPT_SECRET');
  }
  get MAIL_USER(): string {
    return this.configService.get<string>('app.MAIL_USER');
  }
  get MAIL_PASS(): string {
    return this.configService.get<string>('app.MAIL_PASS');
  }

  // ======================= AWS S3 ======================= //
  get AWS_BUCKET_NAME(): string {
    return this.configService.get<string>('app.AWS_BUCKET_NAME');
  }

  get AWS_BUCKET_REGION(): string {
    return this.configService.get<string>('app.AWS_BUCKET_REGION');
  }

  get AWS_BUCKET_URL(): string {
    return this.configService.get<string>('app.AWS_BUCKET_URL');
  }

  get AWS_ACCESS_KEY(): string {
    return this.configService.get<string>('app.AWS_ACCESS_KEY');
  }

  get AWS_SECRET_ACCESS_KEY(): string {
    return this.configService.get<string>('app.AWS_SECRET_ACCESS_KEY');
  }
}
