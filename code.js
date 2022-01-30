const url = 'https://api.lyrics.ovh/suggest/rihanna';
fetch(url).then((data)=>data.json()).then(data => console.log(data["data"][0]["artist"]["name"]));