# Café Cuauhtémoc — Aplicación móvil completa (14 pantallas)

Proyecto **independiente** desarrollado con **Ionic + Angular standalone + Capacitor**, siguiendo la misma estructura técnica de la versión `cafe-cuauhtemoc-auth-standalone-fixed-v2`.

No se debe copiar dentro de `my-app`. Abre esta carpeta directamente en VS Code.

## Requisitos
- Node.js 20 o 22
- npm
- Ionic CLI global (opcional, porque el proyecto también inicia con `npm start`)
- Android Studio, JDK y Android SDK para la etapa Android

## Ejecutar en VS Code / PowerShell

```powershell
cd C:\ruta\cafe-cuauhtemoc-mobile-completo
npm install
npm start
```

Luego abre:

```text
http://localhost:8100
```

La aplicación inicia en `/login`.

También puedes usar `INICIAR_PROYECTO.bat`.

## Las 14 pantallas
1. `/login` — Inicio de sesión
2. `/register` — Crear cuenta
3. `/home` — Inicio
4. `/store` — Tienda
5. `/product/pergamino` — Detalle del producto
6. `/cart` — Carrito
7. `/address` — Dirección de entrega
8. `/delivery` — Método de entrega
9. `/payment` — Método de pago
10. `/order-summary` — Resumen del pedido
11. `/order-success` — Compra exitosa
12. `/orders` — Mis pedidos
13. `/order-tracking` — Seguimiento de pedido
14. `/profile` — Mi perfil

## Flujo conectado

Login / Registro → Inicio → Tienda → Detalle → Carrito → Dirección → Entrega → Pago → Resumen → Compra exitosa → Seguimiento.

La barra inferior conecta Inicio, Tienda, Carrito y Perfil. Desde Perfil se accede a Mis pedidos, Direcciones y Métodos de pago.

El proyecto usa datos locales de demostración para que todo el recorrido pueda probarse sin backend. La futura API puede conectarse sustituyendo el estado local ubicado en:

```text
src/app/core/app-state.service.ts
```

## Referencias visuales

Las 14 capturas utilizadas como referencia están incluidas en:

```text
src/assets/reference/mockups/
```

## Preparar Android Studio

Después de verificar la app en navegador:

```powershell
npm run build
npm run android:add
npm run android:sync
npm run android:open
```

`android:add` solo debe ejecutarse una vez. También puedes ejecutar `PREPARAR_ANDROID.bat`, que comprueba si la carpeta `android` ya existe.

Cada vez que modifiques Angular antes de probar en Android:

```powershell
npm run android:sync
npm run android:open
```

## Nota

No se incluyen `node_modules` ni la carpeta Android generada para evitar un ZIP innecesariamente pesado y problemas por rutas/SDK diferentes entre equipos. Ambos se generan localmente con los comandos anteriores.
