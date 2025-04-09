import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { connectToMongoDB } from '../infra/database/mongoose-connection.js';
import { UserModel } from '../infra/database/mongoose/schemas/user.schema.js';

async function createAdminUser() {
  await connectToMongoDB();

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    console.log('⚠️  Usuário admin já existe.');
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new UserModel({
    email,
    password: hashedPassword,
  });

  await user.save();
  console.log('✅ Usuário admin criado com sucesso!');
  process.exit(0);
}

createAdminUser();
