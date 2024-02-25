import subprocess

def ejecutar_servidor():
    try:
        subprocess.run(["python", "-m", "flask", "--app", "internal/server.py", "run", "--debug"])
    except FileNotFoundError:
        print("No se encontró el archivo server.py. Asegúrate de que esté en la ubicación correcta.")

if __name__ == "__main__":
    ejecutar_servidor()
