function validateForm() {
    // You can add any specific validation logic here if needed.
    return true;
}
function performLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log('Username:', username);
    console.log('Password:', password);

    // Validate the form
    if (!validateForm()) {
        return false;
    }
    
    fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
        }),
    
    
    
    })
    .then(response => response.json())
    .then(data => {
        if (data.redirectTo) {
            window.location.href = data.redirectTo;
        } else {
            document.getElementById('errorMessage').innerHTML = 'Incorrect credentials. Please try again.';
            console.log('Handle other responses:', data);
            setTimeout(() => {
                location.reload();
            }, 2000);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

