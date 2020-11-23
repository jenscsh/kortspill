let cards = document.querySelectorAll(".card");
let hand = document.querySelector("#hand");
let board = document.querySelector("#board");
let chosenCard;
cards.forEach(card => {
    card.addEventListener("click",()=>{
        if (card===chosenCard) Unchoose();
        else {
            Unchoose();
            chosenCard=card;
            card.style.border = "5px orange solid";
            card.querySelector("button").style.display = "block";
        }
    });
    card.querySelector("button").addEventListener("click",(e)=>{
        let turned = false;
        if (turned) {
            card.style.transform = "rotateY(0deg)";
            e.target.style.transform = "rotateY(0deg)";
        } else {
            card.style.transform += "rotateY(180deg)";
            e.target.style.transform += "rotateY(180deg)";
        }
    });
});
document.addEventListener("click",(e)=>{
    if (chosenCard&&e.target.id==='board') {
        board.appendChild(chosenCard);
        chosenCard.style.position="absolute";
        chosenCard.style.left = e.pageX+'px';
        chosenCard.style.top = e.pageY+'px';
        // var topDiff = chosenCard.offsetTop - e.pageY;
        // var leftDiff = chosenCard.offsetLeft - e.pageX;
        // chosenCard.style.transform = `translate(${leftDiff},${topDiff})`;
        chosenCard.style.transform = "translate(-50%,-50%)";
        Unchoose();
    } else if (chosenCard&&(e.target.id==='hand'/*||e.target.parentElement.id==='hand'*/)) {
        hand.appendChild(chosenCard);
        chosenCard.style.position="static";
        chosenCard.style.transform = "translate(0,0)";
        Unchoose();
    }
    
});
function Unchoose() {
    if (chosenCard) {
        chosenCard.style.border="none";
        chosenCard.querySelector("button").style.display = "none";
    }
    chosenCard=null;
}