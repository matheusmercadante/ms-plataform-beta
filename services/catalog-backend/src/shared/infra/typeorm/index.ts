import { createConnection, getConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

// eslint-disable-next-line func-names
(async function () {
  const connectionOptions = await getConnectionOptions();

  Object.assign(connectionOptions, {
    namingStrategy: new SnakeNamingStrategy(),
  });

  // create a connection using modified connection options
  await createConnection(connectionOptions);
})();
