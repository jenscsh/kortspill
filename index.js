let cards = document.querySelectorAll(".card");
let hand = document.querySelector("#hand");
let board = document.querySelector("#board");
let deck = document.querySelector("#stock");
let instructions = document.querySelector('#instructions');
let cardcount = document.querySelector('#cardcount');
let cardstock = ["2C","2D","2H","2S","3C","3D","3H","3S","4C","4D","4H","4S","5C","5D","5H","5S","6C","6D","6H","6S","7C","7D","7H","7S","8C","8D","8H","8S","9C","9D","9H","9S","10C","10D","10H","10S","AC","AD","AH","AS","JC","JD","JH","JS","KC","KD","KH","KS","QC","QD","QH","QS"];
let chosenCard = null;

cards.forEach(card => {
    SetUpCard(card);
});
function SetUpCard(card) {
    card.cardcontent = card.querySelector(".cardcontent");
    card.turned=false;
    console.log("Set up for "+ card.id);
    card.addEventListener("click",(e)=>{
        if (card===chosenCard) Unchoose();
        else if (!chosenCard) {
            Unchoose();
            chosenCard=card;
            card.style.border = "5px orange solid";
            card.querySelector("button").style.display = "block";
        } else if (hand.contains(e.target)) PutInHand();
        else if (board.contains(e.target)) PutOnBoard(e);
    });
    card.addEventListener("keypress",(e)=>{
        if (card===chosenCard) Unchoose();
        else if (!chosenCard) {
            Unchoose();
            chosenCard=card;
            card.style.border = "5px orange solid";
            card.querySelector("button").style.display = "block";
        } else if (hand.contains(e.target)) PutInHand();
        else if (board.contains(e.target)) PutOnBoard(e);
    });
    card.querySelector("button").addEventListener("click",(e)=>{
        if (card.turned) {
            card.cardcontent.style.transform = "rotateY(0deg)";
            card.turned=false;
        }
        else {
            card.cardcontent.style.transform = "rotateY(180deg)";
            card.turned=true;
        }
    });
}

deck.addEventListener("click",(e)=>{
    if (chosenCard) {
        cardstock.push(chosenCard.face);
        chosenCard.remove();
        chosenCard = null;
        instructions.style.display = 'none';
        if (cardstock.length===1) deck.querySelector("img").style.opacity = "1";
    } else if (cardstock.length>0) {
        let stockPos = Math.floor(Math.random()*cardstock.length);
        console.log(stockPos+"/"+cardstock.length);
        let faceValue = cardstock[stockPos];
        hand.insertAdjacentHTML('beforeend',`<div class="card" id="${faceValue}" tabindex="0">
            <div class="cardcontent">
                <img src="./images/blue_back.png" class="backimage" alt="Snudd kort">
                <img src="./images/cards/${faceValue}.png" class="frontimage" alt="Kort med verdi ${faceValue}"> 
            </div>
            <button>Snu</button>
        </div>`);
        let newCard = document.getElementById(faceValue);
        console.log(newCard);
        SetUpCard(newCard);
        cardstock.splice(stockPos,1);
        if (cardstock.length===0) deck.querySelector("img").style.opacity = "0";
    }
    cardcount.innerHTML='Kort i stokken: '+cardstock.length;
});

document.addEventListener("click",(e)=>{
    if (chosenCard&&(e.target.id==='board'||instructions.contains(e.target)||e.target.id==='boardtext')) {
        PutOnBoard(e);
        
    } else if (chosenCard&&(e.target.id==='hand'||e.target.id==='handtext')) {
        PutInHand();
    }
    
});
function PutOnBoard(e) {
    instructions.style.display = 'none';
    board.appendChild(chosenCard);
    chosenCard.style.position="absolute";
    chosenCard.style.left = e.pageX+'px';
    chosenCard.style.top = e.pageY+'px';
    chosenCard.style.transform = "translate(-50%,-50%)";
    Unchoose();
}
function PutInHand() {
    instructions.style.display = 'none';
    hand.appendChild(chosenCard);
    chosenCard.style.position="static";
    chosenCard.style.transform = "translate(0%,0%)";
    Unchoose();
}
function Unchoose() {
    // instructions.style.display = 'none';
    if (chosenCard) {
        chosenCard.style.border="none";
        chosenCard.querySelector("button").style.display = "none";
    }
    chosenCard=null;
}