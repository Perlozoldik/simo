"""
CrewAI example — a 2-agent crew that researches a topic and writes a brief.

Run:
    export OPENAI_API_KEY=sk-...
    ~/.velora-agents/crewai/venv/bin/python example_crew.py

Cost: ~$0.02 with gpt-4o-mini, ~$0.30 with gpt-4o.
"""

import os
from crewai import Agent, Task, Crew, Process, LLM

TOPIC = os.environ.get("TOPIC", "the ride-hailing market in Southeast Asia in 2026")

llm = LLM(model="gpt-4o-mini", temperature=0.4)

researcher = Agent(
    role="Senior Market Researcher",
    goal=f"Find the 5 most important facts about: {TOPIC}",
    backstory=(
        "A veteran analyst who only cites recent, primary sources and "
        "values precision over fluff."
    ),
    llm=llm,
    allow_delegation=False,
    verbose=True,
)

writer = Agent(
    role="Editorial Writer",
    goal="Turn raw research into a tight 200-word brief for a busy executive",
    backstory=(
        "An experienced editor who writes with clarity and a slight skeptical edge. "
        "Knows how to surface the implication behind every fact."
    ),
    llm=llm,
    allow_delegation=False,
    verbose=True,
)

research_task = Task(
    description=(
        f"Research the topic: {TOPIC}. "
        "Produce 5 bullet points, each with a one-line citation hint. "
        "Prefer 2025–2026 sources."
    ),
    expected_output="5 bullet points with citation hints.",
    agent=researcher,
)

write_task = Task(
    description=(
        "Using the research bullets as input, write a 200-word executive brief. "
        "Open with the most surprising insight. End with one actionable recommendation."
    ),
    expected_output="A 200-word executive brief in markdown.",
    agent=writer,
    context=[research_task],
)

crew = Crew(
    agents=[researcher, writer],
    tasks=[research_task, write_task],
    process=Process.sequential,
    verbose=True,
)

if __name__ == "__main__":
    result = crew.kickoff()
    print("\n" + "=" * 60)
    print("FINAL OUTPUT")
    print("=" * 60)
    print(result)
