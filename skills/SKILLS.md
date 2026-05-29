# 📚 Skills Catalog

A curated index of every project in the [**AI Engineering Hub**](https://github.com/patchy631/ai-engineering-hub) by [@patchy631](https://github.com/patchy631), organized by difficulty and category.

> **How to use:** find a skill you want, then run:
> ```bash
> ./skills/get-skill.sh <skill-name>     # download it
> ./skills/setup-skill.sh <skill-name>   # install its deps
> ```

---

## 🟢 Beginner — single-component projects

### OCR & Vision
| Skill | What it does |
|-------|--------------|
| `LaTeX-OCR-with-Llama` | Convert LaTeX equation images to code (Llama 3.2 vision) |
| `llama-ocr` | 100% local OCR app (Llama 3.2 + Streamlit) |
| `gemma3-ocr` | Local OCR with structured text extraction (Gemma-3) |
| `qwen-2.5VL-ocr` | Text extraction with Qwen 2.5 VL |

### Chat UIs & local ChatGPT clones
| Skill | What it does |
|-------|--------------|
| `local-chatgpt with DeepSeek` | Mini-ChatGPT with DeepSeek-R1 + Chainlit |
| `local-chatgpt` | ChatGPT clone with Llama 3.2 vision |
| `local-chatgpt with Gemma 3` | Local chat interface with Gemma 3 |
| `deepseek-thinking-ui` | ChatGPT with visible reasoning (DeepSeek-R1) |
| `qwen3-thinking-ui` | Thinking UI with Qwen3:4B + Streamlit |
| `gpt-oss-thinking-ui` | GPT-OSS with reasoning visualization |
| `streaming-ai-chatbot` | Real-time streaming chatbot (Motia) |

### Basic RAG
| Skill | What it does |
|-------|--------------|
| `simple-rag-workflow` | Basic RAG with LlamaIndex + Ollama |
| `document-chat-rag` | Chat with documents (Llama 3.3) |
| `fastest-rag-stack` | Fast RAG (SambaNova + LlamaIndex + Qdrant) |
| `github-rag` | Chat with GitHub repos locally |
| `modernbert-rag` | RAG with ModernBert embeddings |
| `llama-4-rag` | RAG powered by Meta Llama 4 |

### Multimodal & media
| Skill | What it does |
|-------|--------------|
| `imagegen-janus-pro` | Local image generation (DeepSeek Janus-pro 7B) |
| `video-rag-gemini` | Chat with videos (Gemini AI) |

### Tools
| Skill | What it does |
|-------|--------------|
| `Website-to-API-with-FireCrawl` | Convert websites to APIs |
| `ai_news_generator` | News generator (CrewAI + Cohere) — ⭐ **bundled in `featured/`** |
| `siamese-network` | Digit similarity on MNIST |

---

## 🟡 Intermediate — multi-component agentic systems

### Agents & workflows
| Skill | Stack |
|-------|-------|
| `Youtube-trend-analysis` | CrewAI + BrightData |
| `autogen-stock-analyst` | Microsoft AutoGen — ⭐ **bundled in `featured/`** |
| `agentic_rag` | RAG + web search fallback |
| `agentic_rag_deepseek` | Enterprise agentic RAG (GroundX) |
| `book-writer-flow` | Automated book writing (CrewAI Flow) |
| `content_planner_flow` | Content workflow (CrewAI Flow) |
| `brand-monitoring` | Automated brand monitoring |
| `hotel-booking-crew` | Multi-agent hotel booking (DeepSeek-R1) |
| `flight-booking-crew` | Multi-agent flight booking |
| `deploy-agentic-rag` | Private RAG API (LitServe) |
| `zep-memory-assistant` | AI agent with persistent memory |
| `agent-with-mcp-memory` | Agents with Graphiti memory + Opik |
| `acp-code` | Agent Communication Protocol demo |
| `motia-content-creation` | Social-media automation workflow |

### Voice & audio
| Skill | What it does |
|-------|--------------|
| `real-time-voicebot` | Conversational travel guide (AssemblyAI) |
| `rag-voice-agent` | Real-time RAG voice agent (Cartesia) |
| `chat-with-audios` | RAG over audio files |
| `audio-analysis-toolkit` | Audio analysis (AssemblyAI) |
| `multilingual-meeting-notes-generator` | Auto meeting notes with language detection |

### Advanced RAG
| Skill | What it does |
|-------|--------------|
| `rag-with-dockling` | RAG over Excel (IBM Docling) |
| `trustworthy-rag` | RAG over complex docs (TLM) |
| `fastest-rag-milvus-groq` | Sub-15ms retrieval (Milvus + Groq) |
| `chat-with-code` | Chat with code (Qwen3-Coder) |
| `rag-sql-router` | Agent with RAG + SQL routing |
| `corrective-rag` | Self-correcting RAG |
| `colbert-rag` | ColBERT-based retrieval |

### Multimodal RAG
| Skill | What it does |
|-------|--------------|
| `deepseek-multimodal-RAG` | MultiModal RAG (DeepSeek-Janus-Pro) |
| `Colivara-deepseek-website-RAG` | MultiModal RAG for websites |
| `multimodal-rag-assemblyai` | Audio + vector DB + CrewAI |
| `multi-modal-rag` | General multimodal pipeline |

### MCP (Model Context Protocol)
| Skill | What it does |
|-------|--------------|
| `cursor_linkup_mcp` | Custom MCP with deep web search |
| `eyelevel-mcp-rag` | MCP for RAG over complex docs |
| `llamaindex-mcp` | Local MCP client (LlamaIndex) |
| `mcp-agentic-rag` | MCP + Agentic RAG for Cursor — ⭐ **bundled in `featured/`** |
| `mcp-agentic-rag-firecrawl` | Agentic RAG with Firecrawl |
| `mcp-video-rag` | Video RAG (Ragie via MCP) |
| `mcp-voice-agent` | Voice agent (Firecrawl + Supabase) |
| `sdv-mcp` | Synthetic Data Vault orchestration |
| `kitops-mcp` | ML model management (KitOps) |
| `stagehand x mcp-use` | Web automation (Stagehand MCP) |

### Model comparison & evaluation
| Skill | What it does |
|-------|--------------|
| `eval-and-observability` | E2E RAG evaluation (CometML Opik) |
| `llama-4_vs_deepseek-r1` | Compare Llama 4 vs DeepSeek-R1 |
| `qwen3_vs_deepseek-r1` | Compare Qwen3 vs DeepSeek-R1 |
| `o3-vs-claude-code` | o3 vs Claude 3.7 |
| `sonnet4-vs-o4` | Code generation comparison |
| `sonnet4-vs-qwen3-coder` | Coder model comparison |
| `code-model-comparison` | Frontier code models |
| `gpt-oss-vs-qwen3` | Reasoning capabilities |

---

## 🔴 Advanced — fine-tuning, production, novel research

### Fine-tuning & model dev
| Skill | What it does |
|-------|--------------|
| `DeepSeek-finetuning` | Fine-tune DeepSeek (Unsloth + Ollama) |
| `Build-reasoning-model` | Build a DeepSeek-R1-style reasoning model |
| `knowledge distillation` | Knowledge distillation pipeline |

### Advanced agent systems
| Skill | What it does |
|-------|--------------|
| `documentation-writer-flow` | Agentic documentation workflow |
| `Multi-Agent-deep-researcher-mcp-windows-linux` | MCP-powered deep researcher |
| `multiplatform_deep_researcher` | Multi-platform research (BrightData) |
| `web-browsing-agent` | Browser automation (CrewAI + Stagehand) |
| `paralegal-agent-crew` | Intelligent paralegal with RAG |
| `firecrawl-agent` | Corrective RAG with web fallback |
| `context-engineering-workflow` | Research assistant (TensorLake + Zep) |
| `parlant-conversational-agent` | Compliance-driven conversational agent |
| `stock-portfolio-analysis-agent` | Portfolio analysis with React frontend |
| `guidelines-vs-traditional-prompt` | Structured guidelines comparison |

### Advanced MCP & infrastructure
| Skill | What it does |
|-------|--------------|
| `mindsdb-mcp` | Unified MCP for all data sources |
| `financial-analyst-deepseek` | MCP financial analysis workflow |
| `graphiti-mcp` | Persistent memory (Zep Graphiti) |
| `pixeltable-mcp` | Unified multimodal data orchestration |
| `ultimate-ai-assitant-using-mcp` | Multi-MCP server interface |

### Production systems
| Skill | What it does |
|-------|--------------|
| `groundX-doc-pipeline` | World-class document processing |
| `notebook-lm-clone` | Full NotebookLM clone (RAG + citations + podcasts) |
| `openclaw-secure-deployment` | Secure production deployment |

### Other / specialized
| Skill | What it does |
|-------|--------------|
| `train-yolo26-object-detection` | Train YOLO26 for object detection |
| `ai-podcast-generation` / `ai-podcast-generator` | Auto-generate podcasts |
| `ai-avatar-demo` | AI avatar demo |
| `database-memory-agent` | Agent with database-backed memory |
| `finetune-studio-mcp-app` | Fine-tuning studio app |
| `open-agent-builder` | Visual agent builder |
| `openai-swarm-ollama` | OpenAI Swarm with Ollama |
| `art_mcp_rl` | RL-based MCP demo |
| `agent2agent-demo` | Agent-to-agent communication |

### Learning resources
| Resource | What it is |
|----------|------------|
| `ai-engineering-roadmap` | Complete learning path: Python → production AI |
| `courses` | Course materials |
| `resources` | Reference resources |

---

## How to discover the absolute latest

The upstream repo gets new skills every week. Run this to refresh your local index:

```bash
./skills/get-skill.sh --update
./skills/get-skill.sh --list
```

You can also browse the upstream README online for the freshest list:
👉 https://github.com/patchy631/ai-engineering-hub#-projects-by-difficulty

---

> **Want a different curation?** This catalog can be regenerated. The actual code lives upstream — we just point at it. To suggest changes, edit `skills/SKILLS.md` directly.
