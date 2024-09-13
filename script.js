const form = document.getElementById('form');
const result = document.getElementById('result');
const cardNumberInput = document.getElementById('cardNumber');
const expiryDateInput = document.getElementById('expiryDate');
const cvvInput = document.getElementById('cvv');

cardNumberInput.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, ''); 
    value = value.replace(/(.{4})/g, '$1 '); 
    e.target.value = value.trim(); 
});

cvvInput.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, ''); 
    e.target.value = value;
});


expiryDateInput.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, ''); 
    if (value.length > 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4); 
    }
    e.target.value = value;
});


form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        cardNumber: formData.get('cardNumber'),
        expiryDate: formData.get('expiryDate'),
        cvv: formData.get('cvv')
    };

    try {
        const response = await fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(data),
        });

        const resultText = await response.text();
        result.textContent = resultText;
    } catch (error) {
        console.error('Erro:', error);
        result.textContent = 'Erro ao enviar os dados.';
    }

   
    form.reset();
});
