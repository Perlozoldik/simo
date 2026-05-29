#!/usr/bin/env bash
# Velora — One-shot installer for the top 5 open-source AI agents.
#
# Installs:
#   1. Aider             — terminal pair-programmer
#   2. Open Interpreter  — natural-language code execution
#   3. CrewAI            — multi-agent role-based teams
#   4. GPT-Researcher    — autonomous research agent
#   5. OpenHands         — autonomous SWE agent (Docker)
#
# Requirements:
#   - macOS or Linux (tested), Windows users see install.ps1
#   - Python 3.10+
#   - Docker (optional — only needed for OpenHands)
#
# Usage:
#   chmod +x install-all.sh
#   ./install-all.sh

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
HOME_AGENTS="${AGENTS_HOME:-$HOME/.velora-agents}"

GREEN="\033[0;32m"; YELLOW="\033[1;33m"; RED="\033[0;31m"; NC="\033[0m"
log()   { printf "${GREEN}▸${NC} %s\n" "$*"; }
warn()  { printf "${YELLOW}!${NC} %s\n" "$*"; }
fail()  { printf "${RED}✗${NC} %s\n" "$*"; exit 1; }

check_python() {
  if ! command -v python3 >/dev/null 2>&1; then
    fail "python3 is required. Install Python 3.10+ first."
  fi
  local v
  v=$(python3 -c 'import sys; print(f"{sys.version_info.major}.{sys.version_info.minor}")')
  log "Python $v detected"
  if ! python3 -c 'import sys; sys.exit(0 if sys.version_info >= (3,10) else 1)'; then
    fail "Python 3.10+ required (you have $v)"
  fi
}

setup_venv() {
  local name="$1"
  local dir="$HOME_AGENTS/$name"
  if [[ ! -d "$dir/venv" ]]; then
    log "Creating venv for $name at $dir"
    mkdir -p "$dir"
    python3 -m venv "$dir/venv"
  fi
  "$dir/venv/bin/pip" install --quiet --upgrade pip
  echo "$dir/venv"
}

install_aider() {
  log "Installing Aider…"
  local venv; venv=$(setup_venv "aider")
  "$venv/bin/pip" install --quiet aider-chat
  log "Aider installed → $venv/bin/aider"
}

install_open_interpreter() {
  log "Installing Open Interpreter…"
  local venv; venv=$(setup_venv "open-interpreter")
  "$venv/bin/pip" install --quiet open-interpreter
  log "Open Interpreter installed → $venv/bin/interpreter"
}

install_crewai() {
  log "Installing CrewAI…"
  local venv; venv=$(setup_venv "crewai")
  "$venv/bin/pip" install --quiet crewai 'crewai[tools]'
  log "CrewAI installed → $venv/bin/python"
}

install_gpt_researcher() {
  log "Installing GPT-Researcher…"
  local dir="$HOME_AGENTS/gpt-researcher"
  if [[ ! -d "$dir/repo" ]]; then
    git clone --depth=1 https://github.com/assafelovic/gpt-researcher "$dir/repo"
  else
    git -C "$dir/repo" pull --quiet
  fi
  if [[ ! -d "$dir/venv" ]]; then
    python3 -m venv "$dir/venv"
  fi
  "$dir/venv/bin/pip" install --quiet --upgrade pip
  "$dir/venv/bin/pip" install --quiet -r "$dir/repo/requirements.txt"
  log "GPT-Researcher installed → $dir/repo (venv: $dir/venv)"
}

install_openhands() {
  log "Setting up OpenHands (Docker-based)…"
  if ! command -v docker >/dev/null 2>&1; then
    warn "Docker not detected. Skipping OpenHands."
    warn "Install Docker Desktop, then re-run this script (or just see openhands/README.md)."
    return
  fi
  log "Pulling OpenHands runtime image (this may take a few minutes)…"
  docker pull docker.all-hands.dev/all-hands-ai/runtime:0.20-nikolaik || \
    warn "Image pull failed; you can retry later via openhands/README.md"
  log "OpenHands runtime ready. Launch with: tools/agents/openhands/run.sh"
}

main() {
  echo
  echo "  ┌─────────────────────────────────────────┐"
  echo "  │  Velora — AI Agents installer (top 5)   │"
  echo "  └─────────────────────────────────────────┘"
  echo
  log "Install root: $HOME_AGENTS"
  check_python

  install_aider
  install_open_interpreter
  install_crewai
  install_gpt_researcher
  install_openhands

  echo
  log "All done. Next steps:"
  cat <<EOF

  1. Copy .env.example → .env and fill in your API key(s):
       cp $ROOT/.env.example $ROOT/.env
       # then edit and add OPENAI_API_KEY=sk-... (or ANTHROPIC_API_KEY)

  2. Try Aider:        $HOME_AGENTS/aider/venv/bin/aider --help
     Try Interpreter:  $HOME_AGENTS/open-interpreter/venv/bin/interpreter
     Try CrewAI:       $HOME_AGENTS/crewai/venv/bin/python $ROOT/crewai/example_crew.py
     Try Researcher:   see $ROOT/gpt-researcher/README.md
     Try OpenHands:    bash $ROOT/openhands/run.sh

EOF
}

main "$@"
