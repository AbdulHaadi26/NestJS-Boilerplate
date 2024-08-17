import { ProviderNames } from "src/shared/constants";
import { DataSource, EntitySchema } from "typeorm";

export const getRepository = (name: ProviderNames, repo: EntitySchema) => {
  return {
    provide: name,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(repo),
    inject: [DataSource],
  };
};
