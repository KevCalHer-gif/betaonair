# Comandos para levantar backend (CMD en Windows)

## 1. Iniciar contenedor PostgreSQL (si usas Docker)

```cmd
REM Navegar a la raíz del proyecto
cd C:\Users\...\betaonair
docker-compose up -d
```

## 2. Generar tipos de Payload (tras cambios en colecciones)

```cmd
npx cross-env NODE_OPTIONS=--no-deprecation payload generate:types
```

## 3. Iniciar servidor de desarrollo

```cmd
npx cross-env NODE_OPTIONS=--no-deprecation next dev
```

## 4. Abrir navegador

```
http://localhost:3000
```
