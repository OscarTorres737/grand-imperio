# Datos iniciales — Grand Imperio

Una vez configuradas las credenciales reales de Firebase en `src/environments/environment.ts`
y desplegadas las reglas (`firebase deploy --only firestore:rules`), carga estos documentos
desde el **panel `/admin`** (con un usuario `admin` ya creado, ver más abajo) o directamente
desde la consola de Firestore.

## 1. Crear el primer usuario admin

Esto NO se puede hacer desde el panel (huevo y gallina: el panel requiere estar logueado).
Pasos:

1. Firebase Console → **Authentication** → Add user → crea el correo/contraseña del primer admin.
2. Copia el **UID** generado.
3. Firebase Console → **Firestore** → colección `users` → documento con ID = ese UID:
   ```json
   {
     "email": "admin@grandimperio.com",
     "displayName": "Administrador",
     "role": "admin",
     "createdAt": <timestamp>
   }
   ```
4. Entra a `/admin/login` con ese correo y contraseña. Desde ahí ya puedes asignar roles
   a más personas (pestaña **Usuarios**) sin volver a tocar la consola.

## 2. Paquetes de ejemplo (colección `packages`)

| name | basePersonCount | basePrice | pricePerExtraPerson | maxPersonCount | featured | includes |
|---|---|---|---|---|---|---|
| Paquete Clásico | 100 | 13000 | 130 | 250 | false | Salón Terraza Imperial, Mobiliario básico, 4 horas de evento, Limpieza incluida |
| Paquete Imperial | 150 | 22000 | 145 | 400 | true | Salón Principal, Mobiliario premium, Iluminación decorativa, 6 horas de evento, Coordinador de evento |
| Paquete VIP | 80 | 16000 | 160 | 150 | false | Salón VIP, Mobiliario premium, Barra de bebidas, 5 horas de evento |

`order`: 0, 1, 2 respectivamente. `active: true`. `imageUrl`: usa fotos reales del venue.

## 3. Proveedores de ejemplo (colección `suppliers`)

| name | category | priceFrom | priceTo | phone |
|---|---|---|---|---|
| Banquetes Real | banquetes | 250 | 450 | 8112345678 |
| Bar Premium Express | alcohol | 8000 | 18000 | 8112345679 |
| Mariachi Imperial | grupos | 4500 | null | 8112345680 |
| DJ Eclipse | dj | 6000 | 12000 | 8112345681 |
| Sonido & Luces MX | musica | 5000 | 9000 | 8112345682 |
| Animación Total | animador | 3500 | 7000 | 8112345683 |

`order` incremental, `active: true`, `description` y `imageUrl` a criterio del cliente.

Todo esto también se puede capturar directamente desde **`/admin` → Paquetes / Proveedores**
una vez que el primer admin tenga acceso — los formularios ya validan y guardan en Firestore.
