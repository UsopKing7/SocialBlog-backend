# 📝 Proyecto 3: Blog con Comentarios, Likes y Sistema de Moderación (Backend)

Este es un backend completo para un sistema de blog con funcionalidades avanzadas como comentarios, likes, moderación y control de roles. Está desarrollado con **Node.js**, **Express** y **TypeScript**, usando **PostgreSQL** como base de datos y **Prisma** como ORM.

---

## 🚀 Tecnologías principales

- **Node.js + Express** – Framework para servidor backend.
- **TypeScript** – Tipado estático para mayor robustez.
- **PostgreSQL** – Base de datos relacional.
- **Prisma ORM** – Modelado de datos y consultas seguras.
- **JWT** – Autenticación basada en tokens.
- **Socket.IO** – Comunicación en tiempo real (likes y comentarios).
- **Redis** – Cache para mejorar rendimiento.
- **Docker + docker-compose** – Entorno de desarrollo contenerizado.

---

## 📦 Funcionalidades principales

### 🧠 Autenticación y Autorización
- Registro y login con JWT.
- Middleware para proteger rutas.
- Autorización por roles: `usuario`, `admin`.

### ✍️ CRUD de Posts y Comentarios
- Crear, leer, actualizar y eliminar publicaciones.
- Crear y gestionar comentarios dentro de cada post.
- Solo el dueño puede editar o eliminar sus contenidos.

### ❤️ Sistema de Likes
- Dar y quitar likes en **posts** y **comentarios**.
- Prevención de múltiples likes por usuario.
- Likes polimórficos (pueden ser para post o comentario).

### 🛡️ Moderación
- Reportar comentarios ofensivos.
- Moderadores/Admins pueden:
  - Ver reportes.
  - Bloquear comentarios o usuarios.
  - Eliminar contenido ofensivo.

### 📡 Tiempo real (WebSockets)
- Notificaciones en tiempo real al recibir:
  - Nuevos likes.
  - Nuevos comentarios.

### 🔐 Roles y permisos personalizados
- Middleware para validar accesos según el rol.
- Rutas protegidas para admins/moderadores.

### 📃 Paginación y Filtros
- Paginación para posts y comentarios.
- Filtros por usuario, fecha, estado, etc.

### ⚡ Cache y Optimización
- Cacheo de conteo de likes y reportes con Redis.
- Mejora del rendimiento y reducción de carga en la base de datos.

---

## 🛠️ Estructura del Proyecto

```
📁 src
├── 📁 config         # Configuraciones globales (DB, JWT, Redis, etc.)
├── 📁 controllers    # Manejo de lógica de entrada (Request → Response)
├── 📁 middleware     # Autenticación, autorización y validaciones personalizadas
├── 📁 reports        # Lógica para reportes y moderación de contenido
├── 📁 repositories   # Abstracción de acceso a datos con Prisma
├── 📁 routes         # Definición de rutas agrupadas por entidad (posts, auth, etc.)
├── 📁 services       # Lógica de negocio reutilizable y desacoplada
├── 📁 socket         # Implementación de WebSockets con Socket.IO
├── 📁 test           # Pruebas automatizadas con Jest y Supertest
├── 📁 types          # Tipado global con TypeScript
├── 📁 utils          # Funciones auxiliares (helpers)
├── 📁 validation     # Validaciones con Zod y middlewares personalizados
├── 📄 app.ts         # Configuración principal de la app Express
└── 📄 server.ts      # Arranque del servidor + integración con WebSockets

```

---

## 🐳 Docker y Entorno

Este proyecto se ejecuta con Docker. Usa `docker-compose` para levantar todos los servicios:

### Servicios incluidos:
- `backend`: API Node + Express
- `postgres`: Base de datos
- `redis`: Cache en memoria

### para iniciar proyecto en docker:

```bash
# Levantar todos los servicios
docker compose up --build
```

---

## 🔐 Variables de entorno (.env) para docker

Ejemplo:

```env
DATABASE_URL="postgresql://root:postgres@db:5432/socialblog_backend"
SECRET_KEY="tuSecretKey"
PORT=3333
SAL=10
URL_REDIS="redis://redis:6379"
```

---

## 🧪 Testing 

El proyecto es compatible con Jest o Vitest para pruebas unitarias y de integración.

---


## 🧠 Estado actual

✅ Base del proyecto inicial  
✅ Autenticación con JWT  
✅ Sistema de roles y middleware  
✅ CRUD de posts y comentarios  
✅ Likes polimórficos  
✅ Reportes y sistema de moderación  
✅ WebSockets (likes y comentarios en tiempo real)  
✅ Docker funcionando con PostgreSQL y Redis  
✅ Pruebas unitarias más adelante...

---

# Contribución
Si deseas contribuir al proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una rama para tu funcionalidad o corrección:
  ```bash
  git checkout -b nombre-de-tu-rama
  ```
3. Realiza tus cambios y haz un commit:
  ```bash
  git commit -m "Descripción de los cambios"
  ```
4. Envía tus cambios al repositorio remoto:
  ```bash
  git push origin nombre-de-tu-rama
  ```
5. Crea un pull request.

## Soporte

Si tienes problemas al utilizar este script o tienes preguntas, no dudes en abrir un **issue** en el repositorio. Nos esforzamos por responder lo antes posible y ayudar a resolver cualquier inconveniente.

## Agradecimientos


## 🧑‍💻 Autor

Proyecto desarrollado por **@UsopKing7**  
Con ❤️ por la comunidad, para seguir creciendo como fullstack
Gracias por utilizar este proyecto. Si lo encuentras útil, ¡no dudes en dejar una estrella ⭐ en GitHub!