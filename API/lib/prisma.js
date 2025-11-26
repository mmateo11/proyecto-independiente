import { PrismaClient } from "../generated/prisma/client.js";

/*
	Inicialización de PrismaClient:
	- Prisma v7 ya no almacena 'url' en `schema.prisma`.
	- Las URLs de migraciones van en `prisma/prisma.config.ts` (o env var DATABASE_URL).
	- En runtime debes pasar 'adapter' (conexión directa) o 'accelerateUrl' para usar Prisma Accelerate.

	Aquí hacemos una inicialización flexible:
	- Si existe PRISMA_ACCELERATE_URL usamos accelerateUrl
	- Si existe DATABASE_URL y no tienes un adaptador de Prisma instalado, pasamos la URL como "adapter". 
		(Si usas un paquete de adapter, reemplaza la asignación por la fábrica de adapter, p.ej. createPostgresAdapter({ url: process.env.DATABASE_URL }))
*/

const clientOptions = {};

if (process.env.PRISMA_ACCELERATE_URL) {
	clientOptions.accelerateUrl = process.env.PRISMA_ACCELERATE_URL;
} else if (process.env.DATABASE_URL) {
	// Nota: si usas un paquete adapter oficial, reemplaza la línea siguiente
	// por e.g. import { createPostgresAdapter } from '@prisma/adapter-postgres'
	// clientOptions.adapter = createPostgresAdapter({ url: process.env.DATABASE_URL })
	clientOptions.adapter = process.env.DATABASE_URL;
}

const prisma = new PrismaClient(clientOptions);

export default prisma;


