import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    // Datos de perfil (ejemplo)
    nombre: "Camila Restrepo",
    correo: "camila.pets@sos.co",
    telefono: "+57 312 894 0021",
    documento: "1061234567",
    tipoDocumento: "cedula_ciudadania",
    fecha: "15/05/1998",
    ocupacion: "Médica Veterinaria",
    ciudad: "Popayán, Colombia",
    descripcion:
      "Amante incondicional de los animales, rescatista independiente y hogar de paso para perritos y gatitos en rehabilitación.",
    fotoPerfil: null,
    amigos: 106,
    seguidores: 81,
    rescates: 42,

    // NUEVO: rol del usuario ("usuario" o "fundacion")
    rol: "usuario",

    // NUEVO: datos del registro (se llenan al registrarse)
    registro: {
      rol: "",
      tipoDocumento: "",
      documento: "",
      nombre: "",
      nombreFundacion: "",
      representanteLegal: "",
      telefono: "",
      ciudadDireccion: "",
      email: "",
      password: "",
    },
  });

  const updateUser = (newData) => {
    setUserData((prev) => ({ ...prev, ...newData }));
  };

  // NUEVO: guardar los datos del registro (incluido el rol)
  const guardarRegistro = (datosRegistro) => {
    setUserData((prev) => ({
      ...prev,
      rol: datosRegistro.rol,
      registro: { ...datosRegistro },
      // También rellenamos el perfil con lo que se pueda
      nombre:
        datosRegistro.rol === "fundacion"
          ? datosRegistro.nombreFundacion
          : datosRegistro.nombre,
      correo: datosRegistro.email,
      telefono: datosRegistro.telefono || prev.telefono,
      documento: datosRegistro.documento || prev.documento,
      tipoDocumento:
        datosRegistro.tipoDocumento || prev.tipoDocumento,
      ciudad:
        datosRegistro.ciudadDireccion || prev.ciudad,
    }));
  };

  return (
    <UserContext.Provider
      value={{ userData, updateUser, guardarRegistro }}
    >
      {children}
    </UserContext.Provider>
  );
};
