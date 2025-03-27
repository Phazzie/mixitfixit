#!/bin/bash
echo "🔍 Analyzing Refactoring Progress..."
find src -type d -maxdepth 3
for system in phase state config validation logging cache api auth; do
  echo "$system: $(find src/$system/implementations -type f -name "*.ts" | wc -l) components"
done
