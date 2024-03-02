const btnContainer = document.getElementById("btn-container");
const cardContainer = document.getElementById("card-container");
let selectedCategory = 1000;


const fetchCategory = () =>{
    const url = "https://openapi.programming-hero.com/api/videos/categories";
    fetch(url)
    .then((res) => res.json())
    .then(({data}) => {
        data.forEach((card)=>{
            const category = document.createElement("button");
            category.classList.add("btn", "btn-sm", "ml-2", "mr-2", "text-[#252525]", "bg-[#D3D3D3]", "hover:bg-[#ff304b]", "hover:text-white", "font-semibold")
            category.innerText = card.category;
            category.addEventListener('click', () => fetchDataByCategory(card.category_id))
            btnContainer.append(category);
            console.log(data)
        })
    }) 
}


const fetchDataByCategory = (categoryID) => {
    selectedCategory = categoryID
    console.log(categoryID);
    const url = `https://openapi.programming-hero.com/api/videos/category/${categoryID}`;
    fetch(url)
    .then((res) => res.json())
    .then(({data}) => {
        cardContainer.innerHTML = "";
        data.forEach((categoryCard)=>{
            let verifiedImg = "";
            if(categoryCard.authors[0].verified){
                verifiedImg = `<img src="./image/verify.png" alt="verify"></img>`
            }
            const card = document.createElement("div");
            card.classList.add("card", "card-compact", "w-[312px]", "bg-base-100", "m-auto");
            card.innerHTML = `
            <img class="rounded-xl h-[200px]"  src="${categoryCard.thumbnail}" alt="Shoes"/>
            <div class="flex gap-3 mt-5">
                <div class="h-[40px] w-[40px]">
                    <img class="w-full h-10 rounded-full" src="${categoryCard.authors[0].profile_picture}" alt="profile">
                </div>
                <div>
                <h1 class="font-bold text-[16px]">${categoryCard.title}</h1>
                <div  class="flex items-center gap-2">
                    <h2>${categoryCard.authors[0].profile_name}</h2>
                    <div>
                        ${verifiedImg}
                    </div>
                </div>
                <h3>${categoryCard.others.views} <span>Views</span></h3>
                </div>
            </div>
            `;
            cardContainer.appendChild(card);
            console.log(categoryCard)
        });
        
    })
}
fetchCategory();
fetchDataByCategory(selectedCategory);