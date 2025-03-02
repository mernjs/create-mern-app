#!/bin/bash

# Your API Key
API_KEY=""

# Your dataset
dataset=(
    '{"name": "Snow Crash", "message": "Neal Stephenson", "date": "1992-06-01", "group_name": "IMC 2024"}'
    '{"name": "Revelation Space", "message": "Alastair Reynolds", "date": "2000-03-15", "group_name": "IMC 2024"}'
    '{"name": "1984", "message": "George Orwell", "date": "1985-06-01", "group_name": "IMC 2024"}'
    '{"name": "Fahrenheit 451", "message": "Ray Bradbury", "date": "1953-10-15", "group_name": "IMC 2024"}'
    '{"name": "Brave New World", "message": "Aldous Huxley", "date": "1932-06-01", "group_name": "IMC 2024"}'
    '{"name": "The Handmaid'\''s Tale", "message": "Margaret Atwood", "date": "1985-06-01", "group_name": "IMC 2024"}'
)

# Loop through the dataset and send each entry
for entry in "${dataset[@]}"; do
    curl --location 'https://asia-south1.gcp.elastic-cloud.com:443/messages/_doc' \
    --header "Authorization: ApiKey $API_KEY" \
    --header 'Content-Type: application/json' \
    --data "$entry"
done
