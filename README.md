# 🔐 SecurePass – Password Generator

A modern, responsive, and secure password generator built using **HTML, CSS, and JavaScript**. SecurePass helps users create strong, random passwords instantly with customizable options and a password strength indicator.

## 🌐 Live Demo

**[🚀 View SecurePass Live](https://prabakaran1209.github.io/Password-generator/)**

## 📌 About the Project

SecurePass is a browser-based password generator designed to make password creation simple, fast, and secure.

Users can customize password length, select different character types, generate strong passwords, and copy them instantly to the clipboard.

The application uses JavaScript's cryptographically secure random number generator to generate passwords directly in the browser without requiring a backend server.

## ✨ Features

- 🔐 Secure random password generation
- 📏 Adjustable password length (8–64 characters)
- 🔠 Uppercase letters (A–Z)
- 🔡 Lowercase letters (a–z)
- 🔢 Numbers (0–9)
- 🔣 Special characters and symbols
- 📊 Password strength indicator
- 📋 One-click copy to clipboard
- 🎨 Modern dark-themed user interface
- 📱 Fully responsive design
- ⚡ Fast and lightweight application
- 🌐 GitHub Pages deployment support

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Website structure |
| CSS3 | Styling and responsive UI |
| JavaScript | Password generation and functionality |
| Web Crypto API | Secure random number generation |
| GitHub Pages | Website hosting |

## 📂 Project Structure

```text
Password-generator/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## ⚙️ How It Works

1. Select your desired password length.
2. Choose uppercase letters, lowercase letters, numbers, and symbols.
3. Click the **Generate Password** button.
4. View your randomly generated password.
5. Check the password strength indicator.
6. Click **Copy** to copy your password instantly.

## 🚀 Run Locally

**Step 1: Clone the repository**

```bash
git clone https://github.com/prabakaran1209/Password-generator.git
```

**Step 2: Navigate to the project folder**

```bash
cd Password-generator
```

**Step 3: Open the application**

Open `index.html` in your browser or use the VS Code Live Server extension.

No backend installation or additional dependencies are required.

## 🌍 Deployment

This project is deployed using GitHub Pages.

Live Website:

https://prabakaran1209.github.io/Password-generator/

## 🔒 Security

- Uses `crypto.getRandomValues()` for cryptographically secure random values.
- Uses unbiased random selection and secure array shuffling.
- Generates passwords directly in the user's browser.
- Does not send generated passwords to an external backend.
- Does not store generated passwords on a server.

**Note:** The password strength indicator provides an estimated strength based on password length and character pool size. Always use unique passwords for different accounts.

## 🎯 Project Objective

The main objective of SecurePass is to provide users with a simple and effective tool for generating strong passwords while promoting better password security practices.

## 🔮 Future Enhancements

- Generate multiple passwords simultaneously.
- Add password history with optional local storage.
- Add light and dark themes.
- Add password visibility toggle.
- Add downloadable password lists.

## 👨‍💻 Author

**Prabakaran**

GitHub: [@prabakaran1209](https://github.com/prabakaran1209)

## ⭐ Support

If you find this project useful, please consider giving this repository a ⭐ on GitHub.

---

**Built with ❤️ using HTML, CSS & JavaScript.**
