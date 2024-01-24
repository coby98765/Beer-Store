const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Add current date and time
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString();

        // Prepare data in the desired structure
        const postData = {
            id: "INCREMENT",
            name: name,
            email: email,
            message: message,
            datetime: formattedDate,
        };

        // Post data to the API endpoint
        fetch('https://sheetdb.io/api/v1/2zmnvwg2pldlh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Data submitted successfully:', data);
                alert('Message Sent!');
            })
            .catch(error => {
                console.error('Error submitting data:', error);
                alert('Error. Please try again.');
            });
    });
