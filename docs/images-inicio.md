# Imágenes de la página de inicio (/) y sus componentes

## En `src/components/sections/HeroSection.tsx`

| Archivo               | Ruta completa                           | Propósito                    |
|-----------------------|-----------------------------------------|------------------------------|
| logo.png              | `/logo.png`                             | Logo principal de Beta On Air |
| recuros-13.png        | `/recuros-13.png`                       | Sticker "Rayo" (esquina superior izquierda) |
| recuros-19.png        | `/recuros-19.png`                       | Sticker "YIIAAA" (esquina inferior derecha) |
| recuros-12.png        | `/recuros-12.png`                       | Sticker "Awesome" (esquina superior derecha) |

## En `src/app/(frontend)/page.tsx` (sección "Nuestros Programas")

Cada `ProgramCard` recibe la prop `logo`, que corresponde a:

| Programa            | Ruta                                       |
|---------------------|--------------------------------------------|
| Beta Kids           | `/images/programas/beta-kids.png`          |
| Piedra y Camino     | `/images/programas/piedra-y-camino.png`    |
| The Bronca Time     | `/images/programas/the-bronta-time.png`    |
| No Tan Calladitas   | `/images/programas/no-tan-calladitas.png`  |
| Yukast              | `/images/programas/yukast.png`             |

*(Datos hardcodeados en `page.tsx`, constante `programas`)*
