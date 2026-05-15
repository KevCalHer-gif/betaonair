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

*Última actualización: 2026-05-14*
