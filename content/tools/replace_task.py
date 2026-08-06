"""replace_task.py — swap a task block inside a content/*.md file by task id."""
import io, sys

def replace(md_path, task_id, new_block):
    with io.open(md_path, encoding="utf-8") as f:
        text = f.read()
    chunks = text.split("\n---\n")
    hit = -1
    for i, c in enumerate(chunks):
        if ("- id: " + task_id + "\n") in c or c.rstrip().endswith("- id: " + task_id):
            hit = i
            break
    if hit < 0:
        raise SystemExit("task id not found: " + task_id + " in " + md_path)
    chunks[hit] = "\n" + new_block.strip() + "\n"
    with io.open(md_path, "w", encoding="utf-8") as f:
        f.write("\n---\n".join(chunks))
    print("replaced", task_id)
