# 🧠 Velora Skills

A curated, on-demand skill library powered by the open-source [**AI Engineering Hub**](https://github.com/patchy631/ai-engineering-hub) by [@patchy631](https://github.com/patchy631).

## What's here

```
skills/
├── SKILLS.md           ← full catalog of 90+ projects (RAG, agents, MCP, fine-tuning…)
├── ATTRIBUTION.md      ← credit & license info
├── get-skill.sh        ← download any single skill on demand
├── setup-skill.sh      ← create a venv and install deps for a skill
├── featured/           ← 3 small skills bundled directly (CrewAI / AutoGen / MCP)
└── downloaded/         ← (created on first download) where get-skill.sh puts skills
```

## Quick start

### 1. List every available skill
```bash
./skills/get-skill.sh --list
```

### 2. Download a specific skill (only the folder you ask for)
```bash
./skills/get-skill.sh agentic_rag
./skills/get-skill.sh financial-analyst-deepseek
./skills/get-skill.sh notebook-lm-clone
```

> Uses `git sparse-checkout` so you fetch one folder at a time, not the whole 614 MB repo.

### 3. Set up the skill (creates an isolated venv)
```bash
./skills/setup-skill.sh agentic_rag
```

### 4. Run it
Each skill ships with its own `README.md` and example code (notebooks, `app.py`, etc.). Open the README and follow the project-specific instructions.

## Featured (already bundled, no download needed)

These three skills are small and demonstrate three different agent stacks. They're shipped directly inside `featured/` so you can run them immediately:

| Skill | Stack | Try it |
|-------|-------|--------|
| [`ai_news_generator`](./featured/ai_news_generator/) | CrewAI + Cohere + Serper | `./skills/setup-skill.sh ai_news_generator` |
| [`autogen-stock-analyst`](./featured/autogen-stock-analyst/) | Microsoft AutoGen | Open the notebook |
| [`mcp-agentic-rag`](./featured/mcp-agentic-rag/) | Model Context Protocol + RAG | Open the notebook |

Each has a `README.md` from the upstream project explaining required API keys.

## API keys you'll typically need

Different skills require different keys. The most common ones across the catalog:

| Provider | Used by | Sign up |
|----------|---------|---------|
| **OpenAI** | most agents and RAG examples | https://platform.openai.com/api-keys |
| **Anthropic Claude** | many agents | https://console.anthropic.com/ |
| **Cohere** | `ai_news_generator`, some RAGs | https://dashboard.cohere.com/api-keys |
| **Serper** | search-augmented agents | https://serper.dev/ |
| **Tavily** | research agents | https://tavily.com/ |
| **AssemblyAI** | voice/audio skills | https://www.assemblyai.com/ |
| **Firecrawl** | web-scraping agents | https://firecrawl.dev/ |

Always read the skill's own README before running — it lists the exact keys it needs.

## Browse the full catalog

See [`SKILLS.md`](./SKILLS.md) for the full curated index, organized by difficulty (Beginner → Intermediate → Advanced) and category (RAG, agents, MCP, voice, vision, fine-tuning…).

## Credits & license

All the skills come from [**patchy631/ai-engineering-hub**](https://github.com/patchy631/ai-engineering-hub) (MIT). Full credit and license details are in [`ATTRIBUTION.md`](./ATTRIBUTION.md). If you publish anything based on these skills, please credit the upstream author.
