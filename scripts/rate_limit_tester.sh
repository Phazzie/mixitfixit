#!/bin/bash
# Location: Place in project root as scripts/rate_limit_tester.sh
# Usage: ./scripts/rate_limit_tester.sh
# Run this when modifying rate limiting logic or before deployment

echo "🔄 Testing Rate Limiting..."

# Test rapid requests
echo "Testing rapid requests..."
for i in {1..5}; do
    curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/api/analyze
    sleep 1
done

# Check rate limit implementation
echo "Checking rate limit implementation..."
rate_files=$(find . -type f -exec grep -l "RateLimiter" {} \;)
echo "Found rate limiting in:"
echo "$rate_files"