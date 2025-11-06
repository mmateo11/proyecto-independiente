import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from "nodemailer";

const prisma = new PrismaClient();
const router = express.Router();

// Configuración del correo
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "proyectoindependiente7@gmail.com",
    pass: "gjcr grob sron igsd" // contraseña de aplicación
  },
});

// Función para enviar mail de bienvenida
async function enviarMailBienvenida(emailDestino, nombre) {
  await transporter.sendMail({
    from: '"Club Independiente 👹" <proyectoindependiente7@gmail.com>',
    to: emailDestino,
    subject: "¡Tu pago fue confirmado! Bienvenido al Club Independiente 👹",
    html: `
      <div style="background-color:#990000; color:#fff; font-family:Arial, sans-serif; padding:30px; text-align:center; border-radius:10px;">
        <h1>¡Hola ${nombre}!</h1>
        <h2>Tu pago fue confirmado ✅</h2>
        <p>¡Ya sos socio del Club de Futbol Independiente 👹!</p>
        <p>Ahora podés disfrutar de todos los beneficios exclusivos ⚽</p>
        <img src="https://upload.wikimedia.org/wikipedia/commons/7/7f/Club_Independiente_logo.svg" width="150">
      </div>
    `,
  });
}

// Registrar socio
router.post('/register', async (req, res) => {
  try {
    const { nombre, fecha_nac, email, password, metodo_pago } = req.body;

    // Validar campos
    if (!nombre || !fecha_nac || !email || !password || !metodo_pago)
      return res.status(400).json({ error: 'Todos los campos son requeridos' });

    // Validar formato de contraseña
    const passwordvalidacion =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordvalidacion.test(password))
      return res.status(400).json({ error: 'Contraseña inválida' });

    // Comprobar si ya existe
    const userExists = await prisma.socios.findUnique({ where: { email } });
    if (userExists)
      return res.status(400).json({ error: 'El email ya está registrado' });

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear socio
    const socio = await prisma.socios.create({
      data: {
        nombre,
        fecha_nac: new Date(fecha_nac),
        email,
        password: hashedPassword,
        metodo_pago
      },
    });

    // Enviar mail de bienvenida (sin bloquear respuesta)
    enviarMailBienvenida(socio.email, socio.nombre).catch(err => console.error("Error mail:", err));

    // Generar token
    const token = jwt.sign(
      { id: socio.id, tipo: 'socio' },
      process.env.JWT_SECRET || 'secreto',
      { expiresIn: '1h' }
    );

    res.status(201).json({
      success: true,
      message: 'Socio registrado con éxito',
      socio: {
        id: socio.id,
        nombre: socio.nombre,
        email: socio.email,
        fecha_nac: socio.fecha_nac,
        metodo_pago: socio.metodo_pago,
        estado: socio.activo
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar socio' });
  }
});

// Login socio
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: 'Email y contraseña requeridos' });

    const socio = await prisma.socios.findUnique({ where: { email } });
    if (!socio) return res.status(401).json({ error: 'Credenciales inválidas' });

    const valido = await bcrypt.compare(password, socio.password);
    if (!valido) return res.status(401).json({ error: 'Credenciales inválidas' });

    const token = jwt.sign(
      { id: socio.id, tipo: 'socio' },
      process.env.JWT_SECRET || 'secreto',
      { expiresIn: '1h' }
    );

    res.json({
      success: true,
      message: 'Bienvenido',
      socio: {
        id: socio.id,
        nombre: socio.nombre,
        email: socio.email,
        fecha_nac: socio.fecha_nac,
        metodo_pago: socio.metodo_pago,
        estado: socio.activo
      },
      token,
    });
  } catch {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

// Obtener socio por id
router.get('/:id', async (req, res) => {
  try {
    const socio = await prisma.socios.findUnique({
      where: { id: Number(req.params.id) },
      select: { id: true, nombre: true, email: true, fecha_nac: true, metodo_pago: true, activo: true }
    });

    if (!socio) return res.status(404).json({ error: 'Socio no encontrado' });
    res.json(socio);
  } catch {
    res.status(500).json({ error: 'Error al obtener socio' });
  }
});

// Actualizar método de pago
router.put('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { metodo_pago } = req.body;

    if (!metodo_pago)
      return res.status(400).json({ error: 'Método de pago requerido' });

    const socioExistente = await prisma.socios.findUnique({ where: { id } });
    if (!socioExistente)
      return res.status(404).json({ error: 'Socio no encontrado' });

    const socio = await prisma.socios.update({
      where: { id },
      data: { metodo_pago },
    });

    res.json({
      success: true,
      message: 'Método de pago actualizado',
      socio: {
        id: socio.id,
        nombre: socio.nombre,
        email: socio.email,
        metodo_pago: socio.metodo_pago,
      },
    });
  } catch {
    res.status(500).json({ error: 'Error al actualizar método de pago' });
  }
});

export default router;
