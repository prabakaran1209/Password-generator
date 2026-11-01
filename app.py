from flask import Flask, render_template, request, jsonify
import secrets
import string

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/generate", methods=["POST"])
def generate_password():
    data = request.get_json()

    length = int(data.get("length", 16))
    uppercase = data.get("uppercase", True)
    lowercase = data.get("lowercase", True)
    numbers = data.get("numbers", True)
    symbols = data.get("symbols", True)

    if not 8 <= length <= 64:
        return jsonify({"error": "Length must be between 8 and 64"}), 400

    characters = ""
    password = []

    if uppercase:
        characters += string.ascii_uppercase
        password.append(secrets.choice(string.ascii_uppercase))

    if lowercase:
        characters += string.ascii_lowercase
        password.append(secrets.choice(string.ascii_lowercase))

    if numbers:
        characters += string.digits
        password.append(secrets.choice(string.digits))

    if symbols:
        characters += "!@#$%^&*()-_=+[]{}?"

        password.append(secrets.choice("!@#$%^&*()-_=+[]{}?"))

    if not characters:
        return jsonify({"error": "Select at least one character type"}), 400

    remaining = length - len(password)

    password.extend(
        secrets.choice(characters)
        for _ in range(remaining)
    )

    secrets.SystemRandom().shuffle(password)

    return jsonify({
        "password": "".join(password)
    })


if __name__ == "__main__":
    app.run(debug=True)
