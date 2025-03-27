#!/bin/bash

echo "🔍 TypeScript Error Tracker"
echo "=========================="
echo "$(date)" > typescript_errors.log
echo "" >> typescript_errors.log

# Run TypeScript compiler in check mode and save errors
npx tsc --noEmit | grep -E "TS[0-9]+" > current_errors.tmp

# Compare with previous errors if they exist
if [ -f "previous_errors.tmp" ]; then
    echo "Changes since last check:" >> typescript_errors.log
    echo "" >> typescript_errors.log
    
    # Find resolved errors
    echo "✅ Resolved:" >> typescript_errors.log
    grep -Fxvf current_errors.tmp previous_errors.tmp | sed 's/^/  /' >> typescript_errors.log
    
    echo "" >> typescript_errors.log
    echo "❌ Remaining:" >> typescript_errors.log
    cat current_errors.tmp | sed 's/^/  /' >> typescript_errors.log
else
    echo "Initial errors:" >> typescript_errors.log
    cat current_errors.tmp | sed 's/^/  /' >> typescript_errors.log
fi

# Save current errors for next comparison
mv current_errors.tmp previous_errors.tmp

# Display current status
cat typescript_errors.log