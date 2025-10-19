$(document).ready(function(){
    $(window).resize(function(){
        index = 0;
        updateView();
    })
})


const container = $('#inner-carousel-container');
const cards = $('.recipe-card');
const cardsArray = Array.from(cards);
let index = 0;
const getVisibleCount = function() {
    let windowWidth = $(window).width(); 
    if (windowWidth <=600){
        return 1; 
    }else if(windowWidth <=950){
        return 2;
    }else{
        return 3; 
    }
}
updateView();

function updateView() {
    const visibleCount = getVisibleCount();
    cardsArray.forEach((card, i) => {
        card.style.display = (i >= index && i < index + visibleCount) ? 'block' : 'none';
    })
}

$('#next-btn').on('click', () => {
    const visibleCount = getVisibleCount();
    if (index + visibleCount < cards.length) {
    index++;
    updateView();
    }else{
        $(this).addClass("disabled");
    }  
});
$('#prev-btn').on('click', () => {
    if (index > 0) {
        index--;
        updateView();
    }else{
        $("#prev-btn").addClass("disabled");
    }  
});

