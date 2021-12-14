const get_api = "https://www.themealdb.com/api/json/v1/1/search.php?s=potato";
const main = document.querySelector("main");
const input = document.querySelector("input");
const modal = document.querySelector(".modal");
const cancelBtn = document.querySelector('.cancel-btn');
const box = document.querySelector('#box');
function getResult(api) {
    fetch(api)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        createCard(data.meals);
    })
}
getResult(get_api);

function createCard(dat,date) {
    dat.forEach(data => {
        let div = document.createElement('div');
        div.classList.add('item');
        div.innerHTML = `
        <div class="img">
            <img src="${data.strMealThumb}" alt="${data.strMeal}">
         </div>
        <div class="desc">
            <h1>${data.strMeal}</h1>
            <h2>${data.strCategory}</h2>
            <h2>Country: ${data.strArea}</h2>
            <ul>
                <li>${data.strIngredient1}</li>
                <li>${data.strIngredient2}</li>
                <li>${data.strIngredient3}</li>
                <li>${data.strIngredient4}</li>
            </ul>
            <a href="${data.strYoutube}" target="blank">
                <button class="btn">Learn cook</button>
            </a>
        </div>
        `;
        main.appendChild(div);
        modals(div);
        change(div,data);
    });
}

function modals(div,data) {
    div.addEventListener('click', () => {
        modal.classList.add('show');
    });
}

cancelBtn.addEventListener('click', () => {
    modal.classList.remove('show');
    box.innerHTML = '';
});

function change(div,data) {
  div.addEventListener('click', function () {
    let boxes = document.createElement('div');
    boxes.classList.add('modal-item');

    

    boxes.innerHTML = `
    <div class="img">
         <img src="${data.strMealThumb}" alt="${data.strMeal}">
     </div>
     <div class="text">
         <h1>${data.strMeal}</h1>
         <p>
             ${data.strInstructions.slice(0,300)}
         </p>
     </div>
    `;
    box.appendChild(boxes);
  
  })
}



input.addEventListener('keyup', (e) => {
    let search = e.target.value;
    let search_api = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
    main.innerHTML = '';
    getResult(search_api);
});

