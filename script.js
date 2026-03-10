const refreshBtn = document.getElementById("refreshBtn");
const statusMessage = document.getElementById("statusMessage");
const lastUpdated = document.getElementById("lastUpdated");
const coinCards = document.getElementById("coinCards");
const coinTableBody = document.getElementById("coinTableBody");

const previewBtc = document.getElementById("previewBtc");
const previewEth = document.getElementById("previewEth");
const previewSol = document.getElementById("previewSol");
const previewXaut = document.getElementById("previewXaut");

//const apiUrl =
//  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana,tether-gold";

const apiUrl =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana,tether-gold,tether";

function formatCurrency(value) {
  return "$" + Number(value).toLocaleString(undefined, {
    maximumFractionDigits: 2
  });
}

function formatMarketCap(value) {
  return "$" + Number(value).toLocaleString();
}

function formatChange(value) {
  const num = Number(value || 0);
  const sign = num >= 0 ? "+" : "";
  return sign + num.toFixed(2) + "%";
}

function getChangeClass(value) {
  return Number(value) >= 0 ? "positive" : "negative";
}

function renderPreview(coins) {
  const map = {};
  coins.forEach((coin) => {
    map[coin.id] = coin;
  });

  if (map.bitcoin) previewBtc.textContent = formatCurrency(map.bitcoin.current_price);
  if (map.ethereum) previewEth.textContent = formatCurrency(map.ethereum.current_price);
  if (map.solana) previewSol.textContent = formatCurrency(map.solana.current_price);
  if (map["tether-gold"]) previewXaut.textContent = formatCurrency(map["tether-gold"].current_price);
  if (map.tether) previewUsdt.textContent = formatCurrency(map.tether.current_price);
}

function renderCards(coins) {
  coinCards.innerHTML = "";

  coins.forEach((coin) => {
    const card = document.createElement("article");
    card.className = "coin-card";

    card.innerHTML = `
      <div class="coin-card-top">
        <img src="${coin.image}" alt="${coin.name}">
        <div>
          <p class="coin-title">${coin.name}</p>
          <p class="coin-symbol">${coin.symbol.toUpperCase()}</p>
        </div>
      </div>
      <div class="coin-price">${formatCurrency(coin.current_price)}</div>
      <span class="coin-change ${getChangeClass(coin.price_change_percentage_24h)}">
        ${formatChange(coin.price_change_percentage_24h)}
      </span>
      <div class="coin-marketcap">Market Cap: ${formatMarketCap(coin.market_cap)}</div>
    `;

    coinCards.appendChild(card);
  });
}

function renderTable(coins) {
  coinTableBody.innerHTML = "";

  coins.forEach((coin) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${coin.name}</td>
      <td>${coin.symbol.toUpperCase()}</td>
      <td>${formatCurrency(coin.current_price)}</td>
      <td class="${getChangeClass(coin.price_change_percentage_24h)}">
        ${formatChange(coin.price_change_percentage_24h)}
      </td>
      <td>${formatMarketCap(coin.market_cap)}</td>
    `;

    coinTableBody.appendChild(row);
  });
}

async function loadCryptoData() {
  statusMessage.textContent = "Loading live market data...";

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("API request failed.");
    }

    const coins = await response.json();

    renderPreview(coins);
    renderCards(coins);
    renderTable(coins);

    statusMessage.textContent = "Live data loaded successfully.";
    lastUpdated.textContent = "Last updated: " + new Date().toLocaleString();
  } catch (error) {
    console.error(error);
    statusMessage.textContent = "Error loading market data. Please try again.";
    lastUpdated.textContent = "Last updated: unavailable";
  }
}

if (refreshBtn) {
  refreshBtn.addEventListener("click", loadCryptoData);
}

loadCryptoData();