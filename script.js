
const passwordInput = document.getElementById("password");
const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const message = document.getElementById("message");

const strengthText = document.getElementById("strengthText");
const strengthFill = document.getElementById("strengthFill");
const strengthBar = document.getElementById("strengthBar");

// Character sets
const characterSets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()-_=+[]{}?"
};

// Update length display
lengthSlider.addEventListener("input", () => {
    lengthValue.textContent = lengthSlider.value;
});

// Cryptographically secure, unbiased random integer
function secureRandomInt(max) {
    if (!Number.isSafeInteger(max) || max < 1 ||
        max > 4294967296) {
        throw new Error("Invalid random range.");
    }

    const range = 4294967296;
    const limit = range - (range % max);
    const values = new Uint32Array(1);

    do {
        crypto.getRandomValues(values);
    } while (values[0] >= limit);

    return values[0] % max;
}

// Securely shuffle an array
function secureShuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = secureRandomInt(i + 1);

        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

// Generate password
function generatePassword() {

    const length = Number(lengthSlider.value);

    const selectedSets = [];

    for (const [id, characters] of Object.entries(characterSets)) {

        const checkbox = document.getElementById(id);

        if (checkbox.checked) {
            selectedSets.push(characters);
        }
    }

    // Validate options
    if (selectedSets.length === 0) {
        showMessage("Select at least one character type!", true);
        return;
    }

    if (length < selectedSets.length) {
        showMessage(
            "Password length must cover every selected character type.",
            true
        );
        return;
    }

    try {
        let password = [];

        // Guarantee at least one character from every selected set
        for (const set of selectedSets) {
            password.push(set[secureRandomInt(set.length)]);
        }

        // Combine selected character sets
        const allCharacters = selectedSets.join("");

        // Fill remaining positions
        while (password.length < length) {
            const index = secureRandomInt(allCharacters.length);

            password.push(allCharacters[index]);
        }

        // Shuffle password
        password = secureShuffle(password);

        // Display password
        const finalPassword = password.join("");

        passwordInput.value = finalPassword;

        updateStrength(finalPassword, allCharacters.length);

        showMessage("Password generated successfully!");

        copyBtn.textContent = "Copy";

    } catch (error) {
        showMessage("Secure random generation is unavailable.", true);
    }
}

// Estimate strength using length and character pool.
// This is an estimate, not a guarantee of security.
function updateStrength(password, poolSize) {

    const entropy = password.length * Math.log2(poolSize);

    let strength;
    let percentage;
    let color;

    if (entropy < 40) {
        strength = "Weak";
        percentage = 25;
        color = "#f87171";
    } else if (entropy < 60) {
        strength = "Medium";
        percentage = 50;
        color = "#facc15";
    } else if (entropy < 80) {
        strength = "Strong";
        percentage = 75;
        color = "#60a5fa";
    } else {
        strength = "Very Strong";
        percentage = 100;
        color = "#4ade80";
    }

    strengthText.textContent = strength;

    strengthFill.style.width = percentage + "%";
    strengthFill.style.background = color;

    strengthBar.setAttribute("aria-valuenow", percentage);
}

// Copy password
async function copyPassword() {

    const password = passwordInput.value;

    if (!password) {
        showMessage("Generate a password first!", true);
        return;
    }

    try {
        await navigator.clipboard.writeText(password);

        copyBtn.textContent = "Copied!";
        showMessage("Password copied successfully!");

        setTimeout(() => {
            copyBtn.textContent = "Copy";
        }, 1800);

    } catch (error) {
        showMessage(
            "Clipboard unavailable. Please copy the password manually.",
            true
        );
    }
}

// Display messages
function showMessage(text, isError = false) {

    message.textContent = text;

    message.style.color = isError
        ? "#f87171"
        : "#4ade80";
}

// Button events
generateBtn.addEventListener("click", generatePassword);
copyBtn.addEventListener("click", copyPassword);

// Generate initial password
generatePassword();
