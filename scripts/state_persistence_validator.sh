#!/bin/bash
# Location: Place in project root as scripts/state_persistence_validator.sh
# Usage: ./scripts/state_persistence_validator.sh
# Run this when modifying state persistence logic

echo "💾 Validating State Persistence..."

# Check localStorage usage
echo "Checking localStorage implementation..."
storage_usage=$(find src -type f -exec grep -l "localStorage" {} \;)
echo "Found localStorage usage in:"
echo "$storage_usage"

# Validate state handlers
echo "Validating state handlers..."
state_handlers=$(find src -type f -exec grep -l "useState\|useReducer" {} \;)
echo "Found state handlers in:"
echo "$state_handlers"