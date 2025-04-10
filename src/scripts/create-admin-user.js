import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { connectToMongoDB } from '../infra/database/mongoose-connection.js';
import { UserModel } from '../infra/database/mongoose/schemas/user.schema.js';

async function createAdminUser() {
  await connectToMongoDB();

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  const existingUser = await UserModel.findOne({ email });

  const hashedPassword = await bcrypt.hash(password, 10);

  if (existingUser) {
    existingUser.password = hashedPassword;
    await existingUser.save();
    console.log('Admin existente — senha atualizada.');
  } else {
    const user = new UserModel({
      email,
      password: hashedPassword,
    });

    await user.save();
    console.log('✅ Usuário admin criado com sucesso!');
  }

  process.exit(0);
}

createAdminUser();
