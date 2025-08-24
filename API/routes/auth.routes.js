import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const router = express.Router();

// Registro
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: 'Email y contraseña requeridos' });

    // Validación de contraseña
    const passwordvalidacion = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordvalidacion.test(password)) {
      return res.status(400).json({
        error: 'La contraseña debe tener mínimo 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 caracter especial'
      });
    }

    // Validar si ya existe
    const userExists = await prisma.usuarios.findUnique({ where: { email } });
    if (userExists)
      return res.status(400).json({ error: 'El email ya está registrado' });

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.usuarios.create({
      data: { email, password: hashedPassword },
    });

    res.status(201).json({ message: 'Usuario registrado con éxito', user: { id: user.id, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.usuarios.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: 'Credenciales inválidas' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ error: 'Credenciales inválidas' });

    // Generar token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secreto', {
      expiresIn: '1h',
    });

    res.json({ 
    message: 'Login exitoso', token, rol: user.rol });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

export default router;