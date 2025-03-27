#!/bin/bash

# Immediately exit if any command fails
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to log messages
log() {
    echo -e "${BLUE}📝 $1${NC}"
}

error() {
    echo -e "${RED}❌ $1${NC}"
    exit 1
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Check for required tools
log "Checking required tools..."
if ! command_exists "node"; then
    error "Node.js is required but not installed"
fi

# Determine package manager
if command_exists "yarn"; then
    PKG_MGR="yarn"
elif command_exists "npm"; then
    PKG_MGR="npm"
else
    error "Neither yarn nor npm is installed"
fi

log "Using package manager: $PKG_MGR"

# Initialize Git if not already initialized
if [ ! -d ".git" ]; then
    log "Initializing Git repository..."
    git init
fi

# Create .gitignore
log "Creating .gitignore..."
cat > .gitignore << EOL
node_modules/
dist/
.env
.env.local
coverage/
.DS_Store
*.log
.vite/
EOL

# Create .env.example
log "Creating .env.example..."
cat > .env.example << EOL
VITE_API_URL=http://localhost:3000
VITE_API_KEY=your_api_key_here
EOL

# Create package.json with modern configuration
log "Creating package.json..."
cat > package.json << EOL
{
  "name": "mix-it-fix-it",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "test": "vitest",
    "test:coverage": "vitest run --coverage",
    "lint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "format": "prettier --write \"src/**/*.{ts,tsx,css,md}\"",
    "preview": "vite preview",
    "validate": "npm-run-all --parallel test lint",
    "prepare": "husky install"
  }
}
EOL

# Install dependencies
log "Installing dependencies..."
$PKG_MGR add -D vite @vitejs/plugin-react typescript
$PKG_MGR add -D vitest @testing-library/react @testing-library/jest-dom
$PKG_MGR add -D eslint prettier eslint-config-prettier eslint-plugin-react-hooks @typescript-eslint/eslint-plugin
$PKG_MGR add -D husky lint-staged

# Create vite.config.ts
log "Creating vite.config.ts..."
cat > vite.config.ts << EOL
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      reporter: ['text', 'html'],
      exclude: ['node_modules/', 'src/test/setup.ts']
    }
  }
})
EOL

# Create ESLint config
log "Creating ESLint configuration..."
cat > .eslintrc.json << EOL
{
  "root": true,
  "env": {
    "browser": true,
    "es2020": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["react-refresh"],
  "rules": {
    "react-refresh/only-export-components": "warn",
    "max-lines-per-function": ["error", 20],
    "max-depth": ["error", 2]
  }
}
EOL

# Create Prettier config
log "Creating Prettier configuration..."
cat > .prettierrc << EOL
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 80,
  "trailingComma": "es5"
}
EOL

# Create sample test setup
log "Creating test setup..."
mkdir -p src/test
cat > src/test/setup.ts << EOL
import '@testing-library/jest-dom'
EOL

# Create README.md
log "Creating README.md..."
cat > README.md << EOL
# Mix It Fix It

## Getting Started

1. Clone this repository
2. Install dependencies: \`${PKG_MGR} install\`
3. Copy \`.env.example\` to \`.env\` and update values
4. Start development server: \`${PKG_MGR} run dev\`

## Available Scripts

- \`${PKG_MGR} run dev\`: Start development server
- \`${PKG_MGR} run build\`: Build for production
- \`${PKG_MGR} run test\`: Run tests
- \`${PKG_MGR} run lint\`: Lint code
- \`${PKG_MGR} run format\`: Format code

## Project Structure

\`\`\`
src/
  ├── components/    # React components
  ├── hooks/        # Custom hooks
  ├── services/     # Business logic
  ├── types/        # TypeScript types
  ├── utils/        # Utility functions
  └── test/         # Test setup
\`\`\`
EOL

# Create basic directory structure
log "Creating directory structure..."
mkdir -p src/{components,hooks,services,types,utils}

success "Project initialized successfully!"
echo -e "\nNext steps:"
echo "1. Copy .env.example to .env and update values"
echo "2. Run '${PKG_MGR} install' to install dependencies"
echo "3. Run '${PKG_MGR} run dev' to start development server"
