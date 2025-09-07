
function actualizarHeader() {
  const btnAbrir = document.getElementById("btnsocios");
  const btnsededigital = document.getElementById("btnsededigital");
  const btncerrarsesion = document.getElementById("btncerrarsesion");

  const socio = JSON.parse(localStorage.getItem("socio"));
  if (socio) {
    if (btnAbrir) btnAbrir.style.display = "none";
    if (btnsededigital) btnsededigital.style.display = "inline-block";
    if (btncerrarsesion) btncerrarsesion.style.display = "inline-block";
  } else {
    if (btnAbrir) btnAbrir.style.display = "inline-block";
    if (btnsededigital) btnsededigital.style.display = "none";
    if (btncerrarsesion) btncerrarsesion.style.display = "none";
  }
}


document.addEventListener("DOMContentLoaded", () => {
  // Modal y form
  const modal = document.getElementById("modalSocio");
  const btnAbrir = document.getElementById("btnsocios");
  const btnCerrar = document.getElementById("cerrarModal");
  const form = document.getElementById("formSocio");

  const btncerrarsesion = document.getElementById("btncerrarsesion");

  actualizarHeader();

  // Abrir modal
  if (btnAbrir) {
    btnAbrir.addEventListener("click", (e) => {
      e.preventDefault();
      if (modal) modal.style.display = "block";
    });
  }

  // Cerrar modal
  if (btnCerrar) {
    btnCerrar.addEventListener("click", () => {
      if (modal) modal.style.display = "none";
      if (form) form.reset();
    });
  }

  // Cerrar modal al hacer click fuera
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      if (form) form.reset();
    }
  });

  // Cerrar sesión
  if (btncerrarsesion) {
    btncerrarsesion.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("token");
      localStorage.removeItem("socio");
      actualizarHeader();
      window.location.href = "/proyecto/index.php";
    });
  }

  // Enviar formulario
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const data = {
        nombre: document.getElementById("nombre").value,
        fecha_nac: document.getElementById("fecha_nac").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        metodo_pago: document.getElementById("metodo_pago").value
      };

      try {
        const res = await fetch("http://localhost:3000/socios/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });

        const result = await res.json();

        if (res.ok) {
          // Guardar sesión
          localStorage.setItem("token", result.token);
          localStorage.setItem("socio", JSON.stringify(result.socio));

          Swal.fire({
            title: "Usuario creado",
            text: "Bienvenido " + result.socio.nombre,
            icon: "success",
            confirmButtonText: "Aceptar",
            background: "#000",
            color: "#fff",
            confirmButtonColor: "#e50914"
          });

          if (modal) modal.style.display = "none";
          form.reset();
          actualizarHeader();

        } else {
          Swal.fire({
            title: "Error",
            text: result.error || "Surgió un error al crear el usuario",
            icon: "error",
            confirmButtonText: "Aceptar",
            background: "#000",
            color: "#fff",
            confirmButtonColor: "#e50914"
          });
        }

      } catch (err) {
        console.error(err);
        Swal.fire({
          title: "Error",
          text: "No se pudo conectar con el servidor",
          icon: "error",
          confirmButtonText: "Aceptar",
          background: "#000",
          color: "#fff",
          confirmButtonColor: "#e50914"
        });
      }
    });
  }

});
