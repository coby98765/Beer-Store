const form = document.getElementById('sheetdb-form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
    }).then(
        response => response.json()
    ).then((html) => {
        alert("Message Sent!");
    })
});