import { RedisOptions } from 'ioredis';

interface CacheConfig {
  driver: 'redis';

  config: {
    redis: RedisOptions;
  };
}

export default {
  driver: 'redis',

  config: {
    redis: {
      host: process.env.REDI_HOST,
      port: process.env.REDI_PORT,
      password: process.env.REDI_PASS || undefined,
    },
  },
} as CacheConfig;
