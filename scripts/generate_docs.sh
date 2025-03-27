#!/bin/bash

# Generate markdown documentation for each component
for system in phase state config validation logging cache api auth; do
  # Create system documentation
  mkdir -p docs/$system
  
  # Generate main README
  cat > docs/$system/README.md << EOL
# ${system^} System Documentation

## Components
$(find src/$system/implementations -type d -mindepth 1 -maxdepth 1 -exec basename {} \; | sed 's/^/- /')

## Interfaces
$(find src/$system/interfaces -type f -name "*.ts" -exec basename {} \; | sed 's/^/- /')

## Implementation Details
EOL

  # Generate component docs
  for component in $(find src/$system/implementations -type d -mindepth 1 -maxdepth 1); do
    name=$(basename $component)
    cat > docs/$system/$name.md << EOL
# $name

## Purpose
TODO: Add component purpose

## Interface
\`\`\`typescript
$(cat src/$system/interfaces/I$name.ts)
\`\`\`

## Implementation
\`\`\`typescript
$(cat $component/$name.ts)
\`\`\`

## Tests
\`\`\`typescript
$(cat $component/$name.test.ts)
\`\`\`
EOL
  done
done