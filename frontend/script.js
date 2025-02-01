async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('https://your-backend.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('token', data.token);
        window.location.href = 'sales_tracker.html';
    } else {
        document.getElementById('error-message').textContent = data.error;
    }
}

function updateSales() {
    const numDrums210 = parseInt(document.getElementById('sales-input-210').value);
    const numDrums25 = parseInt(document.getElementById('sales-input-25').value);

    const revenue210 = numDrums210 * 550;
    const revenue25 = numDrums25 * 55;
    const totalRevenue = revenue210 + revenue25;

    const costOfGoods210 = numDrums210 * 150;
    const costOfGoods25 = numDrums25 * 23;
    const stockingTransport = 150;
    const deliveryTransport210 = numDrums210 * 120;
    const deliveryTransport25 = numDrums25 * 12;

    const totalExpenses210 = costOfGoods210 + stockingTransport + deliveryTransport210;
    const totalExpenses25 = costOfGoods25 + stockingTransport + deliveryTransport25;
    const totalExpenses = totalExpenses210 + totalExpenses25;

    const netProfit210 = revenue210 - totalExpenses210;
    const netProfit25 = revenue25 - totalExpenses25;
    const netProfit = totalRevenue - totalExpenses;

    // Update summary table
    document.getElementById('total-revenue-210').textContent = revenue210;
    document.getElementById('total-revenue-25').textContent = revenue25;
    document.getElementById('total-revenue').textContent = totalRevenue;

    document.getElementById('total-expenses-210').textContent = totalExpenses210;
    document.getElementById('total-expenses-25').textContent = totalExpenses25;
    document.getElementById('total-expenses').textContent = totalExpenses;

    document.getElementById('net-profit-210').textContent = netProfit210;
    document.getElementById('net-profit-25').textContent = netProfit25;
    document.getElementById('net-profit').textContent = netProfit;

    // Update 210L table
    const data210 = [
        { category: 'Revenue', description: 'Sales Revenue (210L)', unitPrice: 550, amount: revenue210 },
        { category: 'Expenses', description: 'Cost of Goods Sold (210L)', unitPrice: 150, amount: costOfGoods210 },
        { category: '', description: 'Stocking Transport', unitPrice: 150, amount: stockingTransport },
        { category: '', description: 'Delivery Transport (210L)', unitPrice: 120, amount: deliveryTransport210 }
    ];

    const tableBody210 = document.getElementById('data-table-210');
    tableBody210.innerHTML = '';
    data210.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${row.category}</td><td>${row.description}</td><td>${row.unitPrice}</td><td>${row.amount}</td>`;
        tableBody210.appendChild(tr);
    });

    // Update 25L table
    const data25 = [
        { category: 'Revenue', description: 'Sales Revenue (25L)', unitPrice: 55, amount: revenue25 },
        { category: 'Expenses', description: 'Cost of Goods Sold (25L)', unitPrice: 23, amount: costOfGoods25 },
        { category: '', description: 'Stocking Transport', unitPrice: 150, amount: stockingTransport },
        { category: '', description: 'Delivery Transport (25L)', unitPrice: 12, amount: deliveryTransport25 }
    ];

    const tableBody25 = document.getElementById('data-table-25');
    tableBody25.innerHTML = '';
    data25.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${row.category}</td><td>${row.description}</td><td>${row.unitPrice}</td><td>${row.amount}</td>`;
        tableBody25.appendChild(tr);
    });
}

// Initialize values
updateSales();