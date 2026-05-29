# 🤖 Velora AI Agents Toolkit

A curated, install-ready bundle of the **5 best open-source AI agents** on GitHub, all wired up to work together with one install script and one shared `.env`.

Everything lives under [`tools/agents/`](./tools/agents/).

---

## What's inside

| # | Agent | What it's best at | API needed |
|---|-------|-------------------|------------|
| 1 | **[Aider](./tools/agents/aider/)** | Pair-programming in your terminal — edits files, runs tests, commits to git | OpenAI **or** Anthropic |
| 2 | **[Open Interpreter](./tools/agents/open-interpreter/)** | Natural-language → code execution on your machine (the local Code Interpreter) | OpenAI **or** Anthropic |
| 3 | **[CrewAI](./tools/agents/crewai/)** | Multi-agent role-based teams (PM + Dev + QA cooperating) | OpenAI |
| 4 | **[GPT-Researcher](./tools/agents/gpt-researcher/)** | Autonomous web research with cited reports | OpenAI **+** Tavily (free) |
| 5 | **[OpenHands](./tools/agents/openhands/)** | Full autonomous SWE agent — the leading open-source Devin alternative | Claude **or** OpenAI |

Each subfolder has its own `README.md` with quickstart, examples, and cost guidance.

---

## One-shot install

### macOS / Linux

```bash
chmod +x tools/agents/install-all.sh
./tools/agents/install-all.sh
```

### Windows (PowerShell, run as user)

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\tools\agents\install.ps1
```

This installs each Python-based agent into its **own venv** under `~/.velora-agents/<name>/venv` (so they never conflict with each other or with your system Python). OpenHands is pulled as Docker images.

After install, the tree on disk looks like:

```
~/.velora-agents/
├── aider/venv/bin/aider
├── open-interpreter/venv/bin/interpreter
├── crewai/venv/bin/python
└── gpt-researcher/
    ├── repo/                 # cloned source
    └── venv/bin/python
```

---

## Configure once, use everywhere

```bash
cp tools/agents/.env.example tools/agents/.env
# then edit tools/agents/.env and add at least one key:
#   OPENAI_API_KEY=sk-...
#   ANTHROPIC_API_KEY=sk-ant-...
#   TAVILY_API_KEY=tvly-...   (optional, for GPT-Researcher)
```

Load it before running any agent:

```bash
set -a; source tools/agents/.env; set +a
```

> 💡 **Don't have an API key yet?** See [§ Where to get keys](#where-to-get-api-keys) below.

---

## Quickstarts (TL;DR per agent)

### 1. Aider — edit code with AI

```bash
~/.velora-agents/aider/venv/bin/aider apps/web/src/app/page.tsx
> add a Pricing section with Free, Pro, Enterprise plans
```

### 2. Open Interpreter — execute tasks in plain English

```bash
~/.velora-agents/open-interpreter/venv/bin/interpreter
> Convert all .heic photos in ./photos to .jpg
```

### 3. CrewAI — run a 2-agent research team

```bash
~/.velora-agents/crewai/venv/bin/python tools/agents/crewai/example_crew.py
```

### 4. GPT-Researcher — produce a cited report

```python
# In a Python file, with venv activated:
from gpt_researcher import GPTResearcher
import asyncio

async def main():
    r = GPTResearcher(query="Ride-hailing market in MENA 2026", report_type="research_report")
    await r.conduct_research()
    print(await r.write_report())

asyncio.run(main())
```

### 5. OpenHands — autonomous SWE in a browser

```bash
bash tools/agents/openhands/run.sh
# then open http://localhost:3000
```

---

## Where to get API keys

| Provider | Free tier? | Sign up | Cost reference |
|----------|------------|---------|----------------|
| **OpenAI** | $5 trial credit on new accounts | https://platform.openai.com/api-keys | gpt-4o-mini ≈ $0.15/M input |
| **Anthropic Claude** | $5 trial credit | https://console.anthropic.com/settings/keys | Claude 3.5 Sonnet ≈ $3/M input |
| **Tavily** (search for GPT-Researcher) | 1000 req/mo free | https://app.tavily.com/ | Free for personal use |

> 🪙 **Cheapest sane combo**: OpenAI gpt-4o-mini for everything + Tavily free tier. You can run Aider + CrewAI + Researcher all month on under **$2**.

---

## Safety & caveats

These agents **execute code, edit files, and call paid APIs**. Treat them like a junior contractor with shell access:

1. **Run them inside a project directory you control.** Don't run agents at your home directory root.
2. **Always review proposed changes before approving.** Aider, OpenHands, and Open Interpreter all show you what they're about to do — keep the auto-approve flags off in production.
3. **Set spending limits** on your OpenAI/Anthropic dashboards. A runaway agent can burn through credits in minutes.
4. **Use OpenHands with Docker** (the install script already does this) — it isolates code execution from your host.
5. **Never hardcode API keys in the repo.** Always use `.env` (this folder's `.gitignore` already excludes it).

---

## Why these five?

I picked from a long list (AutoGPT, AgentGPT, MetaGPT, AutoGen, LangGraph, SWE-agent, gpt-engineer, browser-use, Skyvern, AnythingLLM, Continue, Cline, Devon...) using three filters:

- **Daily-driver utility** — would I actually open this every day?
- **Cross-domain coverage** — together they handle coding, research, automation, multi-agent workflows, and full SWE
- **Maintenance** — actively maintained, ≥10k GitHub stars, real release cadence

The five chosen cover **every common use case** without redundancy:

```
            CODING            EXECUTION          RESEARCH
              │                   │                 │
            Aider          Open-Interpreter   GPT-Researcher
              │                   │                 │
              ▼                   ▼                 ▼
                       MULTI-AGENT TEAM
                            CrewAI
                              │
                              ▼
                       FULL AUTONOMOUS SWE
                          OpenHands
```

If you want to expand later, drop another README in `tools/agents/<new-agent>/` and add a row to the table above.
