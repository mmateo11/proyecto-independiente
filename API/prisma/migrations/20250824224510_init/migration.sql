/*
  Warnings:

  - You are about to drop the column `img` on the `noticias` table. All the data in the column will be lost.
  - You are about to alter the column `tipo` on the `noticias` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - You are about to alter the column `password` on the `usuarios` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - Added the required column `url_imagen` to the `noticias` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `noticias` DROP COLUMN `img`,
    ADD COLUMN `url_imagen` VARCHAR(191) NOT NULL,
    MODIFY `tipo` ENUM('PRINCIPAL', 'SECUNDARIO') NOT NULL;

-- AlterTable
ALTER TABLE `usuarios` MODIFY `password` VARCHAR(191) NOT NULL,
    MODIFY `rol` ENUM('ADMIN', 'USER') NOT NULL;

-- CreateTable
CREATE TABLE `partidos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATETIME(3) NOT NULL,
    `rival` VARCHAR(191) NOT NULL,
    `resultado` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `socios` (
    `id_usuario` INTEGER NOT NULL,
    `dni` VARCHAR(191) NOT NULL,
    `nyap` VARCHAR(191) NOT NULL,
    `fecha_nacimiento` DATETIME(3) NOT NULL,
    `genero` ENUM('MASCULINO', 'FEMENINO', 'OTRO') NOT NULL,

    UNIQUE INDEX `socios_dni_key`(`dni`),
    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `entradas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_partido` INTEGER NOT NULL,
    `id_socio` INTEGER NOT NULL,
    `valor` DOUBLE NOT NULL,
    `metodo_pago` ENUM('EFECTIVO', 'TARJETA', 'TRANSFERENCIA') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `socios` ADD CONSTRAINT `socios_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `entradas` ADD CONSTRAINT `entradas_id_partido_fkey` FOREIGN KEY (`id_partido`) REFERENCES `partidos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `entradas` ADD CONSTRAINT `entradas_id_socio_fkey` FOREIGN KEY (`id_socio`) REFERENCES `socios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;
