# La Vacación Blog

Tu guía de viajes por Europa y Alemania. Este blog está construido con [Eleventy](https://www.11ty.dev/) y migrado desde Ghost CMS.

## 🚀 Características

- **Estático y rápido**: Generado con Eleventy para máximo rendimiento
- **Responsive**: Diseño adaptable a todos los dispositivos
- **SEO optimizado**: Meta tags y estructura optimizada para buscadores
- **Imágenes optimizadas**: Solo las imágenes utilizadas se incluyen en el sitio
- **Deployment automático**: CI/CD con GitHub Actions

## 📁 Estructura del Proyecto

```
├── src/
│   ├── _includes/          # Plantillas y layouts
│   ├── posts/              # Artículos del blog en Markdown
│   ├── css/                # Estilos CSS
│   ├── images/             # Imágenes optimizadas
│   ├── index.njk           # Página de inicio
│   └── about.md            # Página acerca de
├── content/                # Contenido exportado de Ghost
├── .github/workflows/      # GitHub Actions para deployment
├── .eleventy.js            # Configuración de Eleventy
└── package.json            # Dependencias y scripts
```

## 🛠️ Desarrollo Local

### Prerrequisitos

- Node.js 18 o superior
- npm

### Instalación

1. Clona el repositorio:
```bash
git clone <tu-repositorio>
cd blog
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run serve
```

El sitio estará disponible en `http://localhost:8080`

## 📝 Scripts Disponibles

- `npm run build` - Construye el sitio para producción
- `npm run serve` - Inicia el servidor de desarrollo
- `npm run convert` - Convierte el export de Ghost a Markdown
- `npm run extract-images` - Extrae solo las imágenes utilizadas
- `npm run fix-images` - Corrige las rutas de las imágenes
- `npm run setup` - Ejecuta todo el proceso de conversión

## 🚀 Deployment

### GitHub Pages

El sitio se despliega automáticamente a GitHub Pages cuando se hace push a la rama `main`.

#### Configuración inicial:

1. Ve a Settings > Pages en tu repositorio de GitHub
2. Selecciona "GitHub Actions" como fuente
3. El workflow se ejecutará automáticamente en cada push

### Cloudflare Pages (Alternativa)

1. Conecta tu repositorio de GitHub a Cloudflare Pages
2. Configura los siguientes settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `_site`
   - **Node.js version**: `18`

## 📊 Migración desde Ghost

Este proyecto incluye scripts para migrar contenido desde Ghost CMS:

1. **Exporta tu contenido** desde Ghost Admin > Settings > Labs > Export
2. **Coloca el archivo JSON** en la carpeta `content/`
3. **Ejecuta la migración**:
```bash
npm run setup
```

### Lo que hace la migración:

- ✅ Convierte posts de HTML a Markdown
- ✅ Preserva metadatos (título, fecha, excerpt, tags)
- ✅ Extrae solo las imágenes utilizadas
- ✅ Corrige las rutas de las imágenes
- ✅ Mantiene la estructura de URLs

## 🎨 Personalización

### Estilos

Los estilos están en `src/css/style.css`. El diseño usa:
- Variables CSS para colores y espaciado
- Diseño responsive con CSS Grid y Flexbox
- Tipografía moderna con Inter font

### Plantillas

Las plantillas están en `src/_includes/`:
- `base.njk` - Layout principal
- `post.njk` - Layout para artículos individuales

### Configuración

La configuración de Eleventy está en `.eleventy.js` donde puedes:
- Añadir filtros personalizados
- Configurar colecciones
- Modificar el procesamiento de archivos

## 📈 SEO y Performance

- **Meta tags** optimizados para redes sociales
- **Imágenes lazy loading**
- **CSS minificado** en producción
- **URLs limpias** sin extensiones
- **Sitemap automático** generado por Eleventy

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Añade nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🌍 Sitio en Vivo

- **GitHub Pages**: `https://tu-usuario.github.io/blog`
- **Dominio personalizado**: Configurable en GitHub Pages settings

---

**La Vacación** - Tu guía de viajes por Europa y Alemania ✈️ 