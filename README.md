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
- Autorización por roles: `usuario`, `moderador`, `admin`.

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
├── 📁 config          # Configuraciones generales (DB, JWT, Redis)
├── 📁 controllers     # Lógica de cada entidad (posts, auth, etc.)
├── 📁 middlewares     # Validaciones, autenticación, autorización
├── 📁 models          # Modelos Prisma (en prisma/schema.prisma)
├── 📁 routes          # Rutas agrupadas por recurso
├── 📁 services        # Lógica de negocio reutilizable
├── 📁 utils           # Funciones auxiliares
├── 📄 app.ts          # Entrada principal de la app Express
└── 📄 server.ts       # Inicializa servidor + WebSockets
```

---

## 🐳 Docker y Entorno

Este proyecto se ejecuta con Docker. Usa `docker-compose` para levantar todos los servicios:

### Servicios incluidos:
- `backend`: API Node + Express
- `postgres`: Base de datos
- `redis`: Cache en memoria
- `pgadmin`: Cliente web para PostgreSQL

### Comandos útiles:

```bash
# Levantar todos los servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Correr migraciones
npx prisma migrate dev

# Acceder a pgadmin en navegador
http://localhost:5050
```

---

## 🔐 Variables de entorno (.env)

Ejemplo:

```env
DATABASE_URL="postgresql://root:postgre@localhost:5432/blogdb"
SECRET_KEY="supersecreto"
PORT=3000
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

🚧 Documentación Swagger en proceso...  
🚧 Pruebas unitarias más adelante...

---

## 🧑‍💻 Autor

Proyecto desarrollado por **@UsopKing7**  
Con ❤️ por la comunidad, para seguir creciendo como fullstack