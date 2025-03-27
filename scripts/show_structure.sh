#!/bin/bash

echo "🔍 Mix It Fix It - Project Structure"
echo "=================================="

# Core directories
echo -e "\n📁 Core Directories:"
echo "├── client"
echo "├── server"
echo "├── shared"
echo "├── docs"
echo "└── scripts"

# Client structure
if [ -d "./client/src" ]; then
    echo -e "\n📁 Client Source:"
    echo "└── src"
    find ./client/src -type d \
        ! -path "./client/src" \
        ! -path "*/node_modules*" \
        ! -path "*/dist*" \
        2>/dev/null \
        | sed 's/\.\/client\/src\//    /' \
        | sed 's/[^-][^\/]*\//├── /g' \
        | sed 's/^/    /'
fi

# Server structure
if [ -d "./server/src" ]; then
    echo -e "\n📁 Server Source:"
    echo "└── src"
    find ./server/src -type d \
        ! -path "./server/src" \
        ! -path "*/node_modules*" \
        ! -path "*/dist*" \
        2>/dev/null \
        | sed 's/\.\/server\/src\//    /' \
        | sed 's/[^-][^\/]*\//├── /g' \
        | sed 's/^/    /'
fi

# Key files
echo -e "\n📄 Key Files:"
echo "├── package.json"
echo "├── tsconfig.json"
echo "├── jest.config.js"
echo "├── refactoring_guide.md"
echo "├── refactoring_master_plan.md"
echo "└── testing_guide.md"


