FROM php:8.4-cli-alpine

# Install system dependencies & PHP extensions (Alpine uses apk, lebih reliable di Docker Desktop macOS)
RUN apk add --no-cache \
    git \
    unzip \
    zip \
    libzip-dev \
    oniguruma-dev \
    postgresql-client \
    postgresql-dev \
    linux-headers \
    && docker-php-ext-install pdo pdo_mysql pdo_pgsql zip sockets pcntl

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . .

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

RUN mkdir -p storage/logs storage/framework/cache storage/framework/sessions storage/framework/views bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

EXPOSE 8000

ENTRYPOINT ["docker-entrypoint.sh"]
