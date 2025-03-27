# Create scripts directory if it doesn't exist
mkdir -p scripts

# Copy the script content into files
cat > scripts/refactor_breakdown.sh << 'EOL'
#!/bin/bash
mkdir -p src/{phase,state,config,validation,logging,cache,api,auth}/{interfaces,implementations,tests}
touch src/phase/interfaces/IPhaseManager.ts
touch src/state/interfaces/IStateManager.ts
touch src/config/interfaces/IConfigManager.ts
touch src/validation/interfaces/IValidator.ts
touch src/logging/interfaces/ILogger.ts
touch src/cache/interfaces/ICacheManager.ts
touch src/api/interfaces/IApiClient.ts
touch src/auth/interfaces/IAuthManager.ts
EOL

cat > scripts/create_component.sh << 'EOL'
#!/bin/bash
system=$1
component=$2
mkdir -p src/$system/implementations/$component
touch src/$system/implementations/$component/$component.ts
touch src/$system/implementations/$component/$component.test.ts
touch src/$system/implementations/$component/types.ts
touch src/$system/implementations/$component/errors.ts
EOL

cat > scripts/analyze_refactor.sh << 'EOL'
#!/bin/bash
echo "🔍 Analyzing Refactoring Progress..."
find src -type d -maxdepth 3
for system in phase state config validation logging cache api auth; do
  echo "$system: $(find src/$system/implementations -type f -name "*.ts" | wc -l) components"
done
EOL

# Make scripts executable
chmod +x scripts/refactor_breakdown.sh
chmod +x scripts/create_component.sh
chmod +x scripts/analyze_refactor.sh

# Run the scripts in sequence
./scripts/refactor_breakdown.sh
./scripts/create_component.sh phase PhaseManager
./scripts/analyze_refactor.sh

# To run in Git Bash correctly, run these commands:
echo "To run the scripts, use these commands:"
echo "  bash scripts/refactor_breakdown.sh"
echo "  bash scripts/create_component.sh phase PhaseManager"
echo "  bash scripts/analyze_refactor.sh"
echo ""
echo "Or simply run this script with:"
echo "  bash \"# Create scripts directory if it doesn't.sh\""