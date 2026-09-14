import os
from flask import Flask, send_from_directory

# Инициализация приложения Flask
# static_folder='.' позволяет отдавать файлы css, js, assets напрямую
app = Flask(__name__, static_folder='.', static_url_path='')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

@app.route('/')
def home():
    """Главная страница портфолио"""
    return send_from_directory(BASE_DIR, 'index.html')

@app.route('/<path:path>')
def static_proxy(path):
    """Раздача статичных файлов (css, js, assets и т.д.)"""
    return send_from_directory(BASE_DIR, path)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"Сервер портфолио запущен: http://127.0.0.1:{port}")
    app.run(host='0.0.0.0', port=port, debug=True)
