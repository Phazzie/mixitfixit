# PowerShell script to set up refactoring structure
Write-Host "🔨 Setting up refactoring directory structure..." -ForegroundColor Cyan

# Create base directories for each system
$systems = @('phase', 'state', 'config', 'validation', 'logging', 'cache', 'api', 'auth')
$folders = @('interfaces', 'implementations', 'tests')

foreach ($system in $systems) {
    foreach ($folder in $folders) {
        $path = "src\$system\$folder"
        New-Item -Path $path -ItemType Directory -Force | Out-Null
        Write-Host "✓ Created $path" -ForegroundColor Green
    }
}

# Create interface files
$interfaces = @{
    'phase'      = 'IPhaseManager'
    'state'      = 'IStateManager'
    'config'     = 'IConfigManager'
    'validation' = 'IValidator'
    'logging'    = 'ILogger'
    'cache'      = 'ICacheManager'
    'api'        = 'IApiClient'
    'auth'       = 'IAuthManager'
}

foreach ($system in $interfaces.Keys) {
    $interfacePath = "src\$system\interfaces\$($interfaces[$system]).ts"
    New-Item -Path $interfacePath -ItemType File -Force | Out-Null
    Write-Host "✓ Created interface: $interfacePath" -ForegroundColor Green
}

Write-Host "`n✅ Basic structure created successfully!" -ForegroundColor Green

# Function to create a new component
function New-Component {
    param(
        [Parameter(Mandatory = $true)]
        [string]$System,
        
        [Parameter(Mandatory = $true)]
        [string]$ComponentName
    )
    
    $componentPath = "src\$System\implementations\$ComponentName"
    New-Item -Path $componentPath -ItemType Directory -Force | Out-Null
    
    # Create component files
    $files = @(
        "$ComponentName.ts",
        "$ComponentName.test.ts",
        "types.ts",
        "errors.ts"
    )
    
    foreach ($file in $files) {
        New-Item -Path "$componentPath\$file" -ItemType File -Force | Out-Null
        Write-Host "✓ Created: $componentPath\$file" -ForegroundColor Green
    }
}

# Function to analyze refactoring progress
function Get-RefactoringProgress {
    Write-Host "`n🔍 Analyzing Refactoring Progress..." -ForegroundColor Cyan
    
    # Show directory structure
    Write-Host "`nDirectory Structure:" -ForegroundColor Yellow
    Get-ChildItem -Path "src" -Recurse -Directory | 
    Where-Object { $_.FullName -notmatch '\\node_modules\\' } |
    Select-Object -ExpandProperty FullName |
    ForEach-Object { $_.Replace($PWD.Path + "\", "") } |
    Write-Host
    
    # Count components per system
    Write-Host "`nComponents per System:" -ForegroundColor Yellow
    foreach ($system in $systems) {
        $componentCount = (Get-ChildItem -Path "src\$system\implementations" -Filter "*.ts" -Recurse -File | 
            Measure-Object).Count
        Write-Host "${system}: $componentCount components"
    }
}

# Create default PhaseManager component
New-Component -System "phase" -ComponentName "PhaseManager"

# Show progress
Get-RefactoringProgress

Write-Host "`n📚 Available Commands:" -ForegroundColor Cyan
Write-Host "To create a new component:" -ForegroundColor Yellow
Write-Host "  .\scripts\Refactor-Setup.ps1 -System <systemName> -ComponentName <componentName>"
Write-Host "`nTo analyze progress:" -ForegroundColor Yellow
Write-Host "  .\scripts\Refactor-Setup.ps1 -Analyze"
