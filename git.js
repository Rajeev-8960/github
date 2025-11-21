const APIURL = "https://api.github.com/users/";
const main = document.querySelector("#main");
const searchBox = document.querySelector("#search");


const getuser = async(username) =>{
    const res = await fetch(APIURL + username);
    const data = await res.json();
    // console.log(data);
     if (data.message === "Not Found") {
        main.innerHTML = `<h2>User Not Found</h2>`; 
         return;
    }
   const card = 
   `
       <div class="card">
            <div>
                <img class="avatar" src="${data.avatar_url}" alt="Florin Pop">
            </div>
            <div class="user-info">
                <h2>${username}</h2>
                <p>${data.bio}</p>

                <ul class="info">
                    <li>${data.followers}<strong>Followers</strong></li>
                    <li>${data.following}<strong>Following</strong></li>
                    <li>${data.public_repos}<strong>Repos</strong></li>
                </ul>
 
                <div id="repos">
                    // <a class="repo" href="#" target="_blank">Repo 1</a>
                    // <a class="repo" href="#" target="_blank">Repo 2</a>
                    // <a class="repo" href="#" target="_blank">Repo 3</a>
                </div>
            </div>
        </div>
   `
   
main.innerHTML=card;
getRepos(username);
}

//init call
getuser("shreya1826");


const getRepos = async(username)=>{
    const repos = document.querySelector("#repos");
    const res = await  fetch(APIURL + username + "/repos");
    const data = await res.json();
    // console.log(data);
    data.forEach(
    (items)=>{
        const elem = document.createElement("a");
        elem.classList.add("repo");
        elem.href = items.html_url
        elem.innerText = items.name
        elem.target = "_blank"
        repos.appendChild(elem)
    }
   )
}

const formSubmit =()=>{
    
    if(searchBox.value !=""){
        getuser(searchBox.value)
        searchBox.value = ""
    }
    return false;
}

searchBox.addEventListener("focusout",function(){
    formSubmit();
})
