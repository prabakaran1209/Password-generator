const lengthSlider = document.getElementById("length");

lengthSlider.addEventListener("input", () => {
    document.getElementById("lengthValue").textContent =
        lengthSlider.value;
});


async function generatePassword() {

    const message = document.getElementById("message");

    const options = {
        length: Number(lengthSlider.value),
        uppercase: document.getElementById("uppercase").checked,
        lowercase: document.getElementById("lowercase").checked,
        numbers: document.getElementById("numbers").checked,
        symbols: document.getElementById("symbols").checked
    };

    if (!Object.values(options).slice(1).some(Boolean)) {
        message.style.color = "#f87171";
        message.textContent = "Please select at least one option!";
        return;
    }

    message.style.color = "#a78bfa";
    message.textContent = "Generating secure password...";

    try {
        const response = await fetch("/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(options)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Generation failed");
        }

        document.getElementById("password").value = data.password;

        updateStrength(data.password);

        message.style.color = "#4ade80";
        message.textContent = "Password generated successfully!";

    } catch (error) {
        message.style.color = "#f87171";
        message.textContent = error.message;
    }
}


async function copyPassword() {

    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    if (!password) {
        message.textContent = "Generate a password first!";
        return;
    }

    try {
        await navigator.clipboard.writeText(password);

        message.style.color = "#4ade80";
        message.textContent = "Password copied successfully!";

        document.getElementById("copyBtn").textContent = "Copied!";

        setTimeout(() => {
            document.getElementById("copyBtn").textContent = "Copy";
        }, 1500);

    } catch {
        message.style.color = "#f87171";
        message.textContent = "Clipboard access failed. Copy manually.";
    }
}


function updateStrength(password) {

    let score = 0;

    if (password.length >= 12) score++;
    if (password.length >= 16) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    let strength = "Weak";
    let percentage = 25;

    if (score >= 3) {
        strength = "Medium";
        percentage = 50;
    }

    if (score >= 5) {
        strength = "Strong";
        percentage = 75;
    }

    if (score === 6 && password.length >= 16) {
        strength = "Very Strong";
        percentage = 100;
    }

    document.getElementById("strengthText").textContent = strength;

    document.getElementById("strengthFill").style.width =
        percentage + "%";
}


// Generate a password automatically when the page loads.
generatePassword();
