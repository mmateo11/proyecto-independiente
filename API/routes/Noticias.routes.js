import express from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const router = express.Router();

  router.get('/', async (req, res) => {
    try {
      const noticias = await prisma.noticias.findMany();
      res.json(noticias);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener noticias' });
    }
  });

router.post('/', async (req, res) => {
  try {
    const nuevanoticia = await prisma.noticias.create({
      data: req.body, // acá toma los datos que mandás en el body
    });
    res.status(201).json(nuevanoticia); // devuelve el nuevo registro creado
  } catch (error) {
    console.error('Error al crear noticia:', error);
    res.status(500).json({ error: 'Error al crear noticia' });
  }
});

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const noticia = await prisma.noticias.findUnique({ where: { id } });
    if (!noticia) return res.status(404).send('<h1>Noticia no encontrada</h1>');
    res.json(noticia);
});

router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const NoticiaActualizada = await prisma.noticias.update({
      where: { id },
      data: req.body,
    });
    res.json(NoticiaActualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar noticia' });
  }
});

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.noticias.delete({
      where: { id },
    });
    res.json({ message: 'noticia eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar noticia' });
  }
});

export default router;