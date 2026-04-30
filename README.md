🌍 Acme Explorer

Aplicación web desarrollada en Angular para la gestión de viajes (Trips) con arquitectura basada en roles: Explorer, Manager y Administrator.

🚀 Descripción

Acme Explorer permite a los usuarios explorar, gestionar y participar en viajes organizados, incluyendo un flujo completo de aplicaciones y pagos mediante PayPal Sandbox.

El sistema implementa un modelo completo de dominio con validaciones, control de estados, reglas de negocio y una experiencia de usuario avanzada (notificaciones, loaders, estados visuales y navegación protegida).

👥 Roles del sistema
🧑‍💼 Explorer
Registro y autenticación
Exploración de viajes disponibles
Aplicación a viajes
Cancelación de aplicaciones
Pago de aplicaciones (PayPal sandbox)
Visualización de estado de aplicaciones:
🟡 Pending
💳 Pay now
✅ Accepted
❌ Rejected
Visualización de viajes aceptados
Gestión de listas de favoritos (persistidas en backend)

Credenciales:

explorer@test.com
1234
🧑‍🔧 Manager
Creación de viajes (con stages)
Edición de viajes
Cancelación de viajes (> 7 días)
Reactivación de viajes cancelados
Gestión de aplicaciones:
Aceptar (PENDING → DUE)
Rechazar
Visualización de aplicaciones en formato tabla
Solo puede gestionar sus propios viajes

Credenciales:

manager@test.com
1234
🧑‍💻 Administrator
Acceso al dashboard
Visualización de métricas:
Total de viajes
Total de aplicaciones
Aplicaciones por estado
Creación de nuevos managers

Credenciales:

admin@test.com
1234
✈️ Funcionalidades principales
🧳 Gestión de Trips
Creación de viajes con:
Título y descripción
Ubicación (ciudad y país)
Fechas
Dificultad (easy, medium, hard)
Imágenes
Stages (etapas con precio)
Edición completa de viajes
Cancelación con restricciones:
❌ No permitido si faltan menos de 7 días
Reactivación de viajes cancelados
Validación completa del formulario:
❌ Fechas inválidas
❌ Precios negativos
❌ Formulario vacío
📄 Gestión de Applications
Estados:
PENDING
DUE
ACCEPTED
REJECTED
CANCELLED
Flujo:
Explorer aplica → PENDING
Manager acepta → DUE
Explorer paga → ACCEPTED
💳 Payment (PayPal Sandbox)
Integración con ngx-paypal
Uso de cuentas sandbox
Funcionalidades:
Loader durante pago
Pantalla de éxito / error / cancelación
Protección contra doble click
Cambio automático a ACCEPTED
Compatible con SSR (solo ejecuta en navegador)
⭐ Favoritos (Explorer)
Creación de listas de favoritos
Añadir viajes a listas
Eliminar viajes de listas
Eliminar listas completas
Persistencia en JSON Server (backend)
Filtrado por usuario (explorerId)
⚙️ Reglas de negocio
❌ No aplicar a viajes cancelados
❌ No aplicar a viajes ya iniciados
❌ No aplicar más de una vez
❌ No cancelar viajes con menos de 7 días
✔ Manager solo gestiona sus trips
✔ Explorer solo ve trips activos
✔ Validación estricta en creación/edición
✔ Control de estados en UI
🔍 Búsqueda y filtros
Filtro por dificultad
Búsqueda por:
título
descripción
ciudad
país
ticker
🎨 UI / UX
Diseño responsive
Cards clicables completas
Estados dinámicos de aplicación
Badges visuales
Countdown de inicio
Loader en pagos
Notificaciones en pantalla (sin alert)
Header dinámico por rol
Colores:
🟢 Easy
🟠 Medium
🔴 Hard
🛡️ Guards y seguridad
canDeactivate para formularios
Persistencia de sesión con localStorage
Protección SSR (localStorage + PayPal)
🧪 Testing
🔹 Unit Testing (Vitest)

Cobertura implementada:

CreateTripComponent:
✔ Crear trip válido
✔ Validar fechas inválidas
✔ Validar precios negativos
TripDisplayComponent:
✔ Renderizado
✔ Filtros
✔ Aplicación a viajes
✔ Estados de aplicación
🔹 E2E Testing (Cypress)

Caso implementado:

Navegación completa:
Login simulado
Búsqueda de viajes
Acceso a detalle
Aplicación a viaje

✔ Test robusto independiente del estado de la DB
✔ Limpieza automática de applications antes de ejecutar

🧱 Arquitectura
Angular Standalone Components
Signals (estado reactivo)
Servicios desacoplados
Guards de navegación
src/app/
  core/
    services/
    guards/

  features/
    auth/
    trips/
    admin/
    payment/

  shared/
    header/
    notification/
🗄️ Backend

Simulado con JSON Server:

npx json-server --watch db.json --port 3000
🧪 Reset de datos (tests)

Para evitar conflictos en tests E2E:

Limpieza de applications antes de test
Opcional: restauración de db.json
📦 Instalación
npm install
npm start
🧪 Ejecutar tests
# Unit tests
npx vitest

# E2E tests
npx cypress open
🧠 Modelo de dominio

Relaciones:

Un Manager → múltiples Trips
Un Trip → múltiples Applications
Un Explorer → múltiples Applications
Un Explorer → múltiples FavouriteLists
📌 Estado del proyecto

✔ Aplicación completamente funcional
✔ Roles correctamente implementados
✔ CRUD completo de trips
✔ Gestión completa de applications
✔ Sistema de favoritos en backend
✔ Integración PayPal
✔ Validaciones completas
✔ Guards y persistencia
✔ UI/UX avanzada
✔ Unit testing completo
✔ E2E testing implementado

🏁 Autor

Alex García Lanero