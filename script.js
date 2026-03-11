// simple crypto dashboard script


const coins = [
  "bitcoin",
  "ethereum",
  "solana",
  "tether-gold",
  "tether"
]


const refreshButton = document.getElementById("btnRefresh")
const cardsArea = document.getElementById("coinsArea")
const tableBody = document.getElementById("tableCoins")



async function loadMarketData(){

const url =
"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=" + coins.join(",")

try{

const response = await fetch(url)

const data = await response.json()

renderCards(data)

renderTable(data)

}
catch(err){

  console.log("API error", err)

}

}



function renderCards(data){

cardsArea.innerHTML = ""

data.forEach(c => {

const card = document.createElement("div")

card.className = "coin-box"

card.innerHTML = `

<h3>${c.name}</h3>

<p class="price">$${c.current_price}</p>

<p class="change ${c.price_change_percentage_24h >=0 ? "up":"down"}">
${c.price_change_percentage_24h.toFixed(2)}%
</p>

`

cardsArea.appendChild(card)

})

}



function renderTable(data){

tableBody.innerHTML = ""

data.forEach(c=>{

const row = document.createElement("tr")

row.innerHTML = `

<td>${c.name}</td>
<td>${c.symbol.toUpperCase()}</td>
<td>$${c.current_price}</td>
<td>${c.price_change_percentage_24h.toFixed(2)}%</td>
<td>$${c.market_cap.toLocaleString()}</td>

`

tableBody.appendChild(row)

})

}



refreshButton.addEventListener("click",loadMarketData)

loadMarketData()

