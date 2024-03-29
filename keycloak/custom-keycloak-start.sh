docker run -p 8180:8080 \
        --name custom-keycloak-test \
        -e KEYCLOAK_ADMIN=admin \
        -e KEYCLOAK_ADMIN_PASSWORD=admin \
        custom-keycloak:latest start-dev --import-realm --spi-theme-static-max-age=-1 --spi-theme-cache-themes=false --spi-theme-cache-templates=false
