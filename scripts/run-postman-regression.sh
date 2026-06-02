#!/usr/bin/env bash

set -e

echo "Starting FitCall Postman regression suite..."

newman run postman/Personal-Trainer-Staging.postman_collection.json \
  -e postman/staging.postman_environment.json \
  --delay-request 1000 \
  --reporters cli,json \
  --reporter-json-export reports/latest-newman-report.json

echo "Regression run completed."
echo "JSON report saved to reports/latest-newman-report.json"