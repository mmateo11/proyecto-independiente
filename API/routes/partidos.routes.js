import express from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const router = express.Router();

  router.get('/', async (req, res) => {
    try {
      const partidos = await prisma.partidos.findMany();
      res.json(partidos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los partidos' });
    }
  });

router.post('/', async (req, res) => {
  try {
    const { rival, resultado, fecha } = req.body; 

    const nuevopartido = await prisma.partidos.create({
      data: {
        rival,
        resultado,
        fecha: new Date(fecha)
      },
    });

    res.status(201).json(nuevopartido);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el partido' });
  }
});


router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const partidos = await prisma.partidos.findUnique({
      where: { id },
    });
    if (!partidos) return res.status(404).json({ error: 'partido no encontrado' });
    res.json(partidos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener partido' });
  }
});

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

    res.json(partidoactualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar partido' });
  }
});


router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.partidos.delete({
      where: { id },
    });
    res.json({ message: 'partido eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar partido' });
  }
});

export default router;