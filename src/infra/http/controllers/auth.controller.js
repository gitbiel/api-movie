import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserModel } from '../../database/mongoose/schemas/user.schema.js';

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      { sub: user._id.toString(), email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({ token });
  } catch (err) {
    console.error('Erro ao fazer login:', err);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
}
