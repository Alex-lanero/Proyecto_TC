# 🌍 Acme Explorer

Aplicación web desarrollada en Angular para la gestión de viajes (Trips) con arquitectura basada en roles: Explorer, Manager y Administrator.

---

## 🚀 Descripción

Acme Explorer permite a los usuarios explorar, gestionar y participar en viajes organizados, implementando un modelo completo de dominio con separación de responsabilidades por rol.

La aplicación incluye funcionalidades avanzadas como gestión de aplicaciones, favoritos, control de estados y restricciones de negocio.

---

## 👥 Roles del sistema

### 🧑‍💼 Explorer
- Registro y autenticación
- Exploración de viajes disponibles
- Aplicación a viajes
- Cancelación de aplicaciones
- Pago de aplicaciones (estado DUE → ACCEPTED)
- Visualización de aplicaciones agrupadas por estado
- Gestión de listas de favoritos
- Visualización de viajes aceptados

**Credenciales:**

explorer@test.com

1234


---

### 🧑‍🔧 Manager
- Creación de viajes
- Edición de viajes (incluyendo stages)
- Cancelación de viajes (> 7 días)
- Reactivación de viajes cancelados
- Gestión de aplicaciones:
  - Aceptar (PENDING → DUE)
  - Rechazar
- Visualización de aplicaciones en formato tabla
- Solo puede gestionar sus propios viajes

**Credenciales:**

manager@test.com

1234


---

### 🧑‍💻 Administrator
- Acceso al dashboard
- Visualización de métricas:
  - Total de viajes
  - Total de aplicaciones
  - Aplicaciones por estado
- Creación de nuevos managers

**Credenciales:**

admin@test.com

1234


---

## ✈️ Funcionalidades principales

### 🧳 Gestión de Trips
- Creación de viajes con:
  - Título y descripción
  - Ubicación (ciudad y país)
  - Fechas
  - Dificultad (easy, medium, hard)
  - Imágenes
  - Stages (etapas con precio)
- Edición completa de viajes
- Cancelación con restricciones:
  - ❌ No permitido si faltan menos de 7 días
- Reactivación de viajes cancelados

---

### 📄 Gestión de Applications
- Estados del sistema:
  - PENDING
  - DUE
  - ACCEPTED
  - REJECTED
  - CANCELLED

- Flujo de negocio:
  1. Explorer aplica → PENDING
  2. Manager acepta → DUE
  3. Explorer paga → ACCEPTED

---

### ⭐ Favoritos (Explorer)
- Creación de listas de favoritos
- Añadir viajes a listas específicas
- Eliminación de viajes de listas
- Persistencia en localStorage por usuario
- Selección dinámica de lista al añadir

---

## ⚙️ Reglas de negocio implementadas

- ❌ No aplicar a viajes cancelados
- ❌ No aplicar a viajes ya iniciados
- ❌ No aplicar más de una vez al mismo viaje
- ❌ No cancelar viajes con menos de 7 días
- ✔ Manager solo gestiona sus propios viajes
- ✔ Explorer solo ve viajes activos
- ✔ Control de estados de aplicación consistente

---

## 🔍 Búsqueda y filtros

- Filtro por dificultad
- Búsqueda por:
  - Título
  - Descripción
  - Ciudad
  - País
  - Ticker

---

## 🎨 UI/UX

- Diseño responsive
- Cards visuales para trips
- Tabla para gestión de applications (Manager)
- Vista clara de aplicaciones por estado
- Header dinámico según rol
- Sistema de colores por dificultad:
  - 🟢 Easy
  - 🟠 Medium
  - 🔴 Hard
- Interacciones mejoradas (hover, botones dinámicos, estados visuales)

---

## 🧪 Testing

- Testing implementado con Vitest
- Test unitario del componente `TripDisplay`
- Cobertura de:
  - Renderizado
  - Interacciones
  - Lógica de filtrado
  - Aplicación a viajes

---

## 🧱 Arquitectura

- Angular con Standalone Components
- Signals para gestión reactiva del estado
- Servicios desacoplados por dominio
- Separación en:
  - core (servicios, guards)
  - features (auth, trips, admin)
  - shared (componentes reutilizables)

---

## 🗄️ Backend

Simulado con JSON Server:

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

Un Manager → múltiples Trips
Un Trip → múltiples Applications
Un Explorer → múltiples Applications
📌 Estado del proyecto

✔ Aplicación completamente funcional
✔ Roles correctamente implementados
✔ CRUD completo de trips
✔ Gestión completa de aplicaciones
✔ Sistema de favoritos
✔ Testing básico implementado
✔ UI/UX mejorada

🏁 Autor

Alex García Lanero