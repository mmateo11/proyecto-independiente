// Importar dependencias necesarias
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

// Creamos el router y una instancia de Prisma
const router = Router();
const prisma = new PrismaClient();

// Obtener todos los jugadores
router.get('/', async (req, res) => {
  try {
    const jugadores = await prisma.jugadores.findMany();
    res.json(jugadores);
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// Obtener un jugador por ID
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const jugador = await prisma.jugadores.findUnique({ where: { id } });

  if (!jugador) return res.status(404).send('<h1>Jugador no encontrado</h1>');
  res.json(jugador);
});

// Crear un nuevo jugador
router.post('/', async (req, res) => {
  try {
    const nuevoJugador = await prisma.jugadores.create({
      data: req.body,
    });
    res.status(201).json(nuevoJugador);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el jugador' });
  }
});

// Actualizar un jugador existente
router.put('/:id', async (req, res) => {
  try {
    const jugadorActualizado = await prisma.jugadores.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(jugadorActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el jugador' });
  }
});

// Eliminar un jugador por ID
router.delete('/:id', async (req, res) => {
  try {
    const jugadorEliminado = await prisma.jugadores.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json(jugadorEliminado);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el jugador' });
  }
});

// Exportamos el router para usarlo en el archivo principal
export default router;
