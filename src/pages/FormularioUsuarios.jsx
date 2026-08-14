

import React, { useState } from "react";
import { UserPlus, Trash2, Mail, Phone, MapPin, Calendar, User, Users } from "lucide-react";
 
const initialForm = {
  nombre: "",
  correo: "",
  telefono: "",
  edad: "",
  ciudad: "",
};
 
export default function FormularioUsuarios() {
  const [formData, setFormData] = useState(initialForm);
  const [usuarios, setUsuarios] = useState([]);
  const [errores, setErrores] = useState({});
 
  const totalUsuarios = usuarios.length;
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: null }));
    }
  };
 
  const validar = () => {
    const nuevosErrores = {};
    if (!formData.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio";

    if (!formData.correo.trim())
      nuevosErrores.correo = "El correo es obligatorio";
    else if (!/^\S+@\S+\.\S+$/.test(formData.correo))
      nuevosErrores.correo = "Correo inválido";
    
    if (!formData.telefono.trim()) 
        nuevosErrores.telefono = "El teléfono es obligatorio";
    else if (!/^\d{7,15}$/.test(formData.telefono)) 
      nuevosErrores.telefono = "Ingresa un teléfono válido (7-15 dígitos)";


    if (!formData.edad.trim())
      nuevosErrores.edad = "La edad es obligatoria";
    else if (isNaN(formData.edad) || Number(formData.edad) <= 0)
      nuevosErrores.edad = "Ingresa una edad válida";

    if (!formData.ciudad.trim()) nuevosErrores.ciudad = "La ciudad es obligatoria";
    return nuevosErrores;
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = validar();
 
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }
 
    const nuevoUsuario = {
      id: Date.now(),
      ...formData,
    };
 
    setUsuarios((prev) => [nuevoUsuario, ...prev]);
    window.alert(`Usuario "${formData.nombre}" registrado exitosamente`);
    setFormData(initialForm);
    setErrores({});
  };
 
  const handleEliminar = (id) => {
    setUsuarios((prev) => prev.filter((u) => u.id !== id));
  };
 
  return (
    <div className="min-h-screen w-full bg-[#F4F2FB] flex justify-center py-6 px-3 sm:py-10 sm:px-6">
      <div className="w-full max-w-6xl">
        {/* Encabezado */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl bg-[#4338CA] flex items-center justify-center shrink-0">
              <Users className="text-white" size={22} />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                Registro de Usuarios
              </h1>
              <p className="text-sm text-gray-700">
                Captura los datos y consulta la lista de registrados
              </p>
            </div>
          </div>
        </header>
 
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 sm:gap-6">
          <section className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-[#E5E3F5] p-5 sm:p-6 h-fit">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <UserPlus size={20} className="text-[#4338CA]" />
              Nuevo registro
            </h2>
 
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
              <Campo
                label="Nombre completo"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                error={errores.nombre}
                placeholder="Ej. Laura Gómez"
                icon={<User size={16} />}
              />
              <Campo
                label="Correo electrónico"
                name="correo"
                type="email"
                value={formData.correo}
                onChange={handleChange}
                error={errores.correo}
                placeholder="laura@correo.com"
                icon={<Mail size={16} />}
              />
              <Campo
                label="Teléfono"
                name="telefono"
                type="number"
                value={formData.telefono}
                onChange={handleChange}
                error={errores.telefono}
                placeholder="Ej. 3001234567"
                icon={<Phone size={16} />}
              />
              <div className="grid grid-cols-2 gap-3">
                <Campo
                  label="Edad"
                  name="edad"
                  type="number"
                  value={formData.edad}
                  onChange={handleChange}
                  error={errores.edad}
                  placeholder="Ej. 25"
                  icon={<Calendar size={16} />}
                />
                <Campo
                  label="Ciudad"
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={handleChange}
                  error={errores.ciudad}
                  placeholder="Ej. Bogotá"
                  icon={<MapPin size={16} />}
                />
              </div>
 
              <button
                type="submit"
                className="mt-2 w-full bg-[#4338CA] hover:bg-[#372ea8] active:scale-[0.99] transition-all text-white font-medium rounded-xl py-2.5 sm:py-3 flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <UserPlus size={18} />
                Agregar usuario
              </button>
            </form>
          </section>
 
          <section className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-[#E5E3F5] p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                Usuarios registrados
              </h2>
              <span className="text-xs sm:text-sm font-medium bg-[#EEF2FF] text-[#4338CA] px-3 py-1 rounded-full">
                {totalUsuarios} {totalUsuarios === 1 ? "usuario" : "usuarios"}
              </span>
            </div>
 
            {usuarios.length === 0 ? (
              <div className="border border-dashed border-[#D9D6F0] rounded-xl py-12 sm:py-16 flex flex-col items-center justify-center text-center px-4">
                <Users size={32} className="text-[#C7C3E8] mb-3" />
                <p className="text-gray-700 text-sm sm:text-base">
                  Aún no hay usuarios registrados
                </p>
                <p className="text-gray-500 text-xs sm:text-sm mt-1">
                  Completa el formulario para agregar el primero
                </p>
              </div>
            ) : (
              <ul className="flex flex-col gap-3 max-h-[520px] overflow-y-auto pr-1">
                {usuarios.map((usuario) => (
                  <li
                    key={usuario.id}
                    className="flex items-start sm:items-center justify-between gap-3 border border-[#EDEBF9] rounded-xl p-3 sm:p-4 hover:border-[#C7C3E8] transition-colors"
                  >
                    <div className="flex items-start sm:items-center gap-3 min-w-0">
                      <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-[#EEF2FF] text-[#4338CA] flex items-center justify-center font-semibold shrink-0 text-sm">
                        {usuario.nombre.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 text-sm sm:text-base truncate">
                          {usuario.nombre}
                        </p>
                        <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] sm:text-xs text-[#6B7280] mt-0.5">
                          <span className="flex items-center gap-1 truncate">
                            <Mail size={12} /> {usuario.correo}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone size={12} /> {usuario.telefono}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar size={12} /> {usuario.edad} años
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={12} /> {usuario.ciudad}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleEliminar(usuario.id)}
                      className="text-[#B91C1C] hover:bg-[#FEF2F2] p-2 rounded-lg transition-colors shrink-0"
                      aria-label={`Eliminar a ${usuario.nombre}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
 
function Campo({ label, name, value, onChange, error, placeholder, icon, type = "text" }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-xs sm:text-sm font-medium text-gray-700">
        {label}
      </label>
      <div
        className={`flex items-center gap-2 border rounded-xl px-3 py-2 sm:py-2.5 bg-[#FAFAFB] focus-within:ring-2 focus-within:ring-[#4338CA]/30 focus-within:border-[#4338CA] transition-colors ${
          error ? "border-[#EF4444]" : "border-[#E5E7EB]"
        }`}
      >
        <span className="text-[#9CA3AF]">{icon}</span>
          <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-sm text-gray-900 placeholder:text-gray-400"
        />
      </div>
      {error && <span className="text-[11px] sm:text-xs text-[#DC2626]">{error}</span>}
    </div>
  );
}
 
