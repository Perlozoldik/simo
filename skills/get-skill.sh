#!/usr/bin/env bash
# Velora Skills — On-demand downloader
#
# Pulls a single project from the upstream AI Engineering Hub repo
# (https://github.com/patchy631/ai-engineering-hub) into ./skills/downloaded/
# using git sparse-checkout, so you only fetch what you actually want.
#
# Usage:
#   ./skills/get-skill.sh <skill-name>
#   ./skills/get-skill.sh agentic_rag
#   ./skills/get-skill.sh financial-analyst-deepseek
#
# To list every available skill:
#   ./skills/get-skill.sh --list

set -euo pipefail

UPSTREAM="https://github.com/patchy631/ai-engineering-hub.git"
SKILL_NAME="${1:-}"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEST_DIR="$ROOT/downloaded"
CACHE_DIR="$ROOT/.cache/upstream"

GREEN="\033[0;32m"; YELLOW="\033[1;33m"; RED="\033[0;31m"; NC="\033[0m"
log()  { printf "${GREEN}▸${NC} %s\n" "$*"; }
warn() { printf "${YELLOW}!${NC} %s\n" "$*"; }
fail() { printf "${RED}✗${NC} %s\n" "$*"; exit 1; }

usage() {
  cat <<EOF
Velora Skills — On-demand downloader

Usage:
  ./skills/get-skill.sh <skill-name>     Download a single skill
  ./skills/get-skill.sh --list           List every available skill name
  ./skills/get-skill.sh --update         Refresh the upstream cache

The catalog of skills is documented in skills/SKILLS.md.
EOF
}

ensure_cache() {
  if [[ ! -d "$CACHE_DIR/.git" ]]; then
    log "Bootstrapping upstream cache (one-time, ~10 MB)…"
    mkdir -p "$CACHE_DIR"
    git clone --filter=blob:none --no-checkout --depth=1 "$UPSTREAM" "$CACHE_DIR"
    git -C "$CACHE_DIR" sparse-checkout init --cone
  fi
}

list_skills() {
  ensure_cache
  log "Refreshing index…"
  git -C "$CACHE_DIR" fetch --depth=1 origin main >/dev/null 2>&1 || true
  log "Available skills (top-level folders in upstream):"
  git -C "$CACHE_DIR" ls-tree -d --name-only origin/main | grep -v '^\.' | sort
}

update_cache() {
  ensure_cache
  log "Pulling latest changes from upstream…"
  git -C "$CACHE_DIR" fetch --depth=1 origin main
  log "Cache up to date."
}

download_skill() {
  local name="$1"
  ensure_cache

  log "Adding '$name' to sparse-checkout…"
  git -C "$CACHE_DIR" fetch --depth=1 origin main >/dev/null 2>&1 || true
  git -C "$CACHE_DIR" sparse-checkout add "$name" >/dev/null
  git -C "$CACHE_DIR" checkout origin/main -- "$name" 2>/dev/null || \
    fail "Skill '$name' not found in upstream. Run: ./skills/get-skill.sh --list"

  if [[ ! -d "$CACHE_DIR/$name" ]]; then
    fail "Skill '$name' was not materialized after checkout. Try --update."
  fi

  mkdir -p "$DEST_DIR"
  if [[ -d "$DEST_DIR/$name" ]]; then
    warn "Skill already exists at: $DEST_DIR/$name"
    warn "Remove it first if you want to re-download."
    exit 0
  fi
  cp -r "$CACHE_DIR/$name" "$DEST_DIR/$name"

  log "Downloaded → $DEST_DIR/$name"
  echo
  log "Next steps:"
  echo "    cat $DEST_DIR/$name/README.md     # see project docs"
  echo "    ./skills/setup-skill.sh $name     # create venv & install deps"
}

case "${SKILL_NAME}" in
  ""|-h|--help) usage ;;
  --list) list_skills ;;
  --update) update_cache ;;
  *) download_skill "$SKILL_NAME" ;;
esac
