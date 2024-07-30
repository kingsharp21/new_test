# Use the official PHP image with Apache
FROM php:8.2-apache

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    unzip \
    git \
    vim \
    curl \
    supervisor

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Set working directory
WORKDIR /app/backend

# Copy the existing application directory contents
COPY . .

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install project dependencies
RUN composer install

# Expose port 80
EXPOSE 80 

CMD ["php", "artisan", "serve", "--host=0.0.0.0"]
