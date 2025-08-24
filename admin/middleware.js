import jwt from 'jsonwebtoken';

export const verificarAdmin = (req, res, next) => {
    // 1. Obtiene el token del header de la petición.
    // El formato es 'Bearer TOKEN_AQUI'.
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Token no proporcionado.' });
    }
    const token = authHeader.split(' ')[1];

    try {
        // 2. Decodifica el token usando tu "secreto" de JWT.
        // Asegúrate de que este secreto sea el mismo que usas para firmar los tokens.
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Verifica el rol del usuario.
        if (decoded.rol === 'admin') {
            // Si el rol es 'admin', el middleware pasa el control
            // a la siguiente función (la ruta).
            next();
        } else {
            // Si el rol no es 'admin', rechaza el acceso.
            res.status(403).json({ error: 'Acceso no autorizado. Permisos de administrador requeridos.' });
        }
    } catch (error) {
        // Si el token es inválido o ha expirado, envía un error 401.
        res.status(401).json({ error: 'Token inválido o expirado.' });
    }
};
