FROM php:7.3-apache-buster

ARG USER_UID
ARG USER_GID

# RUN useradd -r -u $USER_UID -g www-data www-data # ubuntu/centos

RUN usermod --non-unique --uid 1000 www-data
RUN groupmod -g 1000 www-data

RUN ln -sf /usr/share/zoneinfo/Europe/Kiev /etc/localtime
#RUN ln -sf /usr/share/zoneinfo/UTC /etc/localtime

# Configure Apache2
ADD apache2-additional.conf /etc/apache2/sites-enabled/ao-apache2-additional.conf

# install php postgres driver
RUN apt-get update && apt-get install -y --no-install-recommends \
	libzip-dev git zip \
	libpng-dev libjpeg-dev libfreetype6-dev \
#	default-libmysqlclient-dev libbz2-dev libmemcached-dev libsasl2-dev \
#	curl libicu-dev libjpeg-dev libmemcachedutil2 \
	&& docker-php-ext-configure zip --with-libzip \
	&& docker-php-ext-install zip pdo_mysql bcmath opcache \
	&& docker-php-ext-configure opcache --enable-opcache \
	&& docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ \
    && docker-php-ext-install gd
#	bz2 calendar iconv intl mbstring mysqli pdo_mysql \
#	&& apt-get purge -y --auto-remove default-libmysqlclient-dev libbz2-dev libmemcached-dev libsasl2-dev \
#	&& rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ \
    && docker-php-ext-install gd

RUN pecl install xdebug && docker-php-ext-enable xdebug

RUN pecl install apcu-5.1.18 && docker-php-ext-enable apcu
RUN echo "extension=apcu.so" > /usr/local/etc/php/php.ini
RUN echo "apc.enable_cli=1" > /usr/local/etc/php/php.ini
RUN echo "apc.enable=1" > /usr/local/etc/php/php.ini

RUN apt-get install -y nano mc cron

RUN curl -sS https://getcomposer.org/installer | php \
        && mv composer.phar /usr/local/bin/ \
        && ln -s /usr/local/bin/composer.phar /usr/local/bin/composer

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash \
	&& apt-get install -y nodejs \
	&& curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
	&& echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
	&& apt update && apt install yarn

ADD php-additional.dev.ini /usr/local/etc/php/conf.d/ao-dev-php-additional.ini

RUN mkdir /var/www/scripts
ADD run-command.sh /var/www/scripts

ADD crontab /var/spool/cron/crontabs/www-data

RUN chown -R www-data:www-data /var/www
RUN chmod +x /var/www/scripts/run-command.sh

RUN chown www-data:crontab /var/spool/cron/crontabs/www-data \
&& chmod 600 /var/spool/cron/crontabs/www-data \
&& service cron restart

RUN a2enmod rewrite

