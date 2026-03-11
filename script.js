const coins = ["bitcoin","ethereum","solana","tether","binancecoin"]

const tableBody = document.getElementById("tableCoins")
const cardsArea = document.getElementById("coinsArea")
const statusText = document.getElementById("statusText")
const refreshButton = document.getElementById("btnRefresh")

//-------------------------------------------------------------


async function loadMarketData(){

	const url =
	"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=" + coins.join(",")

	statusText.textContent = "Loading market data..."

	try{

	const response = await fetch(url)

	if(!response.ok){
	throw new Error("Request failed")
	}

	const data = await response.json()

	renderCards(data)
	renderTable(data)

	statusText.textContent = "Market data updated"

	}

	catch(err){

	console.log("API error", err)

	statusText.textContent = "Could not load market data"

	}

}

//-------------------------------------------------------------

function renderCards(data){

	cardsArea.innerHTML = ""

	data.forEach(coin => {

	const card = document.createElement("div")
	card.className = "coin-box"

	let change = coin.price_change_percentage_24h
	let changeClass = change >= 0 ? "positive" : "negative"

	card.innerHTML = `
	<h3>${coin.name}</h3>
	<p>$${coin.current_price.toLocaleString()}</p>
	<p class="${changeClass}">
	${change.toFixed(2)}%
	</p>
	`

	cardsArea.appendChild(card)

	})

}

//-------------------------------------------------------------


function renderTable(data){

	tableBody.innerHTML = ""

	data.forEach(coin => {

	const row = document.createElement("tr")

	row.innerHTML = `
	<td>${coin.name}</td>
	<td>${coin.symbol.toUpperCase()}</td>
	<td>$${coin.current_price.toLocaleString()}</td>
	<td>${coin.price_change_percentage_24h.toFixed(2)}%</td>
	<td>$${coin.market_cap.toLocaleString()}</td>
	`

	tableBody.appendChild(row)

	})

}



if(refreshButton){
	refreshButton.addEventListener("click", loadMarketData)
}


loadMarketData()
