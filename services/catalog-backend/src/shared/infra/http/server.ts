import RabbitmqServer from '../amqp/server';
import app from './app';

const port = 4444;

const consume = async () => {
  const server = new RabbitmqServer('amqp://guest:guest@localhost:5672');
  await server.start();
};

consume();

app.listen({ port }, () =>
  console.info('❤ server this my love online...', `http://localhost:${port}/`),
);
