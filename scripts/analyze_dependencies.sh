#!/bin/bash

# Analyze component dependencies
echo "📊 Dependency Analysis"

for system in phase state config validation logging cache api auth; do
  echo -e "\n## $system System Dependencies"
  
  # Find all imports
  echo "### Imports:"
  grep -r "import.*from" src/$system | sort | uniq
  
  # Find circular dependencies
  echo -e "\n### Potential Circular Dependencies:"
  for file in $(find src/$system -type f -name "*.ts"); do
    for other in $(find src/$system -type f -name "*.ts"); do
      if [ "$file" != "$other" ]; then
        if grep -q "import.*from.*$(basename ${other%.*})" "$file" && \
           grep -q "import.*from.*$(basename ${file%.*})" "$other"; then
          echo "Circular: $file <-> $other"
        fi
      fi
    done
  done
done