# Guía de Commits y Workflow

## 🚀 Flujo de Trabajo con el Sistema de Testing

### 1. Hacer Cambios
```bash
# Edita tus archivos
# Los cambios se validarán automáticamente antes del commit
```

### 2. Hacer Commit
```bash
# Agregar archivos
git add .

# Hacer commit (los hooks ejecutarán automáticamente):
# - ESLint
# - Type Check
# - Tests básicos
git commit -m "feat: agregar nueva funcionalidad"
```

### 3. Push a GitHub
```bash
# Antes de push, se ejecutarán:
# - Build completo
# - Tests completos con coverage
git push origin main
```

### 4. Crear Pull Request
- GitHub Actions ejecutará automáticamente:
  - ✅ Lint & Type Check
  - ✅ Tests con coverage
  - ✅ Build verification
  - ✅ Security audit

## 📋 Convenciones de Commits

Usa mensajes descriptivos siguiendo [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: nueva funcionalidad
fix: corrección de bug
docs: cambios en documentación
style: formato, punto y coma faltante, etc.
refactor: refactorización de código
test: agregar o corregir tests
chore: tareas de mantenimiento
```

Ejemplos:
- `feat: agregar sistema de comentarios`
- `fix: corregir error en Hero component`
- `docs: actualizar README con instrucciones`
- `test: agregar tests para Button component`

## 🔍 Verificar Estado Antes de Commit

```bash
# Validación completa manual
npm run validate

# Solo linting
npm run lint

# Solo type check
npm run type-check

# Solo tests
npm test
```

## 🔄 Mantener Dependencias Actualizadas

```bash
# Verificar actualizaciones disponibles
npm run check-deps

# Actualizar automáticamente (con validación)
npm run update-deps

# Ver vulnerabilidades
npm audit
```

## ⚠️ Si los Hooks Fallan

Si un hook falla durante el commit:

1. **Revisa los errores** mostrados en la terminal
2. **Corrige los problemas**:
   - Errores de lint: `npm run lint:fix`
   - Errores de tipos: revisa los mensajes de TypeScript
   - Tests fallidos: corrige los tests o el código
3. **Vuelve a intentar el commit**

## 🛠️ Deshabilitar Hooks Temporalmente (No recomendado)

```bash
# Solo si es absolutamente necesario
git commit --no-verify -m "mensaje"
```

**Nota:** Esto omite todas las validaciones. Úsalo solo en casos excepcionales.

## 📊 Monitorear Coverage

```bash
# Generar reporte de coverage
npm run test:coverage

# Ver reporte HTML
# Abre: coverage/lcov-report/index.html
```

## 🔐 Seguridad

El sistema verifica automáticamente:
- Vulnerabilidades en dependencias
- Problemas de seguridad en el código
- Configuraciones inseguras

Ejecuta regularmente:
```bash
npm audit
npm run fix-vulnerabilities
```

