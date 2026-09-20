# Start all College Library microservices locally.
# Run from the AcademiaArchive root directory.

$root = $PSScriptRoot

Write-Host "Starting studentapp on port 8080..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\studentapp'; mvn spring-boot:run"

Start-Sleep -Seconds 5

Write-Host "Starting bookapp on port 8081..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\bookapp'; mvn spring-boot:run"

Start-Sleep -Seconds 5

Write-Host "Starting BookLendingApp on port 8082..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\BookLendingApp'; mvn spring-boot:run"

Start-Sleep -Seconds 5

Write-Host "Starting Library-Frontend on port 5173..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\Library-Frontend'; npm run dev"

Write-Host ""
Write-Host "All services are starting in separate windows."
Write-Host "  studentapp:        http://localhost:8080"
Write-Host "  bookapp:           http://localhost:8081"
Write-Host "  BookLendingApp:    http://localhost:8082"
Write-Host "  Library-Frontend:  http://localhost:5173"
Write-Host ""
Write-Host "Create an admin user after BookLendingApp is up:"
Write-Host '  POST http://localhost:8082/api/users/signup'
Write-Host '  Body: {"username":"admin","name":"Admin","email":"admin@library.com","password":"admin123","role":"ADMIN"}'
