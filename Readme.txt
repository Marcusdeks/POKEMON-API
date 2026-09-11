POKEDEX INTERACTIVA — SPA con Vue 3, TypeScript y Pinia
=========================================================

DESCRIPCION DEL PROYECTO
-------------------------
Aplicacion web tipo Pokedex desarrollada como proyecto de practica para consolidar
conocimientos en Vue 3 y su ecosistema. La aplicacion consume la PokeAPI (REST)
para mostrar informacion de Pokemon en tiempo real, permitiendo buscar, filtrar
por tipo y consultar estadisticas de combate de cada criatura.

El objetivo del proyecto fue aplicar buenas practicas de arquitectura frontend:
separacion de responsabilidades entre componentes, gestion de estado centralizada,
tipado estatico y consumo eficiente de una API externa mediante cacheo de datos.

FUNCIONALIDADES PRINCIPALES
-----------------------------
- Busqueda de Pokemon por nombre o numero de Pokedex.
- Filtrado dinamico por tipo (fuego, agua, planta, electrico, etc.).
- Paginacion de resultados (10 elementos por pagina) tanto en el listado general
  como en el listado filtrado por tipo.
- Visualizacion de variantes de sprite: normal, shiny y version femenina.
- Panel expandible con tipos y estadisticas base, consultado bajo demanda a la API.
- Cacheo de resultados en el store para evitar peticiones repetidas a la API.
- Interfaz totalmente responsive.

STACK TECNOLOGICO
--------------------
- Vue 3 (Composition API con <script setup>)
- TypeScript
- Vite como bundler y entorno de desarrollo
- Pinia para la gestion del estado global
- Axios para el consumo de la PokeAPI (REST)
- Tailwind CSS 4 para el diseño de la interfaz
- VueUse como libreria de utilidades de composicion

APRENDIZAJES CLAVE
---------------------
- Diseño de componentes reutilizables y comunicacion padre-hijo mediante props/eventos.
- Gestion de estado asincrono y cacheo con Pinia.
- Tipado de datos provenientes de una API externa con TypeScript.
- Integracion de Tailwind CSS en un flujo de trabajo con Vite.
- Consumo y normalizacion de datos de una API REST publica (PokeAPI).

-------------------------------------------------------------
Proyecto desarrollado con fines de aprendizaje y practica personal.
