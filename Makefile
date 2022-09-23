SHELL := /bin/bash

OS=$(shell uname)

PROJECT_SRC= $(PWD)/auction.project
PROJECT_INFRASTRUCTURE= $(PWD)/docker

include ${PROJECT_INFRASTRUCTURE}/.env

USER_UID=$(shell id -u)
USER_GID=$(shell id -g)

# set docker build environment based on env variable DOCKER_BUILD_ENVIRONMENT
DOCKER_COMPOSE_FILES=-f ${PROJECT_INFRASTRUCTURE}/docker-compose.yml
ifeq (${DOCKER_BUILD_ENVIRONMENT},DEV)
     DOCKER_COMPOSE_FILES=-f ${PROJECT_INFRASTRUCTURE}/docker-compose.yml  -f ${PROJECT_INFRASTRUCTURE}/docker-compose.dev.yml
endif


help:
	@echo ""
	@echo "usage: make COMMAND"
	@echo ""
	@echo "commands:"
	@echo "====================="
	@echo "  app-build                Create the docker containers and run composer install."
	@echo "  app-destroy              Destroy the docker containers and clean the application (composer and var)."
	@echo "  app-start                Start the docker containers."
	@echo "  app-restart              Restart the application."
	@echo "  app-stop                 Stop the docker containers."
	@echo "  app-restart              Stop and start the docker containers."
	@echo "  app-logs-access          Show application access logs."
	@echo "  app-logs-error           Show application error logs."
	@echo "  app-composer-install     Install composer dependencies."
	@echo "  app-composer-update      Update composer dependencies."
	@echo "  app-clean                Clean composer and var."
	@echo "  app-cache-clear          Clear symfony cache."
	@echo "  app-phpunit              Run command test phpunit."
	@echo "  app-custom-command       Run custom command inside of the web container (e.g.: make app-custom-command param=\"help\" )."
	@echo "  app-shell                Bash to web container."
	@echo "  app-shell-root           Bash to web container as root."
	@echo "  app-changes-user-role    Changes user role."
	@echo "  app-build-assets-prod    Rebuild assets in prod."
	@echo ""


#####################
### APPLICATION
#####################
app-build:
	@docker-compose ${DOCKER_COMPOSE_FILES} build

app-destroy:
	@docker-compose ${DOCKER_COMPOSE_FILES} down --remove-orphans -v

app-start: docker-start app-install-yarn app-watch-assets app-restart-cron

app-stop:
	@docker-compose ${DOCKER_COMPOSE_FILES} stop

app-restart: app-stop app-start

app-composer-install:
	@docker-compose ${DOCKER_COMPOSE_FILES} exec -u ${USER_UID} -T ${WEB_SERVICE} composer install --no-scripts

app-logs-dev:
	@docker-compose ${DOCKER_COMPOSE_FILES} exec -u ${USER_UID} -T ${WEB_SERVICE} tail -f var/log/dev.log

app-logs-access:
	@docker-compose ${DOCKER_COMPOSE_FILES} exec -u ${USER_UID} -T ${WEB_SERVICE} tail -f /var/log/apache2/access_log

app-logs-error:
	@docker-compose ${DOCKER_COMPOSE_FILES} exec -u ${USER_UID} -T ${WEB_SERVICE} tail -f /var/log/apache2/error_log

app-clean:
	@echo "Removing all composer and var files ..."
	@rm -rf ${PROJECT_SRC}/vendor
	@rm -rf ${PROJECT_SRC}/web/bundles
	@rm -rf ${PROJECT_SRC}/var/cache
	@rm -rf ${PROJECT_SRC}/var/installer
	@rm -rf ${PROJECT_SRC}/var/logs
	@rm -rf ${PROJECT_SRC}/var/sessions
	@rm -rf ${PROJECT_SRC}/var/classes/DataObject
	@rm -rf ${PROJECT_SRC}/var/config/debug-mode.php
	@rm -rf ${PROJECT_SRC}/var/config/system.php

app-composer-update:
	@docker-compose ${DOCKER_COMPOSE_FILES} exec -u ${USER_UID} -T ${WEB_SERVICE} composer update

app-cache-clear:
	@docker-compose ${DOCKER_COMPOSE_FILES} exec -u ${USER_UID} -T ${WEB_SERVICE} php bin/console cache:clear

app-changes-user-role:
	@docker-compose ${DOCKER_COMPOSE_FILES} exec -u ${USER_UID} -T ${WEB_SERVICE} php bin/console user:role

app-build-assets:
	@docker-compose ${DOCKER_COMPOSE_FILES} exec -u ${USER_UID} -T ${WEB_SERVICE} yarn encore dev

app-build-assets-prod:
	@docker-compose ${DOCKER_COMPOSE_FILES} exec -u ${USER_UID} -T ${WEB_SERVICE} yarn encore production

app-watch-assets:
	@docker-compose ${DOCKER_COMPOSE_FILES} exec -d -u ${USER_UID} -T ${WEB_SERVICE} yarn encore dev --watch

app-custom-command:
	@docker-compose ${DOCKER_COMPOSE_FILES} exec -u $(USER_UID) -T ${WEB_SERVICE} php bin/console $(param)

app-phpunit:
	@docker-compose ${DOCKER_COMPOSE_FILES} exec -u $(USER_UID) -T ${WEB_SERVICE} php bin/phpunit $(param)

app-shell:
	@docker-compose ${DOCKER_COMPOSE_FILES} exec -u $(USER_UID) ${WEB_SERVICE} /bin/bash

app-shell-root:
	@docker-compose ${DOCKER_COMPOSE_FILES} exec ${WEB_SERVICE} /bin/bash

db-shell-root:
	@docker-compose ${DOCKER_COMPOSE_FILES} exec ${DB_SERVICE} /bin/bash

app-install-yarn:
	@docker-compose ${DOCKER_COMPOSE_FILES} exec -u ${USER_UID} -T ${WEB_SERVICE} yarn install

app-restart-cron:
	@docker-compose ${DOCKER_COMPOSE_FILES} exec ${WEB_SERVICE} service cron restart

#####################
### DOCKER
#####################
docker-init:
	@if [ -z  $(shell docker ps -a -q) ]; then  \
		  echo "No docker container is running.";  \
	else  \
		  docker stop $(shell docker ps -a -q);  \
	fi

docker-start:
	@docker-compose ${DOCKER_COMPOSE_FILES} up -d

docker-images-destroy:
	@docker-compose ${DOCKER_COMPOSE_FILES} down --rmi all

docker-status:
	@docker ps
	@echo
	@echo '================================================='
	@echo 'DOCKER-SERVICE NAME'
	@docker-compose ${DOCKER_COMPOSE_FILES} config --service

docker-logs:
	@docker-compose ${DOCKER_COMPOSE_FILES} logs -f

docker-container-logs:
	@docker logs -f $(container)

docker-cli:
	@docker exec -u $(USER_UID) -it $(container) ${command}

docker-cli-root:
	@docker exec -it $(container) ${command}

.PHONY: help

.EXPORT_ALL_VARIABLES:
