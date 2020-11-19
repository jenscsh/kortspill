let cards = document.querySelectorAll(".card");
let cardToFollow;
cards.forEach(card => {
    card.addEventListener("mousedown", ()=> {
    cardToFollow=card;
    console.log("Mouse down: "+cardToFollow);
    });
    card.addEventListener("touchstart", ()=> {
        cardToFollow=card;
        console.log("Touch down: "+cardToFollow);
    });
});
document.addEventListener("mousemove", (e)=>{
    if (cardToFollow!=null) {
        cardToFollow.style.left = e.pageX+'px';
        cardToFollow.style.top = e.pageY+'px';
        cardToFollow.style.transform = "translate(-50%,-50%)";
        cardToFollow.style.position = "absolute";
        console.log("Mouse move: "+cardToFollow);
    }
});
document.addEventListener("touchmove", (e)=>{
    if (cardToFollow!=null) {
        cardToFollow.style.left = e.pageX+'px';
        cardToFollow.style.top = e.pageY+'px';
        cardToFollow.style.transform = "translate(-50%,-50%)";
        cardToFollow.style.position = "absolute";
        console.log("Touch move: "+cardToFollow);
    }
});
document.addEventListener("mouseup",()=> {
    console.log("Mouse up: "+cardToFollow);
    cardToFollow=null;
});
document.addEventListener("touchend",()=> {
    console.log("Touch up: "+cardToFollow);
    cardToFollow=null;
});