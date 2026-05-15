# Acceso al administrador para gestionar usuarios y roles

## Requisitos
- Tener el servidor local en funcionamiento (`npm run dev`).
- Haber creado el primer usuario administrador durante el setup inicial.

## Pasos

1.  **Iniciar el proyecto**
    ```bash
    npm run dev
    ```
    (Si usas Docker, antes ejecuta `docker compose up -d` para levantar PostgreSQL.)

2.  **Abrir el administrador**
    Navega a [http://localhost:3000/admin](http://localhost:3000/admin)

3.  **Iniciar sesión**
    Usa las credenciales del primer usuario administrador (email y contraseña que definiste al ejecutar `npx create-payload-app`).

4.  **Crear un nuevo usuario**
    - En el panel izquierdo, haz clic en **Users** (Usuarios).
    - Haz clic en **Create New** (Crear nuevo).
    - Completa los campos:
      - **Email**: dirección de correo del nuevo usuario.
      - **Password**: contraseña.
      - **Role**: selecciona entre `admin`, `editor` o `viewer` (según corresponda).
    - Haz clic en **Save** (Guardar).

5.  **Asignar roles a usuarios existentes**
    - En el listado de **Users**, haz clic sobre el usuario que deseas modificar.
    - Cambia el campo **Role** al valor deseado.
    - Guarda los cambios.

## Notas sobre los roles definidos

| Role    | Permisos                                                                 |
|---------|--------------------------------------------------------------------------|
| admin   | Acceso completo: puede crear, editar, eliminar cualquier contenido y gestionar usuarios. |
| editor  | Puede crear y editar contenido (noticias, programas, episodios, etc.), pero **no** puede eliminar usuarios ni acceder a la configuración del sistema. |
| viewer  | Solo lectura del panel admin. Ideal para revisores que no deben modificar datos. |

## Restricciones de seguridad

- Solo un usuario con rol **admin** puede crear o modificar otros usuarios.
- El campo `role` es requerido y tiene valor por defecto `editor`.
- La configuración de acceso está definida en `src/collections/Users.ts`.
- No se permiten creaciones anónimas (debe haber sesión activa).

## Solución de problemas

### Error 403 al crear usuarios
Si recibes un error de permisos, asegúrate de haber iniciado sesión con una cuenta que tenga rol **admin**.

### No aparece la colección Users en el menú
Verifica que el archivo `src/collections/Users.ts` esté registrado en `src/payload.config.ts`. Si falta, añádelo al array `collections` y reinicia el servidor.

### No se guarda el rol
Revisa que el campo `role` esté definido con `required: true` y que las opciones `admin`, `editor` y `viewer` estén escritas exactamente como en el código.

---

## Diagnóstico CENTINELA — No se puede acceder a `/admin`

### Causas probables (orden de verificación)

1. **El servidor de desarrollo no está corriendo.**  
   Ejecuta `npm run dev` en la raíz del proyecto y espera a que aparezca `ready - started server on 0.0.0.0:3000`.

2. **La variable `PAYLOAD_SECRET` está vacía o no es segura.**  
   El archivo `.env` debe contener `PAYLOAD_SECRET` con al menos 32 caracteres.  
   Si está vacío, el servidor rechazará la autenticación del admin.  
   **Solución:** copia `.env.example` a `.env` y reemplaza `YOUR_SECRET_HERE` por una clave aleatoria (`openssl rand -hex 32` en terminal o usa un generador online).

3. **La base de datos PostgreSQL no está disponible.**  
   - Si usas Docker, ejecuta `docker compose up -d` y verifica con `docker ps`.  
   - Comprueba que la variable `DATABASE_URL` en `.env` coincida con `docker-compose.yml`  
     (por defecto: `postgresql://admin:localpass@localhost:5432/betaonair_db`).

4. **Error de compilación en `payload.config.ts` o en algún componente.**  
   La sección `components.views` está comentada, lo cual es correcto.  
   Sin embargo, cualquier error de sintaxis en `payload.config.ts` o en cualquiera de las colecciones importadas impedirá que el servidor compile.  
   **Solución:** ejecuta `npm run dev` y lee los errores en la terminal. Si ves un error de importación o tipo, corrígelo.

5. **El archivo `src/app/(payload)/admin/[[...segments]]/page.tsx` intenta importar `config` desde `@payload-config`.**  
   El alias `@payload-config` está definido en `tsconfig.json` y apunta a `./src/payload.config.ts`.  
   Si este alias falta o está mal definido, Next.js no podrá resolver la ruta y la página `/admin` fallará en el servidor.  
   **Verificación:** revisa que `tsconfig.json` contenga `"@payload-config": ["./src/payload.config.ts"]`.

6. **Problema con el puerto 3000 ya ocupado.**  
   Ejecuta `netstat -ano | findstr :3000` (Windows) o `lsof -i :3000` (Mac/Linux).  
   Si hay otro proceso usando el puerto, detenlo o usa otro puerto con `npm run dev -- --port 3001`.

### Pasos recomendados

1. Abre una terminal en la raíz del proyecto.
2. Ejecuta `npm run dev` y espera a que aparezca `ready`.
3. Abre `http://localhost:3000/admin`.
4. Si aún no cargas, comparte aquí los mensajes de error que aparecen en la terminal.

Si el problema persiste después de revisar todos los puntos anteriores, se requiere una revisión más profunda de `payload.config.ts` y de las colecciones.

---

*Última actualización: 2026-05-14*
