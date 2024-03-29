FROM quay.io/keycloak/keycloak:23.0.0

WORKDIR /opt/keycloak/themes/custom/login/resources/img
COPY keycloak-bg.png .

WORKDIR /opt/keycloak/themes/custom/login/resources/css
COPY styles.css .

WORKDIR /opt/keycloak/themes/custom/login
COPY theme.properties .

WORKDIR /opt/keycloak/data/import
COPY htl-realm.json .
