//Déclaration Variables et Constantes
const canvas = document.querySelector('#canvas')
const scoreSpan = document.querySelector('.score')
let score = 0

const context = canvas.getContext('2d')

const background = new Image()
background.src = './img/background.jpg'

const foodImg = new Image()
foodImg.src  = './img/rat.png'

const eatAudio = new Audio()
eatAudio.src = './mp3/eat.mp3'

const deadAudio = new Audio()
deadAudio.src = './mp3/dead.mp3'

const unit = 25

//Souris
let food = {
    x:Math.floor(Math.random() *17+1)*unit,
    y:Math.floor(Math.random() *17+1)*unit
}

snake = []
snake[0] = {
    x:10*unit,
    y:10*unit
}


//deplacement avec le clavier
let d
document.addEventListener('keydown', (e)=>{
    if(e.keyCode == 37 && d !="R"){
        d = "L"
    }
    else if(e.keyCode == 38 && d !="D"){
        d = "U"
    }
    else if(e.keyCode == 39 && d !="L"){
        d = "R"
    }
    else if(e.keyCode == 40 && d !="U"){
        d = "D"
    }
})
function collisionBody(head,snake){
    for (let index = 0; index < snake.length; index++) {
        if(head.x == snake[index].x && head.y ==snake[index].y){
            return true
        }
        
    }
    return false
}
function draw(){//Structure Serpent
    context.drawImage(background,0,0)
    for (let index = 0; index < snake.length; index++) {
        if(index === 0){
            context.fillStyle = "black"//Tête du serpent en noir
        }
        else{
            context.fillStyle = "red"//Corps du serpent en rouge
        }
        context.fillRect(snake[index].x,snake[index].y,unit,unit)
        context.strokeStyle = 'blue'
        context.strokeRect(snake[index].x,snake[index].y,unit,unit)
        
    }

    context.drawImage(foodImg,food.x,food.y)

    let snakeX = snake[0].x
    let snakeY = snake[0].y

    

    //manger la pomme
    if(snakeX == food.x && snakeY == food.y){
        food = {
            x:Math.floor(Math.random() *19+1)*unit,
            y:Math.floor(Math.random() *19+1)*unit
        }
        score +=1
        eatAudio.play()
    }
    else{
        snake.pop()
    }


    if(d=="L") snakeX -=unit
    if(d=="U") snakeY -=unit
    if(d=="R") snakeX +=unit
    if(d=="D") snakeY +=unit

    let newHead = {
        x:snakeX,
        y:snakeY
    }

    //les collisions
    if(snakeX<=-unit || snakeX>=canvas.width || snakeY<=-unit || snakeY>=canvas.height ||collisionBody(newHead,snake)){
        clearInterval(play)
        deadAudio.play()
        perdu();
    }
    snake.unshift(newHead)
    scoreSpan.textContent = score

}

let play = setInterval(draw,100)

function rejouer(){
    window.location.reload();
}
    //Fin du jeux
function perdu() {
    Swal.fire({
        title: 'Oops...',
        text: "Vous avez PERDU!!! votre Score est :" +score,
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Voulez-vous Rejouer?'
      }).then((result) => {
        if (result.isConfirmed) {
          rejouer();
        }
      })
  }

