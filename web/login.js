function ageGatedLogin() {
    // Get input values
    const userId = document.getElementById('ageUserId').value;
    const ethereumId = document.getElementById('ageEthereumId').value;
    // Send data to backend for age gated login
    fetch('/age-gated-login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, ethereumId })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('ageResult').innerText = data.message;
    })
    .catch(error => console.error('Error:', error));
}

function nonAgeGatedLogin() {
    // Get input values
    const userId = document.getElementById('nonAgeUserId').value;
    const ethereumId = document.getElementById('nonAgeEthereumId').value;
    // Send data to backend for non-age gated login
    fetch('/non-age-gated-login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, ethereumId })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('nonAgeResult').innerText = data.message;
    })
    .catch(error => console.error('Error:', error));
}
