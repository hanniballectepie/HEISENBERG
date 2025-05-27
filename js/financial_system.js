let balance = 0;
let transactions = [];

document.getElementById('financial-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('transaction-type').value;
    const description = document.getElementById('description').value;

    // Obtendo a data e hora atual
    const currentDate = new Date();
    const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

    if (type === 'entrada') {
        balance += amount;
    } else if (type === 'saída') {
        balance -= amount;
    }

    document.getElementById('monthly-balance').innerText = `R$${balance.toFixed(2)}`;

    // Adicionando a transação à lista
    const transactionList = document.getElementById('transaction-list');
    const listItem = document.createElement('li');
    listItem.innerText = `${description}: R$${amount.toFixed(2)} (${type}) - ${formattedDate}`;  // Adicionando data e hora
    transactionList.appendChild(listItem);

    transactions.push({ description, amount, type, date: formattedDate });

    document.getElementById('amount').value = '';
    document.getElementById('description').value = '';
});
