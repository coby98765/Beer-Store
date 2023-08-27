const form = document.getElementById('sheetdb-form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let formData = new FormData(document.getElementById('sheetdb-form'))
    let name = formData.get('data[name]')
    let email = formData.get('data[email]')
    let message = formData.get('data[message]')
    console.log(name, email, message);
    fetch(form.action, {
        method: 'POST',
        body: {
            name,
            email,
            message,
        }
    }).then(
        response => response.json()
    ).then((html) => {
        alert("Message Sent!");
    }).catch((html) => {
        alert("Message Not Sent!");
    });
});