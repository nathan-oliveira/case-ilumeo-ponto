import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

import CorsConfig from './cors.config';
import SwaggerConfig from './swagger.config';

import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';

export class AppConfig {
  private app: NestExpressApplication;
  private configService: ConfigService;

  constructor(
    readonly appNest: NestExpressApplication,
    readonly configServiceNest: ConfigService,
  ) {
    this.app = appNest;
    this.configService = configServiceNest;
  }

  mounted() {
    this.enableCors();
    this.setGlobalConfigs();
    this.enableSwagger();
    return this.app;
  }

  private enableCors(): void {
    const config = Reflect.construct(CorsConfig, [this.configService]);
    this.app.enableCors(config.getConfig());
  }

  private setGlobalConfigs(): void {
    this.app.setGlobalPrefix('api');
    this.app.useGlobalFilters(new HttpExceptionFilter());
    this.app.useBodyParser('json', { limit: '100mb' });
    this.app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
  }

  private enableSwagger = () => SwaggerConfig.handler(this.app);
}
