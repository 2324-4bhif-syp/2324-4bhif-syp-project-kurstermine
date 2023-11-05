#!/usr/bin/env bash
pushd backend
  ./mvnw clean package
  ls -l target
popd

mkdir -p dist
cp backend/target/*-runner.jar dist/courseschedule.jar
ls -l dist