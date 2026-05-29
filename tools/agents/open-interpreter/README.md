# 🐍 Open Interpreter — Natural-language code execution

> **What it does:** type instructions in English, it writes and runs Python/JS/Shell on **your machine** to complete them. Like ChatGPT Code Interpreter, but local and unrestricted.
> **Repo:** https://github.com/OpenInterpreter/open-interpreter · **License:** AGPL-3.0

## Install

Already installed by `install-all.sh` to `~/.velora-agents/open-interpreter/venv`.

Manual:
```bash
python3 -m venv ~/.velora-agents/open-interpreter/venv
~/.velora-agents/open-interpreter/venv/bin/pip install open-interpreter
```

## Configure

```bash
export OPENAI_API_KEY=sk-...        # default uses GPT-4o
# or
export ANTHROPIC_API_KEY=sk-ant-...
```

## Run interactively

```bash
~/.velora-agents/open-interpreter/venv/bin/interpreter
```

Examples to try:

```
> Plot the last 30 days of stock prices for AAPL into a PNG.
> Find the 10 largest files in my home directory and summarize them by type.
> Convert all .heic files in ./photos to .jpg.
```

Open Interpreter will **show every command before running it** and ask for approval (unless you pass `-y`).

## Programmatic use

See [`example.py`](./example.py) for a Python script using OI as a library.

```bash
~/.velora-agents/open-interpreter/venv/bin/python tools/agents/open-interpreter/example.py
```

## Safety

⚠️ This tool **executes code on your machine**. Use with care:

- Run only in trusted directories
- Review every command before approving (default behavior)
- Don't pass `-y` (auto-approve) on production machines
- Consider running inside Docker for total isolation
