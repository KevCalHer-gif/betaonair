# ACCESO AL ADMINISTRADOR DE BETA ON AIR

**URL del sitio en desarrollo (local):**  
`http://localhost:3000/admin`

**URL del sitio en producción (si está desplegado):**  
La misma que el dominio público seguido de `/admin`.  
Por ejemplo: `https://betaonair.com/admin`

**Requisitos previos:**
1. El servidor de Payload debe estar corriendo.
2. Debe existir al menos un usuario administrador registrado.

**Credenciales predeterminadas (solo locales, según configuración inicial):**
- **Email:** `admin@betaonair.com` (o el que corresponda según la creación del primer usuario)
- **Contraseña:** la que se haya definido durante la ejecución de `npx payload`.

**Si no hay usuario administrador (entorno local):**  
Ejecutar en la terminal (desde la raíz del proyecto):

```bash
npx payload create-user
```

Seguir las instrucciones: ingresar email, contraseña y seleccionar rol `admin`.

**Si el entorno es de producción y no recuerdas las credenciales:**  
Contactar con quien realizó el deploy o restablecer mediante la función de Payload desde la terminal:

```bash
npx payload reset-password
```

**Recomendación:**  
Una vez dentro del panel, revisa `Settings` y `SEO` en el menú global (si están configurados).  
Para ver las métricas, el Dashboard personalizado está disponible en la ruta `/admin/dashboard`.

**Problemas comunes:**
- Si aparece "Not authorized", verifica que el usuario tenga rol `admin`.
- Si el panel no carga, asegúrate de que el servidor esté corriendo (`npm run dev` en local; proceso pm2/systemd en producción).
- Si aparece un error de CORS, puede estar bloqueado el proxy inverso (Nginx).
