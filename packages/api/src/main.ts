import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const PORT = process.env.PORT || 4000;

  app.enableCors();

  await app.listen(PORT).then(() => {
    Logger.verbose(`API SERVER LISTENING ON ${PORT}\nhttp://localhost:${PORT}`);
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
