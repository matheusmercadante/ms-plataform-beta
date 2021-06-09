import { Connection, Channel, connect } from 'amqplib';

import MessageBrokerProvider from '../models/IMessageBrokerProvider';

class RabbitMQProvider implements MessageBrokerProvider {
  // Melhorar abstração para não ficar dando start na connection toda hora
  private conn: Connection;

  private channel: Channel;

  public async start(uri: string): Promise<void> {
    this.conn = await connect(uri);
    this.channel = await this.conn.createChannel();
  }

  public async publishInQueue(
    queue: string,
    message: string,
  ): Promise<boolean> {
    return this.channel.sendToQueue(queue, Buffer.from(message));
  }

  public async publishInExchange(
    exchange: string,
    routingKey: string,
    message: string,
  ): Promise<boolean> {
    return this.channel.publish(exchange, routingKey, Buffer.from(message));
  }
}

export default RabbitMQProvider;
