const amqp = require('amqplib');

async function connectRabbitMQ() {
  const url = process.env.RABBITMQ_URL || 'amqp://admin:admin123@localhost:5672';
  const connection = await amqp.connect(url);
  const channel = await connection.createChannel();
  return { connection, channel };
}

// Kuyruğa mesaj gönderme
async function sendMessage(queue, message) {
  const { channel, connection } = await connectRabbitMQ();
  await channel.assertQueue(queue);
  channel.sendToQueue(queue, Buffer.from(message));
  console.log('Mesaj gönderildi:', message);
  await channel.close();
  await connection.close();
}

// Kuyruktan mesaj alma
async function receiveMessage(queue, onMessage) {
  const { channel } = await connectRabbitMQ();
  await channel.assertQueue(queue);
  channel.consume(queue, msg => {
    if (msg !== null) {
      onMessage(msg.content.toString());
      channel.ack(msg);
    }
  });
}

module.exports = {
  connectRabbitMQ,
  sendMessage,
  receiveMessage
}; 