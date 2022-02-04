#!/usr/bin/env bash
##
## This script downloads the developer certificate of the extension from marketplace.
##
(
    cd "$(dirname "$0")/.." || exit
    set -euo pipefail

    # Input parameters
    pat=$1
    publisher=$2
    extension=$3
    output_file=$4

    # Prepare request
    pat_b64=$(echo -n ":$pat" | base64)
    version="0.0.2"
    url="https://marketplace.visualstudio.com/_apis/gallery/publishers/$publisher/extensions/$extension/certificates/$version"

    # Sending request
    echo "Downloading certificate"
    curl -s -X GET "$url" \
        -H "accept: application/json; api-version=5.2-preview.1" \
        -H "authorization: Basic $pat_b64" \
        -H "cache-control: no-cache" \
        -H "content-type: application/json" \
        > $output_file
)
