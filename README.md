# Viajechucu

> Planificá viajes en grupo, sin el caos.

**Viajechucu** es una Progressive Web App (PWA) para planificar viajes grupales de forma colaborativa. Cada miembro puede proponer actividades, votar las del grupo, confirmar asistencia y ver el plan día a día — todo en tiempo real.

---

## ¿Qué problema resuelve?

Organizar un viaje en grupo termina siempre en el mismo caos: mil mensajes de WhatsApp, ideas que se pierden, nadie sabe quién confirmó qué. Viajechucu centraliza todo en un solo lugar.

---

## Features del MVP

| Feature | Detalle |
|---------|---------|
| **Auth con Google** | Login con un toque, sin contraseñas |
| **Crear o unirse a un viaje** | El admin genera un código de 6 caracteres para invitar al grupo |
| **Proponer actividades** | Título, lugar (autocomplete OpenStreetMap), día, hora, costo y notas |
| **Plan día a día** | Vista del itinerario organizada por fecha, generada desde las fechas del viaje |
| **Votar actividades** | Sistema de votos con barra de interés del grupo en tiempo real |
| **RSVP** | Confirmá Voy / Tal vez / No voy, persistido por usuario en Firestore |
| **Detalle de actividad** | Proposer, votantes, notas, y opción de eliminar (solo admin) |
| **Gestión de grupo** | Roles admin/miembro, expulsar miembros, código de invitación |
| **Mapa real** | Google Maps integrado con el destino del viaje |
| **Feed de movimientos** | Las últimas propuestas del grupo en la pantalla principal |
| **Salir del viaje** | Con manejo de edge cases (último miembro elimina el viaje) |
| **PWA instalable** | Funciona offline, instalable en Android e iOS |

---

## Stack técnico

```
Frontend   →  React 18 (CDN, sin build step) + Babel standalone
Backend    →  Firebase Auth + Firestore
Mapas      →  Google Maps Embed API
PWA        →  Service Worker (network-first) + Web App Manifest
Íconos     →  PNG generados con Python stdlib (sin dependencias externas)
```

**Sin bundler. Sin npm. Sin servidor propio.** Todo corre en el browser directamente desde archivos estáticos.

---

## Arquitectura

```
index.html
├── firebase.js       — inicialización Firebase + todas las funciones de DB
├── screens.jsx       — todos los componentes React (~2000 líneas)
│   ├── Screen0_Login
│   ├── ScreenNewTrip  — crear o unirse
│   ├── Screen1_Trips  — home con feed y trip card
│   ├── Screen2_Plan   — plan por días
│   ├── Screen3_TypePick / Screen4_Form  — flujo de propuesta
│   ├── Screen7_Profile
│   ├── Screen8_Group
│   ├── Screen9_ActivityDetail
│   └── ScreenMap
├── app.jsx           — router por estado (useState)
└── sw.js             — service worker con caché network-first
```

### Decisiones técnicas destacadas

- **Router por string**: `useState('home')` en lugar de React Router — cero dependencias, navegación limpia con `navParams`.
- **Sin `orderBy` en Firestore**: evita índices compuestos. El sorting se hace client-side.
- **Votos como mapa**: `votes: { [uid]: true }` — cada usuario escribe su propia clave, sin race conditions ni transacciones.
- **Actualizaciones optimistas**: votos y RSVP actualizan el estado local primero y hacen rollback si Firestore falla.
- **`referrerPolicy="no-referrer"`** en `<img>` para que las fotos de Google carguen correctamente.

---

## Modelo de datos (Firestore)

```
trips/{tripId}
  ├── name, destination, startDate, endDate
  ├── inviteCode (6 chars)
  ├── memberIds: [uid, ...]
  ├── members: { [uid]: { name, photoURL, role, joinedAt } }
  └── activities/{actId}
        ├── title, place, day (ISO), time, cost, notes, icon, color
        ├── proposer: { uid, name, photoURL }
        ├── votes:    { [uid]: true }
        └── rsvp:     { [uid]: 'going' | 'maybe' | 'notgoing' }
```

---

## Instalación PWA

La app detecta el contexto automáticamente:

- **Android / Chrome** → botón "Instalar" que dispara el prompt nativo del browser
- **iOS / Safari** → instrucciones: _Compartir ⬆ → Añadir a pantalla de inicio_
- **Ya instalada** → el banner desaparece solo

---

## Autor

**[@locomaldelcoco](https://github.com/locomaldelcoco)** — construido de 0 con IA como copilot de desarrollo.

*Porque para el próximo viaje grupal, ya no quiero armar otro grupo de WhatsApp.*
