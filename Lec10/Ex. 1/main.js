function calculateDays() {
  const amount = parseFloat(document.getElementById("amount").value);
  const dayLimit = parseFloat(document.getElementById("dayLimit").value);
  const weekLimit = parseFloat(document.getElementById("weekLimit").value);

  if (
    isNaN(amount) ||
    isNaN(dayLimit) ||
    isNaN(weekLimit) ||
    amount <= 0 ||
    dayLimit <= 0 ||
    weekLimit <= 0
  ) {
    document.getElementById("result").textContent =
      "Please enter valid positive numbers for all fields.";
    return;
  }

  let days = 0;
  let remainingAmount = amount;
  let weeklyAmount = 0;

  while (remainingAmount > 0) {
    if (weeklyAmount >= weekLimit) {
      days += 7 - (days % 7);
      weeklyAmount = 0;
    }

    let dailyWithdrawal = Math.min(
      dayLimit,
      remainingAmount,
      weekLimit - weeklyAmount
    );
    remainingAmount -= dailyWithdrawal;
    weeklyAmount += dailyWithdrawal;
    days++;
  }

  document.getElementById(
    "result"
  ).textContent = `Days needed to withdraw the amount: ${days}`;
}
