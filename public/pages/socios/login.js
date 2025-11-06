// Definir base URL según el entorno
const baseURL = window.location.hostname.includes("vercel.app")
  ? "https://proyecto-independiente.vercel.app/api"
  : "http://localhost:3000/api";

// Función para actualizar la visibilidad de botones en el header
function actualizarHeader() {
  const btnAbrir = document.getElementById("btnsocios");
  const btnsededigital = document.getElementById("btnsededigital");
  const btncerrarsesion = document.getElementById("btncerrarsesion");

  const socio = JSON.parse(localStorage.getItem("socio"));

  if (socio) {
    // Si el usuario está logueado
    if (btnAbrir) btnAbrir.style.display = "none";
    if (btnsededigital) btnsededigital.style.display = "inline-block";
    if (btncerrarsesion) btncerrarsesion.style.display = "inline-block";
  } else {
    // Si no hay usuario logueado
    if (btnAbrir) btnAbrir.style.display = "inline-block";
    if (btnsededigital) btnsededigital.style.display = "none";
    if (btncerrarsesion) btncerrarsesion.style.display = "none";
  }
}

// Función para inicializar eventos del header
function InciarEventos() {
  const btnAbrirSocio = document.getElementById("btnsocios");
  const btncerrarsesion = document.getElementById("btncerrarsesion");
  
  // Abrir modal de registro desde el header
  if (btnAbrirSocio) {
    btnAbrirSocio.addEventListener("click", (e) => {
      e.preventDefault();
      const modal = document.getElementById("modalRegister");
      if (modal) modal.classList.add("active");
    });
  }

  // Cerrar sesión
  if (btncerrarsesion) {
    btncerrarsesion.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("token");
      localStorage.removeItem("socio");
      actualizarHeader();
      window.location.href = "/public/index.html"; // Redirige al inicio
    });
  }
}

// Inicializar todo cuando el header ya se cargó
document.addEventListener('headerLoaded', () => {
  InciarEventos();
  actualizarHeader();

  const modales = document.querySelectorAll(".modal");
  const formRegister = document.getElementById("formRegister");
  const formLogin = document.getElementById("formLogin");

  // Sistema genérico para abrir y cerrar modales
  document.querySelectorAll("[data-open]").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const abrirId = link.getAttribute("data-open");
      const cerrarId = link.getAttribute("data-close");
      if (cerrarId) document.getElementById(cerrarId).classList.remove("active");
      if (abrirId) document.getElementById(abrirId).classList.add("active");
    });
  });

  document.querySelectorAll("[data-close]").forEach(btn => {
    btn.addEventListener("click", () => {
      const cerrarId = btn.getAttribute("data-close");
      if (cerrarId) document.getElementById(cerrarId).classList.remove("active");
    });
  });

  // Cerrar modal al hacer click fuera del contenido
  modales.forEach(modal => {
    modal.addEventListener("click", e => {
      if (e.target === modal) modal.classList.remove("active");
    });
  });

  // Registro de nuevo socio
  if (formRegister) {
    formRegister.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const data = {
        nombre: document.getElementById("nombre").value,
        fecha_nac: document.getElementById("fecha_nac").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        metodo_pago: document.getElementById("metodo_pago").value
      };

      try {
        const res = await fetch(`${baseURL}/socios/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });

        const result = await res.json();

        if (res.ok) {
          // Guardar token y datos del socio
          localStorage.setItem("token", result.token);
          localStorage.setItem("socio", JSON.stringify(result.socio));

          // Mostrar mensaje de éxito
          Swal.fire({
            title: "Usuario creado",
            text: "Bienvenido " + result.socio.nombre,
            icon: "success",
            confirmButtonText: "Aceptar",
            background: "#000",
            color: "#fff",
            timer: 1000,
            confirmButtonColor: "#e50914"
          });

          document.getElementById("modalRegister").classList.remove("active");
          formRegister.reset();
          actualizarHeader();
        } else {
          // Mostrar error recibido del servidor
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

  // Login de socio existente
  if (formLogin) {
    formLogin.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const data = {
        email: document.getElementById("emailLogin").value,
        password: document.getElementById("passwordLogin").value
      };

      try {
        const res = await fetch(`${baseURL}/socios/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });

        const result = await res.json();

        if (res.ok) {
          // Guardar token y datos del socio
          localStorage.setItem("token", result.token);
          localStorage.setItem("socio", JSON.stringify(result.socio));

          // Mostrar mensaje de bienvenida
          Swal.fire({
            title: "Bienvenido",
            text: result.socio.nombre,
            icon: "success",
            confirmButtonText: "Aceptar",
            background: "#000",
            color: "#fff",
            timer: 1000,
            confirmButtonColor: "#e50914"
          });

          document.getElementById("modalLogin").classList.remove("active");
          formLogin.reset();
          actualizarHeader();
        } else {
          // Mostrar error de login
          Swal.fire({
            title: "Error",
            text: result.error || "Credenciales inválidas",
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
