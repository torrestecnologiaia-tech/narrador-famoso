import os
import requests
import base64
import json

TOKEN = os.environ.get("GITHUB_TOKEN")
if not TOKEN:
    raise RuntimeError("Defina GITHUB_TOKEN no ambiente antes de publicar.")

REPO = "narrador-famoso"
# Precisamos descobrir o usuario. Vou tentar obter via API.
user_resp = requests.get("https://api.github.com/user", headers={"Authorization": f"token {TOKEN}"})
USERNAME = user_resp.json()["login"]

print(f"Uploading to {USERNAME}/{REPO}...")

def upload_file(path, rel_path):
    with open(path, "rb") as f:
        content = base64.b64encode(f.read()).decode("utf-8")

    url = f"https://api.github.com/repos/{USERNAME}/{REPO}/contents/{rel_path}"

    # Checar se arquivo ja existe para pegar o sha.
    get_resp = requests.get(url, headers={"Authorization": f"token {TOKEN}"})
    sha = None
    if get_resp.status_code == 200:
        sha = get_resp.json()["sha"]

    data = {
        "message": f"Add {rel_path}",
        "content": content
    }
    if sha:
        data["sha"] = sha

    resp = requests.put(url, headers={"Authorization": f"token {TOKEN}"}, json=data)
    if resp.status_code in [200, 201]:
        print(f"OK {rel_path}")
    else:
        print(f"ERRO {rel_path}: {resp.text}")

# Ignorar pastas grandes e desnecessarias.
IGNORE = ["node_modules", ".git", ".gradle", "build", "venv", "__pycache__", "narrador_famoso_ui_premium_1778707913444.png"]

for root, dirs, files in os.walk("."):
    dirs[:] = [d for d in dirs if d not in IGNORE]

    for file in files:
        if file in IGNORE:
            continue
        path = os.path.join(root, file)
        rel_path = os.path.relpath(path, ".")
        upload_file(path, rel_path)
