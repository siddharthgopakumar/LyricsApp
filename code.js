const submitBtn = document.querySelector("button");

submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const searchVal = document.querySelector("input").value;
    const url = `https://api.lyrics.ovh/suggest/${searchVal}`;
    fetch(url)
    .then((data)=>data.json())
    .then(data => {
        for(let element of data["data"])   {    
            console.log(element["title"] + " " + element["artist"]["name"]);
            const div = document.createElement("div");
            const para = document.createElement("para");
            const button = document.createElement("button");  
            div.classList.add("resultIndividual");
            para.textContent = `${element["artist"]["name"]} ${element["title"]}`;
            button.textContent= "Get Lyrics";
            div.appendChild(para);
            div.appendChild(button);
            document.querySelector("#result").appendChild(div);
        }
    }).catch((er)=> console.log(er));
});
