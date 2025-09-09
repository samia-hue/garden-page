const categoriesContainer = () => {
  const url = "https://openapi.programming-hero.com/api/categories";

  fetch(url)
    .then((res) => res.json())
    .then((json) => displayCategories(json.categories));
};

// * plants container

const plant = (category_name) => {
  let url = `https://openapi.programming-hero.com/api/plants/${category_name}`;


  fetch(url)
    .then((res) => res.json())
    .then((tree) => displayTrees(tree.plants));
};

const displayTrees = (trees) => {
  const plantsContainer = document.getElementById("plants-container");

  plantsContainer.innerHTML = "";

  for (let tree of trees) {
    const card = document.createElement("div");
    card.innerHTML = `
    
    <div class="w-[200px] h-auto bg-white rounded-xl shadow-sm">
          <div id="img-container"  class="img-container-class  p-3 rounded-xl  "><img src = "${tree.image}" alt ="${tree.name}" class = "w-[250px] h-[200px]" /> </div>
          <h1 class="text-xl font-bold p-2">${tree.name}</h1>
          <p class="text-gray-500 text-xs p-2">
            ${tree.description}
          </p>

          <div class="flex justify-between p-2">
            <button
              class="bg-[#DCFCE7] w-[90px] rounded-[50px] h-[30px] text-[#15803D]"
            >
              Fruit Tree
            </button>
            <p class="font-bold">৳${tree.price}</p>
          </div>
          <button 
            class="btn w-full text-white bg-[#15803D] rounded-[50px] mb-2 h-[30px] p-0.5"
          >
            Add to Cart
          </button>
        </div>
    `;

    plantsContainer.appendChild(card);

    
  }
};

plant();


// * history

const callBtns = document.querySelectorAll(".call-btn");


callBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".btn");

    //  card service name (h1)
    const plantName = card.querySelector("h1").innerText;

    
    const plantPrice = card.querySelector("p").innerText;


    
    addToHistory(plantName, plantPrice);
  });
});


// * display history


function addToHistory() {
  const historyBox = document.getElementById("calculate-section");
  

  const card = document.createElement("div");
  card.className =
    "rounded-[8px] w-auto h-[100px] bg-[#f5fff6] m-[24px]";

  card.innerHTML = `
    <div class="p-[10px] flex justify-between items-center">
      <div>
        <h1 class="font-bold">${tree.name}</h1>
        <p class="text-[#5C5C5C]">${tree.price}</p>
      </div>
    </div>
  `;
    
historyBox.prepend(card);

}





// * display categories

const displayCategories = (categories) => {
  // 1. get the container & make empty

  const categoriesContainer = document.getElementById("categories-id");

  // 2. get into every lessons

  for (let cat of categories) {
    // 3. create element
    const newCategories = document.createElement("div");
    newCategories.innerHTML = `<div class="w-[90%] hover:bg-[#0B7A27] rounded hover:text-white ml-[2px] p-[2px] "><h1 onclick="plant('${cat.category_name}')">${cat.category_name}</h1></div>`;
    // 4. append into container

    categoriesContainer.append(newCategories);
  }
};


document.addEventListener("DOMContentLoaded", ()=>{
  loadDefaultTrees();
})
async function loadDefaultTrees() {
try{
  let res = await fetch("https://openapi.programming-hero.com/api/plants")
  let data = await res.json();
  let firstSix = data.plants.slice(0, 6);
  showTrees(firstSix)
} catch (error){
  console.error("error loading default trees:", error)
}

function showTrees(trees) {
  const container = document.getElementById("plants-container");
  container.innerHTML = ""; 

  trees.forEach(tree => {
    let div = document.createElement("div");
    div.classList.add("card", "bg-green-100", "p-1", "m-2");
    div.innerHTML = `
      <div class="w-[200px] h-auto bg-white rounded-xl shadow-sm">
          <div
            id="img-container"
            class="img-container-class bg-gray-200 p-3 rounded-xl w-full min-h-[150px]"
          ></div>
          <h1 class="text-xl font-bold p-2">Mango Tree</h1>
          <p class="text-gray-500 text-xs p-2">
            A fast-growing tropical tree that produces delicious, juicy mangoes
            during summer. Its dense green
          </p>

          <div class="flex justify-between p-2">
            <button
              class="bg-[#DCFCE7] w-[90px] rounded-[50px] h-[30px] text-[#15803D]"
            >
              Fruit Tree
            </button>
            <p class="font-bold">৳500</p>
          </div>
          <button
            class="w-full text-white bg-[#15803D] rounded-[50px] mb-2 h-[30px] p-0.5"
          >
            Add to Cart
          </button>
        </div>
    `;
    container.appendChild(div);
  });
  
}
}
categoriesContainer();







