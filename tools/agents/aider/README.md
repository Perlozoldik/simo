# 🪶 Aider — Terminal pair-programmer

> **What it does:** chat with an AI inside your terminal that edits files in your repo, runs tests, and creates git commits for every change.
> **Repo:** https://github.com/paul-gauthier/aider · **License:** Apache-2.0

## Install

Already installed by `tools/agents/install-all.sh` to `~/.velora-agents/aider/venv`.

If you want a manual install:
```bash
python3 -m venv ~/.velora-agents/aider/venv
~/.velora-agents/aider/venv/bin/pip install aider-chat
```

## Configure (one-time)

Aider reads keys from environment variables. Add one of:

```bash
export OPENAI_API_KEY=sk-...        # GPT-4o, GPT-4 Turbo
# or
export ANTHROPIC_API_KEY=sk-ant-... # Claude 3.5 Sonnet (recommended)
```

Or load from `tools/agents/.env`:
```bash
set -a; source tools/agents/.env; set +a
```

## Run

From the **root of any git repo** you want Aider to edit:

```bash
~/.velora-agents/aider/venv/bin/aider                       # auto-detect best model
~/.velora-agents/aider/venv/bin/aider --model claude-3-5-sonnet-20241022
~/.velora-agents/aider/venv/bin/aider --model gpt-4o
```

Add a shell alias for daily use:
```bash
alias aider="~/.velora-agents/aider/venv/bin/aider"
```

## Try it on the Velora repo

```bash
cd /path/to/simo
aider apps/web/src/app/page.tsx
# Then in the prompt:
> add a "Pricing" section with 3 plans (Free, Pro, Enterprise) below the Features section
```

Aider will edit the file, show you the diff, and ask before committing.

## Useful flags

| Flag | What it does |
|---|---|
| `--no-auto-commits` | Edit files but skip git commits |
| `--read FILE` | Add a file as read-only context (specs, docs) |
| `--vim` | Use vim keybindings in the chat |
| `--watch-files` | Re-prompt when files change on disk |
| `--map-tokens 2048` | Increase repo-map context for big projects |

## Cost guidance

- Claude 3.5 Sonnet: ~$0.05–0.30 per session of 5–10 edits
- GPT-4o: ~$0.10–0.50 per session

Aider shows token counts after every message so you stay aware.
