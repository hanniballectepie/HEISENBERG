// Lista de transações para simulação (pode vir de LocalStorage ou API)
let transactions = [
    { description: "Compra supermercado", amount: 150.00, type: "saída", date: "12/05/2025 15:30:00" },
    { description: "Venda produto", amount: 300.00, type: "entrada", date: "12/05/2025 17:00:00" },
    { description: "Aluguel", amount: 1200.00, type: "saída", date: "10/05/2025 10:00:00" }
];

// Calcular o saldo
let balance = transactions.reduce((acc, transaction) => {
    return transaction.type === 'entrada' ? acc + transaction.amount : acc - transaction.amount;
}, 0);

// Exibindo as transações no HTML
const transactionList = document.getElementById('transaction-list');
transactions.forEach(transaction => {
    const listItem = document.createElement('li');
    listItem.innerText = `${transaction.description}: R$${transaction.amount.toFixed(2)} (${transaction.type}) - ${transaction.date}`;
    transactionList.appendChild(listItem);
});

// Função para exportar o extrato em .txt
document.getElementById('export-extract').addEventListener('click', function() {
    if (transactions.length === 0) {
        alert("Não há transações para exportar.");
        return;
    }

    let extract = `Extrato do Mês\n\n`;

    // Adicionando transações ao extrato
    transactions.forEach(transaction => {
        extract += `${transaction.description}: R$${transaction.amount.toFixed(2)} (${transaction.type}) - ${transaction.date}\n`;
    });

    // Adicionando saldo final
    extract += `\nSaldo Final: R$${balance.toFixed(2)}`;

    // Criando um Blob com os dados do extrato
    const blob = new Blob([extract], { type: 'text/plain' });

    // Criando um link para download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob); // Criando o URL para o Blob
    link.download = 'extrato_do_mes.txt'; // Nome do arquivo
    link.click(); // Inicia o download
});
