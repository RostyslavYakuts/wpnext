 # Use the official PHP image with FPM
FROM php:8.3-fpm

# Install necessary PHP extensions
RUN apt-get update && apt-get install -y --no-install-recommends \
    libzip-dev \
    libssl-dev \
    imagemagick \
    libmagickcore-6.q16-3-extra\
    libmagickwand-dev \
    curl \
    gnupg \
    unzip \
    cron \
    git \
    nodejs \
    npm \
    && docker-php-ext-install \
    pdo \
    pdo_mysql \
    mysqli \
    zip \
    gd \
        && pecl install imagick && docker-php-ext-enable imagick
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs
RUN npm install -g wrangler
# Install Xdebug
RUN pecl install xdebug && docker-php-ext-enable xdebug
# Install Composer globally
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
# Install msmtp and configure sendmail for MailHog
RUN apt-get install -y msmtp && \
    echo "defaults\naccount default\nhost mailhog\nport 1025\nauto_from on\n" > /etc/msmtprc && \
    chmod 600 /etc/msmtprc && \
    ln -s /usr/bin/msmtp /usr/sbin/sendmail
# Copy Xdebug configuration file
COPY docker/xdebug.ini /usr/local/etc/php/conf.d/xdebug.ini

# Set the working directory
WORKDIR /var/www/html