# 🔬 GPT-Researcher — Autonomous research agent

> **What it does:** ask it any question, it crawls the web, gathers sources, and produces a cited research report (3-page or detailed).
> **Repo:** https://github.com/assafelovic/gpt-researcher · **License:** Apache-2.0

## Install

`install-all.sh` clones the repo to `~/.velora-agents/gpt-researcher/repo` and creates a venv at `~/.velora-agents/gpt-researcher/venv`.

Manual:
```bash
git clone --depth=1 https://github.com/assafelovic/gpt-researcher ~/.velora-agents/gpt-researcher/repo
python3 -m venv ~/.velora-agents/gpt-researcher/venv
~/.velora-agents/gpt-researcher/venv/bin/pip install -r ~/.velora-agents/gpt-researcher/repo/requirements.txt
```

## Configure

```bash
export OPENAI_API_KEY=sk-...
export TAVILY_API_KEY=tvly-...   # https://tavily.com — free 1000 req/mo (recommended)
```

Other supported search backends: `SerpAPI`, `Google`, `DuckDuckGo`, `Bing`. See [docs](https://docs.gptr.dev/docs/gpt-researcher/llms).

## Run as a Python library

```python
import asyncio
from gpt_researcher import GPTResearcher

async def main():
    r = GPTResearcher(
        query="State of generative AI agents in 2026",
        report_type="research_report",  # or detailed_report, resource_report
    )
    await r.conduct_research()
    report = await r.write_report()
    print(report)

asyncio.run(main())
```

Save as `run.py` and run with:
```bash
~/.velora-agents/gpt-researcher/venv/bin/python run.py
```

## Run as a web app

```bash
cd ~/.velora-agents/gpt-researcher/repo
../venv/bin/python -m uvicorn main:app --host 0.0.0.0 --port 8000
```

Then open http://localhost:8000.

## Cost guidance

A `research_report` run is typically **30-80k tokens** + ~10 web fetches:
- GPT-4o-mini + Tavily: ~$0.05–0.15
- GPT-4o + Tavily: ~$0.50–1.20
