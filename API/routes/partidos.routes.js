// Importa express y Prisma
import express from 'express';
import { PrismaClient } from '@prisma/client';

// Crea una instancia del cliente Prisma
const prisma = new PrismaClient();

// Crea un enrutador de Express
const router = express.Router();

// Obtener todos los partidos
router.get('/', async (req, res) => {
  try {
    const partidos = await prisma.partidos.findMany();
    res.json(partidos); // devuelve todos los partidos
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los partidos' });
  }
});

// Crear un nuevo partido
router.post('/', async (req, res) => {
  try {
    const { rival, resultado, fecha } = req.body;

    const nuevopartido = await prisma.partidos.create({
      data: {
        rival,
        resultado,
        fecha: new Date(fecha) // convierte la fecha a tipo Date
      },
    });

    res.status(201).json(nuevopartido); // devuelve el partido creado
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el partido' });
  }
});

// Obtener un partido por ID
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const partidos = await prisma.partidos.findUnique({
      where: { id },
    });

    if (!partidos) return res.status(404).json({ error: 'Partido no encontrado' });
    res.json(partidos); // devuelve el partido encontrado
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener partido' });
  }
});

// Actualizar un partido por ID
router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const { rival, resultado, fecha } = req.body;

    const partidoactualizado = await prisma.partidos.update({
      where: { id },
      data: {
        rival,
        resultado,
        fecha: new Date(fecha)
      },
    });

    res.json(partidoactualizado); // devuelve el partido actualizado
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar partido' });
  }
});

// Eliminar un partido por ID
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.partidos.delete({
      where: { id },
    });
    res.json({ message: 'Partido eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar partido' });
  }
});

// Exporta el enrutador para usarlo en el servidor principal
export default router;
