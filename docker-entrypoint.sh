#!/bin/sh
set -e

echo "==> Running composer install..."
composer install --no-interaction --optimize-autoloader --no-dev

echo "==> Starting Laravel server..."
exec php artisan serve --host=0.0.0.0 --port=8000
