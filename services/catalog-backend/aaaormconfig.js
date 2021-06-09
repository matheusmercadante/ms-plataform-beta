// [
//   {
//     "type": "postgres",
//     "host": "localhost",
//     "port": 5432,
//     "username": "postgres",
//     "password": "postgres",
//     "database": "malicious_school_catalog",
//     "entities": ["./src/modules/**/infra/typeorm/entities/*.ts"],
//     "migrations": ["./src/shared/infra/typeorm/migrations/*.ts"],
//     "cli": {
//       "migrationsDir": "./src/shared/infra/typeorm/migrations/"
//     }
//   }
// ]
// import { createConnection } from 'typeorm';

// async function dbConnection() {
  //   await createConnection({
    //     driver: "postgres",
    //     // type: "postgres",
    //     host: "localhost",
    //     port: 5432,
    //     username: "postgres",
    //     password: "postgres",
    //     database: "malicious_school_catalog",
    //     entities: ["./src/modules/**/infra/typeorm/entities/*.ts"],
    //     migrations: ["./src/modules/**/infra/typeorm/entities/*.ts"],
    //     cli: {
      //       "migrationsDir": "./src/shared/infra/typeorm/migrations/"
      //     },
      //     namingStrategy: new SnakeNamingStrategy(), // Here you'r using the strategy!
      //   });
      // }

// import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export default {
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "postgres",
  "password": "postgres",
  "database": "malicious_school_catalog",
  "entities": ["./src/modules/**/infra/typeorm/entities/*.ts"],
  "migrations": ["./src/modules/**/infra/typeorm/entities/*.ts"],
  "cli": {
    "migrationsDir": "./src/shared/infra/typeorm/migrations/"
  },
  "namingStrategy": new SnakeNamingStrategy(), // Here you'r using the strategy!
}
// import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

// export default {
//   "type": "postgres",
//   "host": "localhost",
//   "port": 5432,
//   "username": "postgres",
//   "password": "postgres",
//   "database": "malicious_school_catalog",
//   "entities": ["./src/modules/**/infra/typeorm/entities/*.ts"],
//   "migrations": ["./src/shared/infra/typeorm/migrations/*.ts"],
//   "cli": {
//     "migrationsDir": "./src/shared/infra/typeorm/migrations/"
//   },
//   "namingStrategy": new SnakeNamingStrategy()
// }
