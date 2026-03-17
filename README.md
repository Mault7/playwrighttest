# Playwright Practice

Proyecto listo para practicar Playwright con una app web simple (sin frameworks) y un servidor Node local. Todo el setup de pruebas esta en TypeScript.

## Requisitos

- Node.js 18+ recomendado

## Instalacion

```bash
npm install
npx playwright install
```

## Ejecutar tests

```bash
npm test
```

## UI de pruebas

```bash
npm run test:ui
```

## Codegen

```bash
npm run codegen
```

## Estructura

- `site/` app web para practicar
- `tests/` tests en TypeScript
- `server.js` servidor estatico
- `playwright.config.ts` configuracion
- `tsconfig.json` configuracion TS

## Jenkins

El proyecto de Jenkins quedo en la carpeta `jenkins/`.

## Ideas de practica

- Probar filtros: activos, hechos, todos
- Probar borrar completadas
- Probar el boton "Cargar tareas demo"
- Usar assertions sobre el contador de tareas
