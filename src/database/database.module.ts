import { DataSource } from "typeorm";
import { Global, Module } from "@nestjs/common";

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: DataSource,
      inject: [],
      useFactory: async () => {
        try {
          const dataSource = new DataSource({
            type: "mysql",
            host: process.env.DB_HOST_NAME,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER_NAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [__dirname + "/../**/*.entity{.ts,.js}"],
            synchronize: true,
          });
          await dataSource.initialize();
          console.log("Database connected successfully");
          return dataSource;
        } catch (error) {
          console.log("Error connecting to database");
          throw error;
        }
      },
    },
  ],
  exports: [DataSource],
})
export class DatabaseModule {}
