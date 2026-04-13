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
Gestión de listas de favoritos

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
Visualización de aplicaciones (tabla)
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
Validación completa del formulario (no se permiten trips vacíos)
📄 Gestión de Applications

Estados del sistema:

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
Integración real con PayPal mediante ngx-paypal
Uso de cuentas sandbox
Flujo completo:
Loader durante pago
Gestión de éxito / error / cancelación
Protección contra doble pago
Cambio automático de estado a ACCEPTED
Compatible con SSR (renderizado solo en navegador)
⭐ Favoritos (Explorer)
Creación de listas de favoritos
Añadir viajes a listas específicas
Eliminación de viajes de listas
Persistencia en localStorage
Selección dinámica de lista
⚙️ Reglas de negocio implementadas
❌ No aplicar a viajes cancelados
❌ No aplicar a viajes ya iniciados
❌ No aplicar más de una vez al mismo viaje
❌ No cancelar viajes con menos de 7 días
✔ Manager solo gestiona sus propios viajes
✔ Explorer solo ve viajes activos
✔ Validación estricta en creación/edición
✔ Control completo de estados de application en UI
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
Cards interactivas (click en toda la tarjeta)
Estados dinámicos de aplicación (botones inteligentes)
Badges visuales
Countdown hasta inicio del viaje
Loader en pagos
Notificaciones en pantalla (sin alert)
Header dinámico por rol
Colores por dificultad:
🟢 Easy
🟠 Medium
🔴 Hard
🛡️ Guards y navegación
Implementación de canDeactivate
Evita pérdida de datos en formularios
Persistencia de sesión con localStorage
Protección frente a SSR (PayPal + localStorage)
🧪 Testing
Testing con Vitest
Test unitario del componente TripDisplay
Cobertura:
Renderizado
Aplicación a viajes
Filtros
Estados
🧱 Arquitectura
Angular Standalone Components
Signals para estado reactivo
Servicios desacoplados
Guards de navegación
Estructura modular:
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
📦 Instalación
npm install
npm start
🧠 Modelo de dominio

Relaciones:

Un Manager → múltiples Trips
Un Trip → múltiples Applications
Un Explorer → múltiples Applications
📌 Estado del proyecto

✔ Aplicación completamente funcional
✔ Roles correctamente implementados
✔ CRUD completo de trips
✔ Gestión completa de applications
✔ Sistema de favoritos
✔ Integración PayPal
✔ Validaciones y reglas de negocio
✔ Guards y persistencia
✔ UI/UX avanzada
✔ Testing básico

🏁 Autor

Alex García Lanero