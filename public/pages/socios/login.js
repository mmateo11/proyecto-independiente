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


function InciarEventos() {
  const btnAbrirSocio = document.getElementById("btnsocios");
  const btncerrarsesion = document.getElementById("btncerrarsesion");

  // Abrir modal desde header
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
      window.location.href = "/proyecto/public/index.html";
    });
  }
}
document.addEventListener("DOMContentLoaded", () => {
  InciarEventos();
  actualizarHeader();
  
  const modales = document.querySelectorAll(".modal");
  const formRegister = document.getElementById("formRegister");
  const formLogin = document.getElementById("formLogin");

  // Sistema genérico abrir/cerrar
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

  // Cerrar modal al hacer click fuera
  modales.forEach(modal => {
    modal.addEventListener("click", e => {
      if (e.target === modal) modal.classList.remove("active");
    });
  });

  // Registro
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
        const res = await fetch("http://localhost:3000/socios/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
        const result = await res.json();
        if (res.ok) {
          localStorage.setItem("token", result.token);
          localStorage.setItem("socio", JSON.stringify(result.socio));
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

  // Login (lógica placeholder, podés conectar a tu endpoint real)
  if (formLogin) {
    formLogin.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = {
        email: document.getElementById("emailLogin").value,
        password: document.getElementById("passwordLogin").value
      };
      try {
        const res = await fetch("http://localhost:3000/socios/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
        const result = await res.json();
        if (res.ok) {
          localStorage.setItem("token", result.token);
          localStorage.setItem("socio", JSON.stringify(result.socio));
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
