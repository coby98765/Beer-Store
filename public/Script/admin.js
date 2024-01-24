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
}


document.addEventListener('DOMContentLoaded', function () {
    const dataChartBody = document.getElementById('dataMessagesChartBody');
    const messagesPerPage = 15;
    let currentPage = 1;

    // Fetch data from the API endpoint
    fetch('https://sheetdb.io/api/v1/2zmnvwg2pldlh')
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
            const errorMessage = document.createElement('div');
            errorMessage.textContent = 'Error fetching data. Please try again later.';
            document.body.appendChild(errorMessage);
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

            // Convert 'datetime' to local time
            if (column === 'datetime') {
                const localDateTime = new Date(item[column]).toLocaleString();
                cell.textContent = localDateTime;
            } else {
                cell.textContent = item[column];
            }

            row.appendChild(cell);
        });

        // Add "Reply" button
        const replyButtonCell = document.createElement('td');
        const replyButton = document.createElement('button');
        replyButton.innerHTML = '<i class="fa-solid fa-reply"></i>';
        replyButton.classList.add('reply-button');
        replyButton.addEventListener('click', function () {
            replyToEmail(item.email,item.name);
        });
        replyButtonCell.appendChild(replyButton);
        row.appendChild(replyButtonCell);

        // Add delete button
        const deleteButtonCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', function () {
            deleteItem(item.id);
        });
        deleteButtonCell.appendChild(deleteButton);
        row.appendChild(deleteButtonCell);

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
        fetch(`https://sheetdb.io/api/v1/2zmnvwg2pldlh/id/${itemId}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                console.log('Item deleted successfully:', data);
                // Refresh the table after deletion
                return fetch('https://sheetdb.io/api/v1/2zmnvwg2pldlh');
            })
            .then(response => response.json())
            .then(newData => {
                displayMessages(newData, currentPage, messagesPerPage);
            })
            .catch(error => {
                console.error('Error deleting item:', error);
            });
    }
});
