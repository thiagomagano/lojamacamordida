
const apiURL = "https://macamordida-server.herokuapp.com/subscribe" // "http://localhost:3333/subscribe";
const form = document.querySelector('form');
const formTitle = document.querySelector('.form-title');
const formSubTitle = document.querySelector('.form-sub-title');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = formData.get('name').toString();
    const gender = !formData.get('gender') ? 'Outro' : formData.get('gender');
    const email = formData.get('email').toString();
    const phone = formData.get('phone').toString();

    if (name.trim() && email.trim()) {
        form.style.display = 'none';
        formTitle.textContent = 'Muito Obrigado!';
        formSubTitle.textContent = 'Estamos ansiosas para lhe conhecer 🥰';

        const user = {
            name,
            gender,
            email,
            phone,
        }

        fetch(apiURL,
            {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(response => {
                if (!response.ok) {
                    const contentType = response.headers.get('content-type');
                    if (contentType.includes('json')) {
                        return response.json().then(error => Promise.reject(error.message));
                    } else {
                        return response.text().then(message => Promise.reject(message));
                    }
                }
            })
    }
})