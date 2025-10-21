import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    try {
        const jugadores = await prisma.jugadores.findMany();
        res.json(jugadores);
    } catch (error) {
        console.error('Error al obtener los jugadores:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const jugador = await prisma.jugadores.findUnique({ where: { id } });
    if (!jugador) return res.status(404).send('<h1>Jugador no encontrado</h1>');
    res.json(jugador);
});


router.post('/', async (req, res) => {
    try {
        const nuevoJugador = await prisma.jugadores.create({
            data: req.body,
        });
        res.status(201).json(nuevoJugador);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el jugador' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const jugadorActualizado = await prisma.jugadores.update({
            where: {
                id: parseInt(req.params.id),
            },
            data: req.body,
        });
        res.json(jugadorActualizado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el jugador' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const jugadorEliminado = await prisma.jugadores.delete({
            where: {
                id: parseInt(req.params.id),
            },
        });
        res.json(jugadorEliminado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el jugador' });
    }
});

export default router;
