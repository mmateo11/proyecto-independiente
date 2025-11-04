document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    try {
        const res = await fetch(`/jugadores/${id}`);
        if (!res.ok) throw new Error('No se pudo cargar la noticia.');
        const jugador = await res.json();

        document.getElementById('player-image').src = jugador.url_imagen || 'https://placehold.co/600x400?text=No+Image';
        document.getElementById('player-name').textContent = jugador.nombre;
        document.getElementById('player-dorsal').textContent = jugador.dorsal;
        document.getElementById('posicion').textContent = jugador.posicion;
        document.getElementById('edad').textContent = jugador.edad;
        document.getElementById('lugar_nac').textContent = jugador.lugar_nacimiento;
        document.getElementById('peso').textContent = jugador.peso + ' kg';
        document.getElementById('nacionalidad').textContent = jugador.nacionalidad;
    } catch (err) {
        console.error(err);
        document.querySelector('.player-card').innerHTML = '<p>Error al cargar jugador</p>';
    }
});
