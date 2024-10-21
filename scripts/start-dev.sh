KEYCLOAK_HOME=keycloak
BACKEND_HOME=backend
FRONTEND_HOME=frontend
POSTGRES_HOME=backend

pushd $KEYCLOAK_HOME
docker compose up -d
popd

pushd $POSTGRES_HOME
./postgres-start.sh
popd

pushd $BACKEND_HOME
quarkus dev --clean &
BACKEND_PID=$!
popd

pushd $FRONTEND_HOME
npm i
npm start &
FRONTEND_PID=$!
popd

echo "Press any key to stop"
read -n 1

pushd $POSTGRES_HOME
./postgres-stop.sh
popd

pushd $KEYCLOAK_HOME
docker compose down
popd

kill $BACKEND_PID
kill $FRONTEND_PID
