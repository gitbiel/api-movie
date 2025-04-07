import 'dotenv/config';
import { connectToMongoDB } from './database/mongoose-connection.js';
import app from './app.js';

const PORT = process.env.PORT || 3333;

const startServer = async () => {
  try {
    await connectToMongoDB();
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Erro ao conectar no MongoDB:', error);
    process.exit(1);
  }
};

startServer();
