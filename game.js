alert("1");
let deck;
let communityCards = [];
alert("2");
const player = {
    name: "Você",
    chips: 10000,
    cards: [],
    folded: false
};
alert("3");
const potElement =
    document.getElementById("pot-amount");

const bankrollElement =
    document.getElementById("player-bankroll");

const communityContainer =
    document.getElementById("community-cards");

const playerContainer =
    document.getElementById("player-cards");

const botsContainer =
    document.getElementById("bots-container");

const messageBox =
    document.getElementById("message-box");

let stage = 0;
let pot = 0;

function updateUI() {

    bankrollElement.textContent =
        player.chips;

    potElement.textContent =
        pot;

}

function createCard(card, hidden = false) {

    const div =
        document.createElement("div");

    div.classList.add("card");

    if(hidden){

        div.classList.add("back");
        div.textContent = "🂠";

        return div;

    }

    if(
        card.suit === "♥" ||
        card.suit === "♦"
    ){
        div.classList.add("red");
    }

    div.textContent =
        card.display;

    return div;

}

function renderPlayerCards(){

    playerContainer.innerHTML = "";

    player.cards.forEach(card => {

        playerContainer.appendChild(
            createCard(card)
        );

    });

}

function renderCommunityCards(){

    communityContainer.innerHTML = "";

    communityCards.forEach(card => {

        communityContainer.appendChild(
            createCard(card)
        );

    });

}

function renderBots(){

    botsContainer.innerHTML = "";

    bots.forEach(bot => {

        const seat =
            document.createElement("div");

        seat.classList.add("bot-seat");

        seat.innerHTML = `
            <div class="bot-name">
                ${bot.name}
            </div>

            <div class="bot-stack">
                ${bot.chips}
            </div>

            <div class="cards-row">
                <div class="card back">🂠</div>
                <div class="card back">🂠</div>
            </div>
        `;

        botsContainer.appendChild(seat);

    });

}

function startHand(){

    deck = new Deck();

    communityCards = [];

    stage = 0;

    player.cards = [
        deck.deal(),
        deck.deal()
    ];

    player.folded = false;

    bots.forEach(bot => {

        bot.resetHand();

        bot.cards = [
            deck.deal(),
            deck.deal()
        ];

    });

    pot = 150;

    renderPlayerCards();
    renderCommunityCards();
    renderBots();
    updateUI();
    startHand();

    messageBox.textContent =
        "Nova mão iniciada";

}

function nextStage(){

    stage++;

    if(stage === 1){

        communityCards.push(
            deck.deal(),
            deck.deal(),
            deck.deal()
        );

        messageBox.textContent =
            "Flop";

    }

    else if(stage === 2){

        communityCards.push(
            deck.deal()
        );

        messageBox.textContent =
            "Turn";

    }

    else if(stage === 3){

        communityCards.push(
            deck.deal()
        );

        messageBox.textContent =
            "River";

    }

    else{

        showdown();
        return;

    }

    renderCommunityCards();

}

function showdown(){

    const playerResult =
        HandEvaluator.evaluate([
            ...player.cards,
            ...communityCards
        ]);

    let bestRank =
        playerResult.rank;

    let winner =
        player.name;

    bots.forEach(bot => {

        const result =
            HandEvaluator.evaluate([
                ...bot.cards,
                ...communityCards
            ]);

        if(
            result.rank >
            bestRank
        ){

            bestRank =
                result.rank;

            winner =
                bot.name;

        }

    });

    if(winner === player.name){

        player.chips += pot;

        messageBox.textContent =
            `🏆 Você venceu com ${playerResult.name}`;

    }else{

        messageBox.textContent =
            `🤖 ${winner} venceu`;

    }

    updateUI();

}

document
.getElementById("btn-check")
.addEventListener(
    "click",
    nextStage
);

document
.getElementById("btn-fold")
.addEventListener(
    "click",
    () => {

        player.folded = true;

        messageBox.textContent =
            "Você desistiu da mão";

    }
);

document
.getElementById("btn-raise")
.addEventListener(
    "click",
    () => {

        pot += 100;

        updateUI();

        messageBox.textContent =
            "Raise +100";

    }
);

document
.getElementById("btn-allin")
.addEventListener(
    "click",
    () => {

        pot += player.chips;

        player.chips = 0;

        updateUI();

        messageBox.textContent =
            "ALL-IN!";

    }
);

renderBots();
updateUI();

if(
    "serviceWorker" in navigator
){

    window.addEventListener(
        "load",
        () => {

            navigator.serviceWorker
            .register("sw.js");

        }
    );

}
