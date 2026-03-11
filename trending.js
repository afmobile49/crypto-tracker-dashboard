const refreshButton = document.getElementById("refreshTrending")
const statusText = document.getElementById("trendingStatus")
const errorMessage = document.getElementById("errorMessage")
const cardsContainer = document.getElementById("trendingCards")

const trendingUrl = "https://api.coingecko.com/api/v3/search/trending"

//-------------------------------------------------------------

function createCard(coin){

	const card = document.createElement("div")
	card.className = "coin-box"

	card.innerHTML = `
	<h3>${coin.name}</h3>
	<p>${coin.symbol}</p>
	<p>Rank #${coin.market_cap_rank || "N/A"}</p>
	`

	return card

}

//-------------------------------------------------------------


async function loadTrending(){

	statusText.textContent = "Loading trending coins..."
	errorMessage.textContent = ""
	cardsContainer.innerHTML = ""

	try{

	const response = await fetch(trendingUrl)

	if(!response.ok){
	throw new Error("Request failed")
	}

	const data = await response.json()

	const coins = data.coins || []

	coins.forEach(entry => {

	const coin = entry.item
	const card = createCard(coin)

	cardsContainer.appendChild(card)

	})

	statusText.textContent = "Trending coins updated"

	}

	catch(err){

	console.log("Trending API error", err)

	statusText.textContent = ""
	errorMessage.textContent = "Could not load trending data"

	}

}

//-------------------------------------------------------------


if(refreshButton){
	refreshButton.addEventListener("click", loadTrending)
}

loadTrending()