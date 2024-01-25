// API link
let backEndLink = "http://sheetdb.io/api/v1/2zmnvwg2pldlh"

//SideNav Mobile Settings
function toggleNav() {
    const sideNav = document.querySelector('.sideNav');
    const overlay = document.querySelector('.overlay');
    const closeButton = document.querySelector('.close-button');

    sideNav.classList.toggle('open');
    if (sideNav.style.left === '0px') {
        sideNav.style.left = '-300px';
        overlay.style.display = 'none';
        closeButton.style.display = 'none';
    } else {
        sideNav.style.left = '0px';
        overlay.style.display = 'block';
        closeButton.style.display = 'block';
    }
}

// select class toggle
function selectButton(button) {
    // Remove 'selected' class from all buttons
    var buttons = document.querySelectorAll('.sideNav button');
    buttons.forEach(function (btn) {
        btn.classList.remove('selected');
    });

    // Add 'selected' class to the clicked button
    button.classList.add('selected');

    // Show/hide the infoBoxMessages div based on the selected button
    var infoBoxMessages = document.getElementById('infoBoxMessages');
    if (button.textContent === 'Messages' && button.classList.contains('selected')) {
        infoBoxMessages.style.display = 'block';
    } else {
        infoBoxMessages.style.display = 'none';
    }

    // Show/hide the infoBoxUsers div based on the selected button
    var infoBoxUsers = document.getElementById('infoBoxUsers');
    if (button.textContent === 'Users' && button.classList.contains('selected')) {
        infoBoxUsers.style.display = 'block';
    } else {
        infoBoxUsers.style.display = 'none';
    }
}

//messeges table
document.addEventListener('DOMContentLoaded', function () {
    const dataChartBody = document.getElementById('dataMessagesChartBody');
    const infoErrorMessages = document.getElementById('infoErrorMessages');

    const messagesPerPage = 15;
    let currentPage = 1;

    // Fetch data from the API endpoint
    fetch(backEndLink)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Display initial set of messages
            displayMessages(data, currentPage, messagesPerPage);

            // Add event listeners to buttons
            const prevButton = document.getElementById('prevButton');
            const nextButton = document.getElementById('nextButton');

            prevButton.addEventListener('click', function () {
                if (currentPage > 1) {
                    currentPage--;
                    displayMessages(data, currentPage, messagesPerPage);
                }
            });

            nextButton.addEventListener('click', function () {
                const totalPages = Math.ceil(data.length / messagesPerPage);
                if (currentPage < totalPages) {
                    currentPage++;
                    displayMessages(data, currentPage, messagesPerPage);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            // Display an error message on the page
            infoErrorMessages.textContent = 'Error fetching data. Please try again later.';
        });

    function createNavigationButton(label, onClick) {
        const button = document.createElement('button');
        button.textContent = label;
        button.addEventListener('click', onClick);
        return button;
    }

    function createDataRow(item) {
        const row = document.createElement('tr');

        // Add columns
        const columns = ['id', 'name', 'email', 'message', 'datetime'];
        columns.forEach(column => {
            const cell = document.createElement('td');
            cell.classList.add(column);

            // Convert 'datetime' to local time
            if (column === 'datetime') {
                const localDateTime = new Date(item[column]).toLocaleString();
                cell.textContent = localDateTime;
            } else {
                cell.textContent = item[column];
            }

            row.appendChild(cell);
        });


        // Add buttons container
        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('buttons-container');

        // Add "Reply" button
        const replyButton = document.createElement('button');
        replyButton.innerHTML = '<i class="fa-solid fa-reply"></i>';
        replyButton.classList.add('reply-button');
        replyButton.addEventListener('click', function () {
            replyToEmail(item.email, item.name);
        });
        buttonsContainer.appendChild(replyButton);

        // Add delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', function () {
            deleteItem(item.id);
        });
        buttonsContainer.appendChild(deleteButton);

        // Add buttons container to the cell
        const buttonsCell = document.createElement('td');
        buttonsCell.appendChild(buttonsContainer);
        row.appendChild(buttonsCell);

        return row;
    }

    function displayMessages(data, page, messagesPerPage) {
        const startIndex = (page - 1) * messagesPerPage;
        const endIndex = startIndex + messagesPerPage;
        const currentPageData = data.slice(startIndex, endIndex);

        // Clear existing rows
        dataChartBody.innerHTML = '';

        // Populate the table with data for the current page
        currentPageData.forEach(item => {
            const row = createDataRow(item);
            dataChartBody.appendChild(row);
        });

        // Update the counter
        const counter = document.getElementById('counter');
        updateCounter(counter, page, data.length);
    }

    function replyToEmail(email, name) {
        const subject = encodeURIComponent('Message from yaakov.store');
        const to = encodeURIComponent(email);
        const body = encodeURIComponent(`Hi ${name},`);

        const gmailLink = `https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&su=${subject}&to=${to}&body=${body}`;

        // Open the link in a new tab
        window.open(gmailLink, '_blank');
    }

    function updateCounter(counterElement, currentPage, totalItems) {
        const totalPages = Math.ceil(totalItems / messagesPerPage);
        const startItem = (currentPage - 1) * messagesPerPage + 1;
        const endItem = Math.min(currentPage * messagesPerPage, totalItems);

        counterElement.textContent = `${startItem} - ${endItem} of ${totalItems}`;
    }

    function deleteItem(itemId) {
        // Send DELETE request to the API endpoint
        fetch(`${backEndLink}/id/${itemId}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                console.log('Item deleted successfully:', data);
                // Refresh the table after deletion
                return fetch(backEndLink);
            })
            .then(response => response.json())
            .then(newData => {
                displayMessages(newData, currentPage, messagesPerPage);
            })
            .catch(error => {
                console.error('Error deleting item:', error);
                alert('Error deleting item.');
            });
    }
});


//users table
document.addEventListener('DOMContentLoaded', function () {
    const dataChartBody = document.getElementById('dataUsersChartBody');
    const infoErrorUsers = document.getElementById('infoErrorUsers');
    const usersPerPage = 15;
    let currentPage = 1;

    // Fetch data from the API endpoint for users
    // const backEndLinkUsers = `${backEndLink}?sheet=users`;
    fetch(`${backEndLink}?sheet=users`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Display initial set of users
            displayUsers(data, currentPage, usersPerPage);

            // Add event listeners to buttons
            const prevButton = document.getElementById('UsersPrevButton');
            const nextButton = document.getElementById('UsersNextButton');

            prevButton.addEventListener('click', function () {
                if (currentPage > 1) {
                    currentPage--;
                    displayUsers(data, currentPage, usersPerPage);
                }
            });

            nextButton.addEventListener('click', function () {
                const totalPages = Math.ceil(data.length / usersPerPage);
                if (currentPage < totalPages) {
                    currentPage++;
                    displayUsers(data, currentPage, usersPerPage);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            // Display an error message on the page
            infoErrorUsers.textContent = 'Error fetching data. Please try again later.';
        });

    function createDataRowUser(user) {
        const row = document.createElement('tr');

        // Add columns
        const columns = ['id', 'username', 'email', 'password', 'role', 'active', 'newsletter'];
        columns.forEach(column => {
            const cell = document.createElement('td');
            cell.classList.add(column);
            cell.textContent = user[column];
            row.appendChild(cell);
        });

        // Add buttons container
        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('buttons-container');

        // Add "Reply" button (using user data for reply, modify as needed)
        const replyButton = document.createElement('button');
        replyButton.innerHTML = '<i class="fa-solid fa-reply"></i>';
        replyButton.classList.add('reply-button');
        replyButton.addEventListener('click', function () {
            // Example: replyToEmail(user.email, user.username);
            console.log('Reply button clicked for user:', user);
        });
        buttonsContainer.appendChild(replyButton);

        // Add delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', function () {
            deleteUser(user.id);
        });
        buttonsContainer.appendChild(deleteButton);

        // Add buttons container to the cell
        const buttonsCell = document.createElement('td');
        buttonsCell.appendChild(buttonsContainer);
        row.appendChild(buttonsCell);

        return row;
    }

    function displayUsers(data, page, usersPerPage) {
        const startIndex = (page - 1) * usersPerPage;
        const endIndex = startIndex + usersPerPage;
        const currentPageData = data.slice(startIndex, endIndex);

        // Clear existing rows
        dataChartBody.innerHTML = '';

        // Populate the table with data for the current page
        currentPageData.forEach(user => {
            const row = createDataRowUser(user);
            dataChartBody.appendChild(row);
        });

        // Update the counter
        const counter = document.getElementById('UsersCounter');
        updateCounter(counter, page, data.length);
    }

    function deleteUser(userId) {
        // Send DELETE request to the API endpoint for users
        fetch(`${backEndLink}/id/${userId}?sheet=users`, {
            method: 'DELETE',
            credentials: 'include',
            redirect: 'follow'
        })
            .then(response => response.json())
            .then(data => {
                console.log('User deleted successfully:', data);
                // Refresh the table after deletion
                return fetch(`${backEndLink}?sheet=users`);
            })
            .then(response => response.json())
            .then(newData => {
                displayUsers(newData, currentPage, usersPerPage);
            })
            .catch(error => {
                console.error('Error deleting user:', error);
                alert('Error deleting user.');
            });
    }

    function updateCounter(counterElement, currentPage, totalItems) {
        const totalPages = Math.ceil(totalItems / usersPerPage);
        const startItem = (currentPage - 1) * usersPerPage + 1;
        const endItem = Math.min(currentPage * usersPerPage, totalItems);

        counterElement.textContent = `${startItem} - ${endItem} of ${totalItems}`;
    }
});
