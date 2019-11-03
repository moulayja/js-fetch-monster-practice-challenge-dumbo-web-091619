let divOfMonsterContainer = document.querySelector('#monster-container');
let currentPage = 1


// ================================[Get Monsters Function]==============================

function getMonsters(){
 return fetch(`http://localhost:3000/monsters?_limit=50&_page=${currentPage}`)
 .then(response => response.json())
}

// ================================[Render Monsters Function]============================

function renderMonsters(monster){

 divOfMonsterContainer.insertAdjacentHTML('beforeend',`<div>
     <h2 data-id =${monster.id} >${monster.name}</h2>
     <h4>${monster.age}</h4>
     <p>${monster.description}</p>
     </div>` )
     
}

// ===========================[Fetch and Render the monsters]============================

getMonsters().then( monsters => monsters.forEach(renderMonsters))



// =================================[Create the monsters]================================


let divOfCreatingMonster= document.querySelector('#create-monster');

let form = document.createElement('form')
    form.id = 'monster-form'
let name = document.createElement('input');
    name.id = 'name';
let age = document.createElement('input');
    age.id = 'age';  
let description = document.createElement('input');
    description.id = 'description';
let button = document.createElement('button')
    button.innerText = "create"

divOfCreatingMonster.append(form);
form.append(name, age, description, button)


// =================================[Form Event Listener]=================================

form.addEventListener('submit',(e)=>{
        e.preventDefault();
        postMonster(e.target)
})


// =============================[Post Monster]====================================

function postMonster(monster){
    fetch('http://localhost:3000/monsters', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "name": monster.name.value,
          "age": monster.age.value,
          "description": monster.description.value
        })
      })
      .then( res => res.json())
      .then( monsterino =>{
       renderMonsters(monsterino);
      })

}



// =============================[render 50 Monster per page]====================================

backBtn = document.querySelector('#back')
forwardBtn = document.querySelector('#forward')

forwardBtn.addEventListener('click', (event) => {
    monsterPerPage(1)
  })
  
  backBtn.addEventListener('click', (event) => {
    if (currentPage > 1) {
      monsterPerPage(-1)
    }
  })







function monsterPerPage (num) {
    currentPage += num
    getMonsters()
    scrollTo(0,0)  // Element.scrollTo()


  }