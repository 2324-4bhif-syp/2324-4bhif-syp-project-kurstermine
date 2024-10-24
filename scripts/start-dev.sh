#!/usr/bin/env bash

KEYCLOAK_HOME=keycloak
BACKEND_HOME=backend
FRONTEND_HOME=frontend
POSTGRES_HOME=backend

pushd () {
    command pushd "$@" > /dev/null
}

popd () {
    command popd "$@" > /dev/null
}

mkdir -p logs

pushd $KEYCLOAK_HOME
docker compose up -d &> ../logs/keycloak.log
docker compose ls -q
popd

pushd $POSTGRES_HOME
./postgres-start.sh &> ../logs/postgres.log
pushd db-postgres
docker compose ls -q
popd
popd

pushd $BACKEND_HOME
quarkus dev --clean &> ../logs/backend.log &
BACKEND_PID=$!
echo "Backend: $BACKEND_PID"
popd

pushd $FRONTEND_HOME
npm start &> ../logs/frontend.log &
FRONTEND_PID=$!
echo "Frontend: $FRONTEND_PID"
popd

echo "Press any key to stop"
read -n 1
echo "Stopping..."

pushd $POSTGRES_HOME
./postgres-stop.sh &>> ../logs/postgres.log
popd

pushd $KEYCLOAK_HOME
docker compose down &>> ../logs/keycloak.log
popd

kill $BACKEND_PID
kill $FRONTEND_PID
