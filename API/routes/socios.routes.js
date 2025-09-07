import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from "nodemailer";

const prisma = new PrismaClient();
const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "proyectoindependiente7@gmail.com",
    pass: "gjcr grob sron igsd" // contraseña de aplicación
  },
});

async function enviarMailBienvenida(emailDestino, nombre) {
  await transporter.sendMail({
    from: '"Club Independiente 👹" <proyectoindependiente7@gmail.com>',
    to: emailDestino,
    subject: "¡Tu pago fue confirmado! Bienvenido al Club Independiente 👹",
    html: `
      <div style="background-color:#990000; color:#fff; font-family:Arial, sans-serif; padding:30px; text-align:center; border-radius:10px;">
        <h1 style="font-size:28px;">¡Hola ${nombre}!</h1>
        <h2 style="font-size:24px;">Tu pago fue confirmado ✅</h2>
        <p style="font-size:18px;">¡Ya sos socio del Club de Futbol Independiente 👹!</p>
        <p>Ahora podés disfrutar de todos los beneficios exclusivos del club ⚽</p>
        <div style="margin-top:20px;">
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/7f/Club_Independiente_logo.svg" alt="Independiente" width="150" style="border-radius:10px;">
        </div>
        <p style="margin-top:20px; font-size:14px; color:#ffcccb;">Gracias por tu apoyo y bienvenida al Rojo ❤️</p>
      </div>
    `,
  });
}


// Hacerse socio
router.post('/register', async (req, res) => {
  try {
    const { nombre, fecha_nac, email, password, metodo_pago } = req.body;

    if (!nombre || !fecha_nac || !email || !password || !metodo_pago) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    // Validación de contraseña
    const passwordvalidacion = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordvalidacion.test(password)) {
      return res.status(400).json({
        error:
          'La contraseña debe tener mínimo 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 caracter especial',
      });
    }

    // Validar si ya existe
    const userExists = await prisma.socios.findUnique({ where: { email } });
    if (userExists)
      return res.status(400).json({ error: 'El email ya está registrado como socio' });

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear socio
    const socio = await prisma.socios.create({
      data: {
        nombre: req.body.nombre,
        fecha_nac: new Date(req.body.fecha_nac),
        email: req.body.email,
        password: hashedPassword,
        metodo_pago: req.body.metodo_pago
      },
    });

    enviarMailBienvenida(socio.email, socio.nombre)
    .catch(err => console.error("Error enviando mail:", err));

    // Generar token para iniciar sesión automáticamente
    const token = jwt.sign(
      { id: socio.id, tipo: 'socio' },
      process.env.JWT_SECRET || 'secreto',
      { expiresIn: '1h' }
    );

   res.status(201).json({
      success: true,                      
      message: 'Socio registrado con éxito', 
      socio: { id: socio.id, nombre: socio.nombre, email: socio.email },
      token,
  });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al registrar socio' });
  }
});

export default router;
