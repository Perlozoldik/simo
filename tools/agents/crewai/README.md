# 👥 CrewAI — Multi-agent role-based teams

> **What it does:** define a "crew" of AI agents with different roles (PM, Developer, QA, Researcher), give them a goal, and they coordinate to solve it.
> **Repo:** https://github.com/crewAIInc/crewAI · **License:** MIT

## Install

Already installed by `install-all.sh` to `~/.velora-agents/crewai/venv`.

Manual:
```bash
python3 -m venv ~/.velora-agents/crewai/venv
~/.velora-agents/crewai/venv/bin/pip install 'crewai[tools]'
```

## Configure

```bash
export OPENAI_API_KEY=sk-...
# CrewAI uses OpenAI by default. To switch to Claude:
# export OPENAI_API_BASE=https://api.anthropic.com/v1   # not natively, see LiteLLM docs
```

## Run the example

A complete working example is in [`example_crew.py`](./example_crew.py): a 2-agent crew (Researcher + Writer) that produces a market report.

```bash
~/.velora-agents/crewai/venv/bin/python tools/agents/crewai/example_crew.py
```

## Build your own crew

The pattern is always the same:

1. **Agents** — each with `role`, `goal`, `backstory`
2. **Tasks** — assign each agent one or more
3. **Crew** — wire them together with `Process.sequential` or `Process.hierarchical`

See full docs: https://docs.crewai.com

## Cost guidance

A 3-agent crew with 5 tasks typically uses **15-50k tokens** per run.
- GPT-4o-mini: ~$0.01–0.05 per run
- GPT-4o: ~$0.20–0.80 per run
