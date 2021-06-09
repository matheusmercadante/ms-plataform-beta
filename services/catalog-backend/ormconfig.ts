export default {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'malicious_school_catalog',
  entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],
  subscribers: ['./src/modules/**/infra/typeorm/subscribers/*.ts'],
  migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
  cli: {
    migrationsDir: './src/shared/infra/typeorm/migrations/',
  },
};
