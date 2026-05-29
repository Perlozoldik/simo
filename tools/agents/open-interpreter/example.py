"""
Example: Use Open Interpreter as a library to summarize the Velora codebase.

Run:
    ~/.velora-agents/open-interpreter/venv/bin/python example.py

Requires:
    OPENAI_API_KEY (or ANTHROPIC_API_KEY) in your environment.
"""

from interpreter import interpreter

# Configure the model
interpreter.llm.model = "gpt-4o-mini"  # cheap + fast for demos
interpreter.auto_run = False  # always confirm commands (recommended)

# Run a single task
interpreter.chat(
    "Walk through the apps/api/src directory of this repo. "
    "List every route file under routes/ and one-line-summarize what each does. "
    "Output a markdown table."
)
