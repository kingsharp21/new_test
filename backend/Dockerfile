FROM php:8.2-apache

RUN apt-get update -y && \
    apt-get install -y unzip libpq-dev libcurl4-gnutls-dev && \
    docker-php-ext-install pdo pdo_mysql bcmath

RUN pecl install -o -f redis && \
    rm -rf /tmp/pear && \
    docker-php-ext-enable redis

# Enable mod_rewrite for Laravel
RUN a2enmod rewrite

# Set the working directory
WORKDIR /var/www

# Copy application source
COPY . .

# Copy composer binary
COPY --from=composer:2.3.5 /usr/bin/composer /usr/bin/composer

# Install dependencies
RUN composer install --no-progress --no-interaction

# Set permissions for Laravel
RUN chown -R www-data:www-data /var/www && \
    chmod -R 755 /var/www/storage

# Set Apache DocumentRoot to Laravel's public directory
RUN sed -i 's!/var/www/html!/var/www/public!g' /etc/apache2/sites-available/000-default.conf

# Ensure entrypoint.sh is executable
RUN chmod +x /var/www/docker/entrypoint.sh

# Expose the port Laravel is running on
EXPOSE 80

# Set the entrypoint script
ENTRYPOINT ["/var/www/docker/entrypoint.sh"]
