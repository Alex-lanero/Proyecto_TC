# 🌍 Acme Explorer

Aplicación web desarrollada en Angular para la gestión de viajes (Trips) con diferentes roles: Explorer, Manager y Administrator.

---

## 🚀 Descripción

Acme Explorer permite a los usuarios explorar viajes, aplicar a ellos y gestionarlos dependiendo de su rol.

El sistema implementa un modelo completo de dominio con relaciones entre usuarios, viajes y aplicaciones.

---

## 👥 Roles

### 🧑‍💼 Explorer
- Registrarse y autenticarse
- Explorar viajes disponibles
- Aplicar a viajes
- Cancelar aplicaciones
- Pagar aplicaciones (estado DUE)
- Ver sus aplicaciones agrupadas por estado

explorer@test.com
1234

---

### 🧑‍🔧 Manager
- Crear viajes
- Editar viajes
- Cancelar viajes (si > 7 días)
- Gestionar aplicaciones:
  - Aceptar → pasa a DUE
  - Rechazar
- Solo puede gestionar SUS viajes

manager@test.com
1234

---

### 🧑‍💻 Administrator
- Acceso al dashboard
- Ver métricas del sistema:
  - Total trips
  - Total applications
  - Applications por estado
- Crear nuevos managers

admin@test.com
1234

---

## ✈️ Funcionalidades principales

### Trips
- Creación de viajes con:
  - Título, descripción
  - Localización (ciudad, país)
  - Fechas
  - Dificultad (easy, medium, hard)
  - Imagen
  - Stages (etapas con precio)

- Edición de viajes
- Cancelación con restricciones:
  - ❌ No cancelar si < 7 días

---

### Applications
- Estados:
  - PENDING
  - DUE
  - ACCEPTED
  - REJECTED
  - CANCELLED

- Flujo:
  1. Explorer aplica → PENDING
  2. Manager acepta → DUE
  3. Explorer paga → ACCEPTED

---

### Reglas de negocio implementadas

- ❌ No aplicar a viajes cancelados
- ❌ No aplicar a viajes ya iniciados
- ❌ No cancelar viajes si < 7 días
- ✔ Manager solo gestiona sus trips
- ✔ Explorer solo ve trips no cancelados
- ✔ Manager puede reactivar trips editando

---

## 🔍 Búsqueda y filtros

- Filtro por dificultad
- Búsqueda por:
  - título
  - descripción
  - ciudad
  - país
  - ticker

---

## 🎨 UI/UX

- Diseño responsive
- Cards para trips y applications
- Dashboard visual para admin
- Header dinámico por rol
- Estados con colores:
  - 🟢 easy
  - 🟠 medium
  - 🔴 hard

---

## 🧱 Arquitectura

- Angular Standalone Components
- Signals para estado reactivo
- Servicios para lógica de negocio
- JSON Server como backend simulado

---

## 🗄️ Backend

Simulado con:

```bash
npx json-server --watch db.json --port 3000

📦 Instalación
npm install
npm start
📊 Estructura del proyecto
src/app/
  core/
    services/
    guards/

  features/
    auth/
    trips/
    admin/

  shared/
    header/
    footer/
🧠 Modelo de dominio

Relaciones principales:

Un Manager → muchos Trips
Un Trip → muchas Applications
Un Explorer → muchas Applications
📌 Estado del proyecto

✔ Funcional
✔ Roles completos
✔ CRUD de trips
✔ Gestión de aplicaciones
✔ Dashboard admin
✔ UI mejorada

🏁 Autor

Alex García Lanero

