FROM quay.io/keycloak/keycloak:23.0.0 as builder

ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true

ENV KC_DB=postgres

RUN /opt/keycloak/bin/kc.sh build

FROM quay.io/keycloak/keycloak:23.0.0

COPY --from=builder /opt/keycloak/ /opt/keycloak/

# default entrypoint