const game = document.querySelector(".game");
const selection = document.querySelector(".selection");
const selectCard = document.querySelectorAll('.select_card');
const winScreen = document.querySelector('.win');
const again = document.querySelector('.again');
let score;

let isFlipped = false;
let card = {
    first: null,
    second: null,
    locked: false,
    guessed: 0
}

function flip()
{
    if(card.locked) return;
    if(this == card.first) return;

    this.classList.toggle("flip");

    if (!isFlipped) {
        isFlipped = true;
        card.first = this;
    }
    else 
    {
        isFlipped = false;
        card.second = this;

        if(card.first.dataset.image === card.second.dataset.image) //Karta znaleziona
        {
            card.first.removeEventListener('click', flip);
            card.second.removeEventListener('click', flip);
            card.guessed++;
            if(card.guessed === score) win();
            reset();
        }
        else
        {
            card.locked = true;

            setTimeout(() => {
                card.first.classList.remove("flip");
                card.second.classList.remove("flip");

                reset();
            }, 600);
        }
    }
}

function reset()
{
    [isFlipped, card.locked] = [false, false];
    [card.first, card.second] = [null, null];
}

function shuffle(cards) {
    cards.forEach(card =>
        {
           let random = Math.floor(Math.random() * 1000)
           card.style.order = random;
        })
}

function selectDifficulty(element) {
    selection.classList.add("hidden");
    game.innerHTML = "";
    let value = element.dataset.value;
    score = parseInt(value);

    for(i = 0; i < value; i++) //dodanie kart
    {
        game.innerHTML += '<div class="card" data-image="'+ i +'"> <img src="img/0'+ i +'.svg" alt="img0'+ i +'" class="front"> <img src="img/badge.svg" alt="badge" class="back"></div>'
        game.innerHTML += '<div class="card" data-image="'+ i +'"> <img src="img/0'+ i +'.svg" alt="img0'+ i +'" class="front"> <img src="img/badge.svg" alt="badge" class="back"></div>'
    }

    if(value > 8) game.classList.add("hard"); //Jeżeli par kart jest więcej niż 8 to dodaj
    else game.classList.remove("hard");

    const cards = document.querySelectorAll(".card")
    cards.forEach(card => card.addEventListener('click', flip));
    shuffle(cards);

}

function win() //Funkcja po wygraniu gry
{
    card.guessed = 0;
    winScreen.classList.add("active");
}

function restartGame() //Funkcja wykonywana do resetu gry
{
    selection.classList.remove("hidden");
    winScreen.classList.remove("active");
}

again.addEventListener("click", restartGame) //Przycisk resetowania gry


selectCard.forEach(element => {
    element.addEventListener("click", () => {selectDifficulty(element)})
}) //Przyciski do wyboru trudności
