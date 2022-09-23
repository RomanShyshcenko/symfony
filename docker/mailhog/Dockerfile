ARG DOCKER_REPO_URL=registry.hub.docker.com
ARG MAILHOG_DOCKERIMAGE=mailhog/mailhog
FROM $DOCKER_REPO_URL/$MAILHOG_DOCKERIMAGE as PROD

FROM PROD as DEV

FROM DEV as REVIEW

RUN ln -sf /usr/share/zoneinfo/Europe/Kiev /etc/localtime
#RUN ln -sf /usr/share/zoneinfo/UTC /etc/localtime