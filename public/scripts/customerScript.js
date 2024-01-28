document.addEventListener('DOMContentLoaded', function () {
    fetchCustomerData();

    var searchButton = document.getElementById('searchButton');
    if (searchButton) {
        searchButton.addEventListener('click', searchAndHighlight);
    }

    var customerForm = document.getElementById('customerForm');
    if (customerForm) {
        customerForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the default form submission behavior
            createCustomer();
        });
    }
});

async function fetchCustomerData() {
    try {
        const response = await fetch('/customers/all');
        const customers = await response.json();

        const tableBody = document.querySelector('#customerTable tbody');
        tableBody.innerHTML = '';

        customers.forEach(customer => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${customer.name || ''}</td>
                <td>${customer.address || ''}</td>
                <td>${customer.cnic || ''}</td>
                <td>${customer.phone_number !== null && customer.phone_number !== undefined ? customer.phone_number : ''}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error(error);
    }
}

async function createCustomer() {
    try {
        const form = document.getElementById('customerForm');
        const nameInput = document.getElementById('name');
        const cnicInput = document.getElementById('cnic');
        const phoneInput = document.getElementById('phone');

        if (!nameInput.value.trim()) {
            alert('Name cannot be empty');
            return;
        }
        const cnicPattern = /^[0-9]{13}$/;
        if (!cnicPattern.test(cnicInput.value)) {
            alert('Please enter a valid 14-digit CNIC');
            return;
        }

        const phonePattern = /^[0-9]{11}$/;
if (!phonePattern.test(phoneInput.value)) {
    alert('Please enter a valid 11-digit phone number (e.g., 03331234567)');
    return;
}
        const formData = new FormData(form);

        const response = await fetch('/customers/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Object.fromEntries(formData)),
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message);
            fetchCustomerData();
        } else {
            const errorData = await response.json();
            console.error('Failed to create customer:', errorData.error);
            alert('Failed to create customer. Please check your input.');
        }
    } catch (error) {
        console.error(error);
        alert('An error occurred while processing your request.');
    }
}
function searchAndHighlight() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const tableRows = document.querySelectorAll('#loanTableBody tr');
    let found = false;
    tableRows.forEach(row => {
        const rowContent = row.textContent.toLowerCase();
        if (rowContent.includes(searchTerm)) {
            // Highlight the entire row or specific cells as needed
            row.style.backgroundColor = '#d35400';
            row.scrollIntoView({ behavior: 'smooth', block: 'center' });
            found = true; 
        } else {
            row.style.backgroundColor = ''; // Reset background color
        }
    });
    if (!found) {
        alert('Term not found!');
    }
}

window.addEventListener('load', function () {
    // Fetch user information from the server
    fetch('/api/users/current')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Unauthorized');
            }
        })
        .then(data => {
            // Update the user name in the dashboard
            document.getElementById('username-display').innerText = data.user.name;

            // Store user data in session storage
            sessionStorage.setItem('currentUser', JSON.stringify(data.user));
        })
        .catch(error => {
            // Handle unauthorized access, e.g., redirect to the login page
            window.location.href = '/login.html'; // Adjust the URL based on your project structure
        });
});