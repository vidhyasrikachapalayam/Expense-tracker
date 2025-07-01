let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function updateBalance() {
  const balance = document.getElementById("balance");
  const amounts = transactions.map(t => t.amount);
  const total = amounts.reduce((acc, val) => acc + val, 0).toFixed(2);
  balance.innerText = Number(total).toLocaleString('en-IN');
}

function updateList() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  transactions.forEach((t, index) => {
    const li = document.createElement("li");
    if (t.amount > 0) li.classList.add("income");
    else if (t.amount < 0) li.classList.add("expense");

    li.innerHTML = `
      ${t.text} <span>₹${Number(t.amount).toLocaleString('en-IN')}</span>
      <button onclick="deleteTransaction(${index})">X</button>
    `;
    list.appendChild(li);
  });
}

function addTransaction() {
  const text = document.getElementById("text").value.trim();
  const amountInput = document.getElementById("amount").value.trim();
  const amount = parseFloat(amountInput);

  if (text === "" || isNaN(amount)) {
    alert("Please enter a valid description and amount.");
    return;
  }

  transactions.push({ text, amount });
  localStorage.setItem("transactions", JSON.stringify(transactions));

  document.getElementById("text").value = "";
  document.getElementById("amount").value = "";

  updateBalance();
  updateList();
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  updateBalance();
  updateList();
}

// Load on page
updateBalance();
updateList();
