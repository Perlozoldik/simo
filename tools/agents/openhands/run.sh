#!/usr/bin/env bash
# Launch OpenHands locally. Requires Docker Desktop.
set -euo pipefail

VERSION="${OPENHANDS_VERSION:-0.20}"

if ! command -v docker >/dev/null 2>&1; then
  echo "✗ Docker not found. Install Docker Desktop: https://www.docker.com/products/docker-desktop/"
  exit 1
fi

if ! docker info >/dev/null 2>&1; then
  echo "✗ Docker daemon is not running. Start Docker Desktop first."
  exit 1
fi

echo "▸ Pulling images (this may take a few minutes the first time)…"
docker pull "docker.all-hands.dev/all-hands-ai/runtime:${VERSION}-nikolaik"
docker pull "docker.all-hands.dev/all-hands-ai/openhands:${VERSION}"

echo "▸ Starting OpenHands on http://localhost:3000"
docker run -it --rm --pull=always \
  -e SANDBOX_RUNTIME_CONTAINER_IMAGE="docker.all-hands.dev/all-hands-ai/runtime:${VERSION}-nikolaik" \
  -e LOG_ALL_EVENTS=true \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v "$HOME/.openhands-state:/.openhands-state" \
  -p 3000:3000 \
  --name openhands-app \
  "docker.all-hands.dev/all-hands-ai/openhands:${VERSION}"
