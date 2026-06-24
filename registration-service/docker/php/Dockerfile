FROM php:8.3-fpm-alpine

RUN apk add --no-cache \
    git \
    unzip \
    zip \
    curl \
    libzip-dev \
    postgresql-dev \
    rabbitmq-c-dev \
    linux-headers \
    $PHPIZE_DEPS \
    && docker-php-ext-install pdo pdo_mysql pdo_pgsql zip sockets pcntl \
    && pecl install amqp \
    && docker-php-ext-enable amqp

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www
