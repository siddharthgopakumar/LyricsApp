const submitBtn = document.querySelector("button");

submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const searchVal = document.querySelector("input").value;
    const url = `https://api.lyrics.ovh/suggest/${searchVal}`;
    fetch(url)
    .then((data)=>data.json())
    .then(data => {
        if(document.querySelector("#result").hasChildNodes) {
            document.querySelector("#result").innerHTML = '';
        }
        for(let element of data["data"])   {    
            const div = document.createElement("div");
            const para = document.createElement("para");
            const button = document.createElement("button");
            button.classList.add("lyricSearchBtn");  
            button.setAttribute("data-artist",element["artist"]["name"]);
            button.setAttribute("data-title",element["title"]);
            div.classList.add("resultIndividual");
            para.textContent = `${element["artist"]["name"]} ${element["title"]}`;
            button.textContent= "Get Lyrics";
            div.appendChild(para);
            div.appendChild(button);
            document.querySelector("#result").appendChild(div);
        }
    }).then(() => {
        const nodeList = document.querySelectorAll(".lyricSearchBtn");
        nodeList.forEach((node)=>{
            node.addEventListener('click', (event) =>   {
                // console.log(event.target.getAttribute("data-artist"));
                const lyricUrl = ` https://api.lyrics.ovh/v1/${event.target.getAttribute("data-artist")}/${event.target.getAttribute("data-title")}`;
                fetch(lyricUrl).then((data) => data.json()).then(data=>{
                    document.querySelector("#result").innerHTML = `<h1>${event.target.getAttribute("data-title")}</h1>
                    <p><strong>Artist: </Strong>${event.target.getAttribute("data-artist")}</p>                    
                    <p>${data["lyrics"].replace(/(\r\n|\r|\n)/g, '<br>')}</p>`;
                    console.log(data["lyrics"]);
                })
            })
        }
        );
    }
    );
}
);

//(data["lyrics"])