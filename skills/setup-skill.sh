#!/usr/bin/env bash
# Velora Skills — Per-skill setup helper
#
# Creates an isolated venv for a downloaded skill and installs its deps from
# requirements.txt or pyproject.toml. Each skill gets its own venv, so they
# never conflict with each other.
#
# Usage:
#   ./skills/setup-skill.sh <skill-name>
#   ./skills/setup-skill.sh agentic_rag

set -euo pipefail

SKILL_NAME="${1:-}"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

GREEN="\033[0;32m"; YELLOW="\033[1;33m"; RED="\033[0;31m"; NC="\033[0m"
log()  { printf "${GREEN}▸${NC} %s\n" "$*"; }
warn() { printf "${YELLOW}!${NC} %s\n" "$*"; }
fail() { printf "${RED}✗${NC} %s\n" "$*"; exit 1; }

if [[ -z "$SKILL_NAME" ]]; then
  fail "Usage: ./skills/setup-skill.sh <skill-name>"
fi

# Search both featured/ and downloaded/
SKILL_DIR=""
for base in "$ROOT/featured" "$ROOT/downloaded"; do
  if [[ -d "$base/$SKILL_NAME" ]]; then
    SKILL_DIR="$base/$SKILL_NAME"
    break
  fi
done

if [[ -z "$SKILL_DIR" ]]; then
  fail "Skill '$SKILL_NAME' not found. Run: ./skills/get-skill.sh $SKILL_NAME"
fi

log "Setting up: $SKILL_DIR"

if ! command -v python3 >/dev/null 2>&1; then
  fail "python3 is required (3.10+ recommended)."
fi

VENV_DIR="$SKILL_DIR/.venv"
if [[ ! -d "$VENV_DIR" ]]; then
  log "Creating venv at $VENV_DIR"
  python3 -m venv "$VENV_DIR"
fi
"$VENV_DIR/bin/pip" install --quiet --upgrade pip

# Install dependencies based on whatever the skill ships with
installed=0
if [[ -f "$SKILL_DIR/requirements.txt" ]]; then
  log "Installing from requirements.txt…"
  "$VENV_DIR/bin/pip" install --quiet -r "$SKILL_DIR/requirements.txt"
  installed=1
fi
if [[ -f "$SKILL_DIR/pyproject.toml" ]]; then
  log "Installing from pyproject.toml…"
  "$VENV_DIR/bin/pip" install --quiet -e "$SKILL_DIR" || \
    "$VENV_DIR/bin/pip" install --quiet "$SKILL_DIR"
  installed=1
fi

if [[ $installed -eq 0 ]]; then
  warn "No requirements.txt or pyproject.toml found."
  warn "Open $SKILL_DIR/README.md and install the listed packages manually:"
  warn "    $VENV_DIR/bin/pip install <package>…"
fi

# Copy .env.example → .env if needed
if [[ -f "$SKILL_DIR/.env.example" && ! -f "$SKILL_DIR/.env" ]]; then
  cp "$SKILL_DIR/.env.example" "$SKILL_DIR/.env"
  warn "Created $SKILL_DIR/.env — fill in API keys before running."
fi

log "Done. To use this skill:"
echo "    source $VENV_DIR/bin/activate"
echo "    cd $SKILL_DIR"
echo "    cat README.md"
