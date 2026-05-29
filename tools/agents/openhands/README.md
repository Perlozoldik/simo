# 🙌 OpenHands (formerly OpenDevin) — Autonomous SWE agent

> **What it does:** an autonomous software-engineering agent that browses, edits files, runs tests, and uses a real shell. The leading open-source Devin alternative.
> **Repo:** https://github.com/All-Hands-AI/OpenHands · **License:** MIT

## Why Docker?

OpenHands runs your AI agent inside an isolated Docker container so it can safely execute any code without touching your host. So you need **Docker Desktop** running.

## Install

`install-all.sh` pulls the runtime image. To run it:

```bash
bash tools/agents/openhands/run.sh
```

Or manual:
```bash
docker pull docker.all-hands.dev/all-hands-ai/openhands:0.20
docker pull docker.all-hands.dev/all-hands-ai/runtime:0.20-nikolaik
```

## Configure

OpenHands picks up your API key from the UI on first launch — but you can pre-set it:

```bash
export LLM_API_KEY=sk-ant-...                  # Claude (recommended)
export LLM_MODEL=anthropic/claude-3-5-sonnet-20241022
# or
export LLM_API_KEY=sk-...
export LLM_MODEL=gpt-4o
```

## Launch

Use [`run.sh`](./run.sh) or copy this:

```bash
docker run -it --rm --pull=always \
  -e SANDBOX_RUNTIME_CONTAINER_IMAGE=docker.all-hands.dev/all-hands-ai/runtime:0.20-nikolaik \
  -e LOG_ALL_EVENTS=true \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v ~/.openhands-state:/.openhands-state \
  -p 3000:3000 \
  --name openhands-app \
  docker.all-hands.dev/all-hands-ai/openhands:0.20
```

Then open http://localhost:3000.

## What it can do

- Solve real GitHub issues end-to-end (clone, branch, fix, test, PR)
- Build small apps from a prompt
- Refactor codebases across many files
- Run and debug failing tests

## Cost guidance

OpenHands is far more autonomous than the others, so each run is heavier:
- Claude 3.5 Sonnet: **$0.50–5.00 per task** depending on complexity
- GPT-4o: **$1.00–10.00 per task**

Always set a budget cap in the UI before starting a long task.
