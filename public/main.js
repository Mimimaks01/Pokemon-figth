class Pokemon{
    constructor(name, sprite, hp, moves){
        this.name = name;
        this.sprite = sprite;
        this.hp = hp;
        this.fullhp = hp;
        this.moves = moves;
    }
}

let PersoPokedex = [
['Mackogneur', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/68.gif', 360,[
    ['Coup de rein', 'rein', 95, 0.95],
    ['Coup de boule', 'boule', 80, 0.95],
    ['coup de main', 'main', 75, 0.85],
    ['Morsure', 'morsure', 70, ]
]],
['Nidoking', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/34.gif', 362,[
    ['Cris', 'peur', 90, 0.95],
    ['Morsure', 'morsure', 80, 0.95],
    ['Vomis', 'vomi', 75, 0.95],
    ['667', 'freez', 80, 0.95]
    
]],
];

let typeMatch = {
'Mackogneur': [['rein'],['boule', 'rien'], ['rein', 'main', 'morsure']],
'Nidoking':[['rien'],['vomi'],['freez', 'morsure']],
}

function spawn(hasard){
let p = PersoPokedex[Math.floor(Math.random()*PersoPokedex.length)];
let pkm = new Pokemon(p[0], p[1], p[2], p[3]);

if(hasard){
    for(i=0; i<4; i++){
        document.getElementById('m'+i).value = pkm.moves[i][0];
    }
}
return pkm;

}

let pk1 = spawn(true);
s1 = document.createElement('img');
s1.src = pk1.sprite;
document.getElementById('pk1').appendChild(s1);
document.getElementById('hp1').innerHTML = '<p>Vie du personnage: ' + pk1.hp + '/' + pk1.fullhp + '</p>';


let pk2 = spawn(false);
s2 = document.createElement('img');
s2.src = pk2.sprite;
document.getElementById('pk2').appendChild(s2);
document.getElementById('hp2').innerHTML = '<p>Vie du personnage: ' + pk2.hp + '/' + pk2.fullhp + '</p>';

for(i=0; i<4; i++){
let btn = document.getElementById('m'+i);
let move = pk1.moves[i]; 
function addHandler(btn, move, pk1, pk2){
    btn.addEventListener('click', function(e){
        attack(move, pk1, pk2, 'hp2', '');
        setTimeout(attack,2000, pk2.moves[Math.floor(Math.random()*3)], pk2, pk1, 'hp1', "le ");
    });

}
addHandler(btn, move, pk1, pk2);
}




function attack(move, attacker, receiver, hp, owner){
document.getElementById('commentaire').innerHTML = '<p>' + owner + attacker.name + ' utilise son/sa '  + move[0] + '!</p>';
if(Math.random() < move[3]){
    let pouvoir = move[2] += Math.floor(Math.random()*10);
    let type = typeMatch[receiver.name];
    let mtype = move[1];
    let choix = 1;

    for(i=0; i<type.length; i++){
        if(type[i].includes(mtype)){
            switch(i){
                case 0: 
                    choix = 0;
                    setTimeout(function(){
                        document.getElementById('commentaire').innerHTML = '<p>Aucun effet</p>';
                    },1000);
                    break;
                case 1: 
                    choix = 2;
                    setTimeout(function(){
                        document.getElementById('commentaire').innerHTML = '<p>Efficace tu vas le défoncer</p>';
                    },1000);
                    break;
                case 2: 
                choix = 0.5;
                    setTimeout(function(){
                        document.getElementById('commentaire').innerHTML = '<p>C est faible tout ca</p>';
                    },1000);
                    break;
            }
            break;
        }
    }
    pouvoir *= choix;
    receiver.hp -= Math.floor(pouvoir);
    document.getElementById(hp).innerHTML = '<p>Vie du personnage: ' + receiver.hp + '/' + receiver.fullhp + '</p>';
}
else{
    setTimeout(function(){
        document.getElementById('commentaire').innerHTML = "<p>Tu l'as loupé</p>";
    })
}
checkWinner(hp);


}


function checkWinner(hp){
let f = (pk1.hp <=0) ? pk1 : (pk2.hp<=0) ? pk2 : false;
if(f!=false){
    alert('Tu as perdu ' + f.name +' essaye encore une fois!');
    document.getElementById(hp).innerHTML = '<p>Vie du personnage: 0/' + f.fullhp + '</p>';
    setTimeout(function(){
        location.reload();
    },1500)
}

}