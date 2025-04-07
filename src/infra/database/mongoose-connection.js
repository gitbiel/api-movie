import mongoose from 'mongoose';

export async function connectToMongoDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/filmes-db';

  try {
    await mongoose.connect(uri);
    console.log('✅ Conectado ao MongoDB com sucesso!');
  } catch (err) {
    console.error('❌ Erro ao conectar ao MongoDB:', err);
    process.exit(1);
  }
}
