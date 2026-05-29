# Velora — One-shot installer for the top 5 open-source AI agents (Windows).
#
# Requirements:
#   - PowerShell 5.1+
#   - Python 3.10+ (https://www.python.org/downloads/)
#   - Git
#   - Docker Desktop (optional, only for OpenHands)
#
# Usage (run in PowerShell, NOT cmd):
#   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
#   .\install.ps1

$ErrorActionPreference = "Stop"

$AgentsHome = if ($env:AGENTS_HOME) { $env:AGENTS_HOME } else { Join-Path $HOME ".velora-agents" }

function Log($msg)  { Write-Host "▸ $msg" -ForegroundColor Green }
function Warn($msg) { Write-Host "! $msg" -ForegroundColor Yellow }

function Get-Python {
    $candidates = @("python", "python3", "py -3")
    foreach ($c in $candidates) {
        try {
            $v = & cmd /c "$c --version 2>&1"
            if ($LASTEXITCODE -eq 0) { return $c.Split(" ")[0] }
        } catch { }
    }
    throw "Python 3.10+ not found. Install from https://www.python.org/downloads/"
}

$python = Get-Python
Log "Using Python: $python"

function New-AgentVenv($name) {
    $dir = Join-Path $AgentsHome $name
    $venv = Join-Path $dir "venv"
    if (-not (Test-Path $venv)) {
        Log "Creating venv for $name at $dir"
        New-Item -ItemType Directory -Force -Path $dir | Out-Null
        & $python -m venv $venv
    }
    & "$venv\Scripts\pip.exe" install --quiet --upgrade pip
    return $venv
}

Log "Installing Aider..."
$venv = New-AgentVenv "aider"
& "$venv\Scripts\pip.exe" install --quiet aider-chat

Log "Installing Open Interpreter..."
$venv = New-AgentVenv "open-interpreter"
& "$venv\Scripts\pip.exe" install --quiet open-interpreter

Log "Installing CrewAI..."
$venv = New-AgentVenv "crewai"
& "$venv\Scripts\pip.exe" install --quiet "crewai[tools]"

Log "Installing GPT-Researcher..."
$dir = Join-Path $AgentsHome "gpt-researcher"
$repo = Join-Path $dir "repo"
if (-not (Test-Path $repo)) {
    git clone --depth=1 https://github.com/assafelovic/gpt-researcher $repo
}
$venv = Join-Path $dir "venv"
if (-not (Test-Path $venv)) {
    & $python -m venv $venv
}
& "$venv\Scripts\pip.exe" install --quiet --upgrade pip
& "$venv\Scripts\pip.exe" install --quiet -r "$repo\requirements.txt"

Log "Setting up OpenHands..."
if (Get-Command docker -ErrorAction SilentlyContinue) {
    docker pull docker.all-hands.dev/all-hands-ai/runtime:0.20-nikolaik
    docker pull docker.all-hands.dev/all-hands-ai/openhands:0.20
} else {
    Warn "Docker not detected. Skipping OpenHands. Install Docker Desktop to use it."
}

Write-Host ""
Log "All done. Install root: $AgentsHome"
Write-Host ""
Write-Host "Next steps:"
Write-Host "  1. Set your API keys:"
Write-Host "     `$env:OPENAI_API_KEY = 'sk-...'"
Write-Host "  2. Try Aider: $AgentsHome\aider\venv\Scripts\aider.exe"
Write-Host ""
