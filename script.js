const salePriceInput = document.querySelector("#salePrice");
const marginPercentInput = document.querySelector("#marginPercent");
const purchasePriceInput = document.querySelector("#purchasePrice");
const marginAmountInput = document.querySelector("#marginAmount");
const totalCostLabel = document.querySelector("#totalCost");
const prepCostInput = document.querySelector("#prepCost");

function parseNumber(value) {
  const normalized = value.replace(/\s+/g, "").replace(",", ".");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatMoney(value) {
  return new Intl.NumberFormat("ru-RU").format(Math.round(value));
}

function formatPercent(value) {
  return new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function recalculate() {
  const salePrice = parseNumber(salePriceInput.value);
  const marginPercent = parseNumber(marginPercentInput.value);
  const prepCost = parseNumber(prepCostInput.value);
  const marginAmount = salePrice * (marginPercent / 100);
  const purchasePrice = salePrice - marginAmount;
  const totalCost = purchasePrice + prepCost;

  purchasePriceInput.value = formatMoney(purchasePrice);
  marginAmountInput.value = formatMoney(marginAmount);
  totalCostLabel.textContent = `${formatMoney(totalCost)} ₽`;
}

function normalizeMoneyInput(event) {
  const digits = event.target.value.replace(/[^\d]/g, "");
  event.target.value = digits ? formatMoney(Number(digits)) : "";
}

function normalizePercentInput(event) {
  const cleaned = event.target.value.replace(/[^\d.,]/g, "").replace(",", ".");
  const [integerPart, fractionPart = ""] = cleaned.split(".");
  const safeValue = fractionPart ? `${integerPart}.${fractionPart.slice(0, 2)}` : integerPart;
  event.target.value = safeValue;
}

salePriceInput.addEventListener("input", (event) => {
  normalizeMoneyInput(event);
  recalculate();
});

marginPercentInput.addEventListener("input", (event) => {
  normalizePercentInput(event);
  recalculate();
});

prepCostInput.addEventListener("input", (event) => {
  normalizeMoneyInput(event);
  recalculate();
});

recalculate();
