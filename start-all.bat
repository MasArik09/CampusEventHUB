@echo off
echo ===================================================
echo Memulai CampusEventHUB Microservices...
echo ===================================================

echo.
echo [1/6] Memulai Shared Infrastructure (RabbitMQ)...
docker compose -f docker-compose.shared.yml up -d

echo.
echo [2/6] Memulai User Service...
cd user-service
docker compose up -d
cd ..

echo.
echo [3/6] Memulai Event Service...
cd event-service
docker compose up -d
cd ..

echo.
echo [4/6] Memulai Registration Service...
cd registration-service
docker compose up -d
cd ..

echo.
echo [5/6] Memulai Notification Service...
cd notification-service
docker compose up -d
cd ..

echo.
echo Menunggu 15 detik agar Database MySQL siap...
timeout /t 15 /nobreak

echo.
echo Menjalankan Database Migrations...
docker exec user-service-app php artisan migrate --force
docker exec event-service-app php artisan migrate --force
docker exec registration-service-app php artisan migrate --force
docker exec notification-service-app php artisan migrate --force

echo.
echo [6/6] Memulai Frontend React (Buka tab baru jika ingin mematikan)...
cd frontend
npm install && npm run dev
