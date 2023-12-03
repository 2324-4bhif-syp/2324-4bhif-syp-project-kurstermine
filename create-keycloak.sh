docker run -p 8180:8080 \
        -e KEYCLOAK_ADMIN=admin \
        -e KEYCLOAK_ADMIN_PASSWORD=admin \
        quay.io/keycloak/keycloak:23.0.0 start-dev