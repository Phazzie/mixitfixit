#!/bin/bash
# Location: Place in project root as scripts/error_message_validator.sh
# Usage: ./scripts/error_message_validator.sh
# Run this when modifying error messages or error handling

echo "🔍 Validating Error Messages..."

# Check error message constants
echo "Checking error message constants..."
if [ -f "server/src/constants/errorMessages.ts" ]; then
    error_count=$(grep -c "'" "server/src/constants/errorMessages.ts")
    echo "Found $error_count error messages defined"
else
    echo "❌ Error message constants file missing"
fi

# Check error handlers
echo "Checking error handlers..."
handlers=$(find src -type f -exec grep -l "catch.*Error" {} \;)
echo "Found error handlers in:"
echo "$handlers"

# Validate error message usage
echo "Validating error message usage..."
unused_messages=$(grep -r "ERROR_MESSAGES" "server/src/constants" | grep -v "errorMessages.ts")
if [ -z "$unused_messages" ]; then
    echo "⚠️ No error message usage found"
fi