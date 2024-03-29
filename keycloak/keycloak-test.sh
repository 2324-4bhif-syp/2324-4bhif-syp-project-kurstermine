docker run -p 8180:8080 \
        --name keycloak-test \
        -e KEYCLOAK_ADMIN=admin \
        -e KEYCLOAK_ADMIN_PASSWORD=admin \
        -v .:/opt/keycloak/data/import \
        quay.io/keycloak/keycloak:23.0.0 start-dev --import-realm --spi-theme-static-max-age=-1 --spi-theme-cache-themes=false --spi-theme-cache-templates=false
