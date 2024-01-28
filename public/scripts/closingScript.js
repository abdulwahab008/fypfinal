
function getCurrentDate() {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = String(currentDate.getMonth() + 1).padStart(2, '0');
    var day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

document.addEventListener('DOMContentLoaded', function () {
    var dateInput = document.getElementById('date');
    dateInput.value = getCurrentDate();
    const submit=document.getElementById('submit');
    if(submit){
        submit.addEventListener('click', saveClosing)
    }
    const backButton=document.getElementById('back-button');
    if(backButton){
        backButton.addEventListener("click",goBack);
    }
});


function saveClosing(event) {
    event.preventDefault();

    // Get form data
    var date = getCurrentDate();
    var telenorLoad = parseFloat(document.getElementById('telenorLoad').value) || 0;
    var zongLoad = parseFloat(document.getElementById('zongLoad').value) || 0;
    var jazzLoad = parseFloat(document.getElementById('jazzLoad').value) || 0;
    var ufoneLoad = parseFloat(document.getElementById('ufoneLoad').value) || 0;
    var easypaisa = parseFloat(document.getElementById('easypaisa').value) || 0;
    var jazzCash = parseFloat(document.getElementById('jazzCash').value) || 0;
    var loan = parseFloat(document.getElementById('loan').value) || 0;
    var cash = parseFloat(document.getElementById('cash').value) || 0;
    var bank = parseFloat(document.getElementById('bank').value) || 0;
    var credit = parseFloat(document.getElementById('credit').value) || 0;

    var total = (telenorLoad + zongLoad + jazzLoad + ufoneLoad + easypaisa + jazzCash + loan + cash + bank) - credit;

    var closingData = {
        date: date,
        telenorLoad: telenorLoad,
        zongLoad: zongLoad,
        jazzLoad:jazzLoad,
        ufoneLoad: ufoneLoad,
        easypaisa: easypaisa,
        jazzCash: jazzCash,
        loan: loan,
        cash: cash,
        bank: bank,
        credit: credit,
        total: total,
    };

    fetch('/api/closings/saveClosing', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(closingData),
    })
    .then(response => response.json())
    .then(data => {
      
        console.log('Closing saved successfully:', data);
        fetchClosingData();
    })
    .catch(error => {
        console.error('Error saving closing:', error);
    });
}

function fetchClosingData() {
    fetch('/api/closings/getAllClosing')
        .then(response => response.json())
        .then(data => {
      
            document.getElementById('closingTableBody').innerHTML = '';

           
            data.forEach(closing => {
                var row = document.createElement('tr');
                row.innerHTML = `
                    <td>${closing.date}</td>
                    <td>${closing.telenorLoad}</td>
                    <td>${closing.zongLoad}</td>
                    <td>${closing.jazzLoad}</td>
                    <td>${closing.ufoneLoad}</td>
                    <td>${closing.easypaisa}</td>
                    <td>${closing.jazzCash}</td>
                    <td>${closing.loan}</td>
                    <td>${closing.cash}</td>
                    <td>${closing.bank}</td>
                    <td>${closing.credit}</td>
                    <td>${closing.total}</td>
                `;
                document.getElementById('closingTableBody').appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching closing data:', error);
        });
}

// Call the function to fetch and display data when the page loads
document.addEventListener('DOMContentLoaded', function () {
    fetchClosingData();
});

function goBack() {
    window.history.back();
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