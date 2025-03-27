#!/bin/bash
# Location: Place in project root as scripts/dev_helper.sh
# Usage: ./scripts/dev_helper.sh
# Run this during development to continuously validate changes

echo "🔧 Development Helper Starting..."

# Check required tools
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required"
    exit 1
fi

# Monitor critical files
echo "👀 Monitoring critical files..."
critical_paths=(
    "src/hooks/useErrorHandler.js"
    "src/services/ai/generation/RateLimiter.ts"
    "shared/errors/ErrorHandler.ts"
)

for path in "${critical_paths[@]}"; do
    if [ -f "$path" ]; then
        echo "✓ Found: $path"
    else
        echo "❌ Missing: $path"
    fi
done

# Run all validation scripts
echo "🏃 Running validation suite..."
./scripts/error_message_validator.sh
./scripts/rate_limit_tester.sh
./scripts/state_persistence_validator.sh
