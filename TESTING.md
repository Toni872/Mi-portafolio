# Sistema de Testing Automático

Este proyecto incluye un sistema completo de testing automático que detecta errores, actualiza dependencias y mantiene la calidad del código.

## 🚀 Características

- ✅ **Tests Unitarios** con Jest y React Testing Library
- ✅ **CI/CD** con GitHub Actions
- ✅ **Actualización Automática** de dependencias
- ✅ **Pre-commit Hooks** con Husky
- ✅ **Linting y Type Checking** automático
- ✅ **Coverage Reports** para monitorear cobertura de código

## 📋 Scripts Disponibles

### Testing
```bash
# Ejecutar tests
npm test

# Tests en modo watch
npm run test:watch

# Tests con coverage
npm run test:coverage

# Tests para CI
npm run test:ci
```

### Validación
```bash
# Validación completa (lint + type-check + tests)
npm run validate

# Solo linting
npm run lint

# Solo type checking
npm run type-check
```

### Dependencias
```bash
# Verificar dependencias desactualizadas
npm run check-deps

# Actualizar dependencias automáticamente
npm run update-deps
```

## 🔧 Configuración

### Pre-commit Hooks

Los hooks de Husky ejecutan automáticamente:
- ESLint
- TypeScript type checking
- Tests básicos

### GitHub Actions

El workflow de CI/CD (`/.github/workflows/ci.yml`) ejecuta:

1. **Lint & Type Check**: Verifica código y tipos
2. **Tests**: Ejecuta suite completa de tests
3. **Build**: Verifica que la aplicación compile
4. **Security Audit**: Revisa vulnerabilidades
5. **Dependency Updates**: Verifica actualizaciones (diario)

## 📊 Coverage

El proyecto mantiene un umbral mínimo de cobertura:
- Branches: 50%
- Functions: 50%
- Lines: 50%
- Statements: 50%

## 🧪 Escribir Tests

### Ejemplo de Test de Componente

```typescript
import { render, screen } from '@testing-library/react'
import { MyComponent } from '@/components/MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
```

### Ejemplo de Test de Utilidad

```typescript
import { myFunction } from '@/lib/utils'

describe('myFunction', () => {
  it('returns expected value', () => {
    expect(myFunction('input')).toBe('expected')
  })
})
```

## 🔄 Actualización de Dependencias

### Verificación Manual
```bash
npm run check-deps
```

Esto genera un reporte en `dependency-updates.json` con todas las actualizaciones disponibles.

### Actualización Automática
```bash
npm run update-deps
```

Este script:
1. Crea backup de `package.json`
2. Actualiza dependencias menores y parches
3. Ejecuta tests después de actualizar
4. Verifica que el build funcione
5. Restaura backup si algo falla

## 🛡️ Prevención de Errores

El sistema previene errores mediante:

1. **Pre-commit**: Ejecuta lint y tests antes de cada commit
2. **Pre-push**: Ejecuta build y tests completos antes de push
3. **CI/CD**: Ejecuta validación completa en cada PR
4. **Type Checking**: Verifica tipos en cada validación

## 📝 Buenas Prácticas

1. **Escribe tests** para nuevas funcionalidades
2. **Mantén coverage** por encima del umbral mínimo
3. **Ejecuta `npm run validate`** antes de crear PRs
4. **Revisa dependencias** regularmente con `npm run check-deps`
5. **Actualiza dependencias** con cuidado usando `npm run update-deps`

## 🐛 Troubleshooting

### Tests fallan después de actualizar dependencias
- El script `update-deps` restaura automáticamente el backup
- Revisa los logs para identificar el problema
- Considera actualizar manualmente las dependencias problemáticas

### Pre-commit hooks no funcionan
```bash
npm run prepare
```
Esto reinstala los hooks de Husky.

### Coverage bajo
- Revisa el reporte en `coverage/lcov-report/index.html`
- Agrega tests para las áreas sin cobertura
- Considera ajustar el umbral en `jest.config.js` si es necesario

## 📚 Recursos

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Husky](https://typicode.github.io/husky/)

