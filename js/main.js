const btnContainer = document.getElementById("btn-container");
const fetchCategory = () =>{
    const url = "https://openapi.programming-hero.com/api/videos/categories";
    fetch(url)
    .then((res) => res.json())
    .then(({data}) => {
        data.forEach((card)=>{
            const category = document.createElement("button");
            category.classList.add("btn", "btn-sm", "ml-2", "mr-2")
            category.innerText = card.category;
            btnContainer.append(category)
        })
    }) 
}
fetchCategory();