#!/bin/sh
set -e

echo "==> Creating storage and bootstrap cache directories..."
mkdir -p storage/logs storage/framework/cache storage/framework/sessions storage/framework/views bootstrap/cache
chmod -R 775 storage bootstrap/cache

echo "==> Copying .env.docker to .env..."
cp .env.docker .env

echo "==> Running composer install..."
composer install --no-interaction --optimize-autoloader --no-dev --ignore-platform-reqs

echo "==> Starting Laravel server..."
exec php artisan serve --host=0.0.0.0 --port=8000
