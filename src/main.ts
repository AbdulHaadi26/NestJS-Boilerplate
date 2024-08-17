import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Setup Swaggesr

  // const config = new DocumentBuilder()
  //   .setTitle("NestJS Boilerplate API")
  //   .setDescription("NestJS Boilerplate API description")
  //   .setVersion("1.0")
  //   .addTag("NestJS Boilerplate")
  //   .build();

  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup("docs", app, document);

  await app.listen(3000);
}
bootstrap();
