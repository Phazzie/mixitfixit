#!/bin/bash

echo "🔍 Running TypeScript Error Tracker..."
./scripts/track_typescript_errors.sh

echo ""
echo "🧪 Running Tests..."
npm test

echo ""
echo "📝 Summary"
echo "=========="
echo "Check typescript_errors.log for error tracking details"
echo "Check coverage/lcov-report/index.html for test coverage details"