# Instrucciones para Deploy en Vercel

## Problemas Corregidos

Se han corregido los siguientes problemas en la configuración:

1. **Variable de entorno inconsistente**: Ahora tanto `.env` como `server.js` usan `MONGO_URI_SIMULADOR`
2. **Nombre de la base de datos**: Se especifica explícitamente `dbName: "test"` en la conexión
3. **Nombre de la colección**: Se corrigió el typo de "simulasions" a "simulacions" en el modelo

## Pasos para Deploy en Vercel

### 1. Configurar Variables de Entorno en Vercel

1. Ve a tu proyecto en Vercel
2. Haz clic en **Settings** → **Environment Variables**
3. Agrega la siguiente variable:
   - **Name**: `MONGO_URI_SIMULADOR`
   - **Value**: `mongodb+srv://agusbulacio1803_db_user:simulador2026@cluster0.d0vcvlk.mongodb.net/test?appName=Cluster0`
   - **Environments**: Selecciona todos (Production, Preview, Development)

### 2. Hacer Push de los Cambios

```bash
git add .
git commit -m "Corregir configuración de MongoDB para Vercel"
git push origin main
```

### 3. Verificar el Deploy

Una vez que Vercel haga el deploy automático:

1. Prueba la ruta raíz: `https://tu-proyecto.vercel.app/`
   - Debería mostrar: "Servidor funcionando en Vercel 🚀"

2. Prueba el endpoint de debug: `https://tu-proyecto.vercel.app/api/debug`
   - Debería mostrar el estado de conexión a MongoDB

3. Prueba el historial: `https://tu-proyecto.vercel.app/api/simulacion/historial`
   - Debería devolver un array vacío `[]` si no hay datos, o las simulaciones guardadas

## Configuración Actual

### Base de Datos
- **Database**: `test`
- **Colección**: `simulacions`
- **Variable de entorno**: `MONGO_URI_SIMULADOR`

### Endpoints Disponibles
- `GET /` - Mensaje de bienvenida
- `GET /api/debug` - Información de debug de la conexión
- `GET /api/simulacion` - Información de rutas disponibles
- `POST /api/simulacion` - Ejecutar simulación
- `GET /api/simulacion/historial` - Ver historial de simulaciones

## Notas Importantes

1. **No subas el archivo `.env` a Git** - Ya está en `.gitignore`
2. Las variables de entorno deben configurarse **solo en Vercel**
3. Si cambias la contraseña de MongoDB, actualiza la variable en Vercel
4. El `dbName: "test"` está hardcodeado en el código, lo cual está bien ya que esa es tu base de datos

## Solución de Problemas

Si todavía tienes errores:

1. Verifica que la variable `MONGO_URI_SIMULADOR` esté correctamente configurada en Vercel
2. Revisa los logs de Vercel para ver errores específicos
3. Prueba el endpoint `/api/debug` para ver el estado de la conexión
4. Asegúrate de que tu IP esté whitelisteada en MongoDB Atlas (para desarrollo local)