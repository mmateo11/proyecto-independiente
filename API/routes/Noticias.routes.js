// Importa express y Prisma
import express from 'express';
import { PrismaClient } from '@prisma/client';

// Crea una instancia del cliente Prisma
const prisma = new PrismaClient();

// Crea un enrutador de Express
const router = express.Router();

// Obtener todas las noticias
router.get('/', async (req, res) => {
  try {
    const noticias = await prisma.noticias.findMany();
    res.json(noticias); // devuelve todas las noticias en formato JSON
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener noticias' });
  }
});


// Crear una nueva noticia
router.post('/', async (req, res) => {
  try {
    const nuevanoticia = await prisma.noticias.create({
      data: req.body, // toma los datos enviados desde el body
    });
    res.status(201).json(nuevanoticia); // devuelve la noticia creada
  } catch (error) {
    res.status(500).json({ error: 'Error al crear noticia' });
  }
});


// Obtener una noticia por su ID
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id); 
  const noticia = await prisma.noticias.findUnique({ where: { id } });

  if (!noticia) return res.status(404).send('<h1>Noticia no encontrada</h1>');
  res.json(noticia); // devuelve la noticia encontrada
});


// Actualizar una noticia por ID
router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const NoticiaActualizada = await prisma.noticias.update({
      where: { id },
      data: req.body, // actualiza con los datos del body
    });
    res.json(NoticiaActualizada); 
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar noticia' });
  }
});


// Eliminar una noticia por ID
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.noticias.delete({
      where: { id },
    });
    res.json({ message: 'Noticia eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar noticia' });
  }
});

// Exporta el enrutador para usarlo en el servidor principal
export default router;
