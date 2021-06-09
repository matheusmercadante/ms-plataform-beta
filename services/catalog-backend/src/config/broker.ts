interface BrokerConfig {
  broker: 'rabbitmq';
}

export default {
  broker: process.env.BROKER_DRIVER,
} as BrokerConfig;
