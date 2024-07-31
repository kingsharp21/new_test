#!/bin/bash

if [ ! -f "vendor/autoload.php" ]; then
    composer install --no-progress --no-interaction
fi

if [ ! -f ".env" ]; then
    echo "Creating env file for env $APP_ENV"
    cp .env.example .env
else
    echo "env file exists."
fi

role=${CONTAINER_ROLE:-app}

# I am runing seeding because one of the news apis used didn't have category 
#so i decided to seed the db with some category first and use that to alocate category to articles

if [ "$role" = "app" ]; then
    php artisan migrate
    php artisan key:generate
    php artisan db:seed  
    php artisan scrape:news 
    php artisan serve --port=$PORT --host=0.0.0.0 --env=.env
    exec docker-php-entrypoint "$@"
elif [ "$role" = "queue" ]; then
    echo "Running the queue ... "
    php /var/www/artisan queue:work --verbose --tries=3 --timeout=180
