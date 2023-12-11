docker run -p 8180:8080 \
        --name keycloak \
        -e KEYCLOAK_ADMIN=admin \
        -e KEYCLOAK_ADMIN_PASSWORD=admin \
        -v .:/opt/keycloak/data/import \
        quay.io/keycloak/keycloak:23.0.0 start-dev --import-realm