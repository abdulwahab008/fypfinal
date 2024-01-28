const editPictureLink = document.getElementById('edit-picture');
    const pictureUpload = document.getElementById('picture-upload');
    const userSection = document.querySelector('.user-section');
    userSection.addEventListener('click', () => {
      userSection.classList.toggle('active');
    });

    editPictureLink.addEventListener('click', (event) => {
      event.preventDefault();
      pictureUpload.click();
    });

    pictureUpload.addEventListener('change', (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const imageURL = e.target.result;
        userSection.querySelector('.user-picture').style.backgroundImage = `url(${imageURL})`;
      };

      reader.readAsDataURL(file);
    });

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
    
  