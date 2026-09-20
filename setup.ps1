# Install dependencies and build all College Library repositories.
# Run from the AcademiaArchive root directory.

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot

function Copy-ConfigIfMissing($servicePath, $configFile) {
    $example = Join-Path $servicePath "$configFile.example"
    $target = Join-Path $servicePath $configFile
    if ((Test-Path $example) -and -not (Test-Path $target)) {
        Copy-Item $example $target
        Write-Host "Created $target from example"
    }
}

Copy-ConfigIfMissing "$root\studentapp\src\main\resources" "application.properties"
Copy-ConfigIfMissing "$root\bookapp\src\main\resources" "application.properties"
Copy-ConfigIfMissing "$root\BookLendingApp\src\main\resources" "application.properties"
Copy-ConfigIfMissing "$root\Library-Frontend" ".env"

Write-Host "Building studentapp..."
Push-Location "$root\studentapp"
mvn -q -DskipTests package
Pop-Location

Write-Host "Building bookapp..."
Push-Location "$root\bookapp"
mvn -q -DskipTests package
Pop-Location

Write-Host "Building BookLendingApp..."
Push-Location "$root\BookLendingApp"
mvn -q -DskipTests package
Pop-Location

Write-Host "Installing Library-Frontend dependencies..."
Push-Location "$root\Library-Frontend"
npm install
Pop-Location

Write-Host ""
Write-Host "Setup complete."
Write-Host "Run .\start-all.ps1 to launch all services."
