interface MessageBrokerProvider {
  start(uri: string): Promise<void>;
  publishInQueue(queue: string, message: string): Promise<boolean>;
  publishInExchange(
    exchange: string,
    routingKey: string,
    message: string,
  ): Promise<boolean>;
}

export default MessageBrokerProvider;
