# 🧪 Sistema de Testing Automático - Guía Rápida

## ⚡ Inicio Rápido

```bash
# Instalar dependencias de testing
npm install

# Configurar Husky (hooks de git)
npm run prepare

# Ejecutar validación completa
npm run validate
```

## 📦 Instalación Completa

### Windows (PowerShell)
```powershell
.\scripts\setup-testing.ps1
```

### Linux/Mac
```bash
chmod +x scripts/setup-testing.sh
./scripts/setup-testing.sh
```

## 🎯 Comandos Principales

| Comando | Descripción |
|---------|-------------|
| `npm test` | Ejecutar tests |
| `npm run validate` | Validación completa (lint + type-check + tests) |
| `npm run check-deps` | Verificar dependencias desactualizadas |
| `npm run update-deps` | Actualizar dependencias automáticamente |
| `npm run lint` | Ejecutar ESLint |
| `npm run type-check` | Verificar tipos TypeScript |

## 🔄 Flujo de Trabajo

### Antes de cada commit
Los hooks de Husky ejecutan automáticamente:
- ✅ Linting
- ✅ Type checking
- ✅ Tests básicos

### Antes de cada push
- ✅ Build completo
- ✅ Suite completa de tests
- ✅ Coverage report

### En CI/CD (GitHub Actions)
- ✅ Lint & Type Check
- ✅ Tests con coverage
- ✅ Build verification
- ✅ Security audit
- ✅ Dependency check (diario)

## 🛠️ Actualización de Dependencias

### 1. Verificar actualizaciones disponibles
```bash
npm run check-deps
```

### 2. Actualizar automáticamente (recomendado)
```bash
npm run update-deps
```

Este script:
- ✅ Crea backup automático
- ✅ Actualiza dependencias menores
- ✅ Ejecuta tests después de actualizar
- ✅ Verifica que el build funcione
- ✅ Restaura backup si algo falla

## 📊 Coverage

Ver reporte completo:
```bash
npm run test:coverage
# Abre coverage/lcov-report/index.html en el navegador
```

Umbral mínimo: **50%** en todas las métricas

## 🐛 Solución de Problemas

### Tests fallan después de actualizar
El script `update-deps` restaura automáticamente. Revisa los logs.

### Hooks no funcionan
```bash
npm run prepare
```

### Coverage bajo
1. Revisa el reporte: `coverage/lcov-report/index.html`
2. Agrega tests para áreas sin cobertura
3. Ejecuta: `npm run test:coverage`

## 📚 Documentación Completa

Ver `TESTING.md` para documentación detallada.

