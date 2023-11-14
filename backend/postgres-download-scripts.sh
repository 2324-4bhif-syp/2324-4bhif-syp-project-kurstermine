#!/bin/bash
FILE="./src/main/docker/docker-compose-postgres.yml"
if [ ! -f "$FILE" ]; then
	curl http://edufs.edu.htl-leonding.ac.at/~t.stuetz/download/nvs/scripts/postgres/download/docker-compose-postgres.yml \
		 -o ./src/main/docker/docker-compose-postgres.yml \
		 --create-dirs
fi

curl http://edufs.edu.htl-leonding.ac.at/~t.stuetz/download/nvs/scripts/postgres/download/postgres-create-db.sh -o postgres-create-db.sh
curl http://edufs.edu.htl-leonding.ac.at/~t.stuetz/download/nvs/scripts/postgres/download/postgres-run-in-docker.sh -o postgres-run-in-docker.sh
curl http://edufs.edu.htl-leonding.ac.at/~t.stuetz/download/nvs/scripts/postgres/download/postgres-start.sh -o postgres-start.sh
curl http://edufs.edu.htl-leonding.ac.at/~t.stuetz/download/nvs/scripts/postgres/download/postgres-stop.sh -o postgres-stop.sh
curl http://edufs.edu.htl-leonding.ac.at/~t.stuetz/download/nvs/scripts/postgres/download/application.properties -o application.properties
curl http://edufs.edu.htl-leonding.ac.at/~t.stuetz/download/nvs/scripts/postgres/download/datasource.txt -o datasource.txt
chmod +x ./postgres-create-db.sh
chmod +x ./postgres-run-in-docker.sh
chmod +x ./postgres-start.sh
chmod +x ./postgres-stop.sh
