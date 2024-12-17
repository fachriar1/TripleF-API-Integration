import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import * as express from 'express';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import * as winstonRotate from 'winston-daily-rotate-file';
import transports from '@common/logging/transports.log';
import { AllExceptionsFilter } from '@common/filter/exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
winstonRotate;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('app.PORT');
  const appName = configService.get('app.NAME_PROGRAM');

  app.enableCors();
  app.use(helmet());
  app.use(express.json({ limit: '50mb' }));
  app.use(
    expressWinston.logger({
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'DD-MM-YYYY HH:mm:ss',
        }),
        winston.format.json(),
      ),
      meta: true,
      responseWhitelist: [...expressWinston.responseWhitelist, 'body'],
      requestWhitelist: [
        'body',
        'query',
        'params',
        'method',
        'originalUrl',
        'headers.x-forwarded-for',
        'connection.remoteAddress',
      ],
      transports:
        process.env.NODE_ENV == 'development'
          ? [transports.console]
          : [transports.combine],
    }),
  );

  // swagger config
  const swaggerConfig = new DocumentBuilder()
    .addSecurity('auth', {
      name: 'authentication',
      type: 'apiKey',
      in: 'header',
    })
    .setTitle(`${appName} Validation API`)
    .setVersion('1.0')
    .addTag(`${appName}`)
    .setContact(appName, 'https://redboxdigital.id/', 'redbox@missiidea.com')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(`api/docs`, app, document);

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));
  await app.listen(port).then(() => {
    console.log('RUNNING ON PORT ', port);
  });
}
bootstrap();
