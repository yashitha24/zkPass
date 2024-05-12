document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Get form values
    const name = document.getElementById('name').value;
    const dob = document.getElementById('dob').value;
    const address = document.getElementById('address').value;
    const password = document.getElementById('password').value;
    
    // Generate random ethereumId
    const ethereumId = generateEthereumId();

    // Send form data to backend for registration
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, dob, address, password, ethereumId })
    })
    .then(response => response.json())
    .then(data => {
        alert(`Registration successful!\nUser ID: ${data.userId}\nEthereum ID: ${data.ethereumId}`);
    })
    .catch(error => console.error('Error:', error));
});

// Function to generate ethereumId
function generateEthereumId() {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let ethereumId = '';
    for (let i = 0; i < 42; i++) {
        ethereumId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return ethereumId;
}