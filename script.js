const Random_Quote = 'https://api.quotable.io/random'

const inputBox = document.querySelector('#quote-area');

const displayQuotes = document.getElementById('quote-display')

const accuracy = document.getElementById('accuracy')

const startbtn = document.getElementById('startbtn')

const container = document.querySelector('.container')
const timer = document.getElementById('timer')

const basicDetails = document.getElementById('basicDetails')
const heading = document.querySelector('h1')

const result = document.getElementById('result')

const finaltime = document.getElementById('finaltime')

function hidecontent(){
container.style.display = 'none'
timer.style.display = 'none'
result.style.display = 'none'
}
hidecontent()
startbtn.addEventListener('click', ()=>{
    const playername = document.getElementById('playerName')
    if(!playername.value){
        alert('enter your name')
    }else{
        heading.style.display = 'none'
        basicDetails.style.display = 'none'
        renderqoutes()
    }

})

inputBox.addEventListener('input', ()=>{
    const arrayValue = displayQuotes.querySelectorAll('span')
    const inputvalue = inputBox.value.split('')
    let correct = true
   // let count = 0
   arrayValue.forEach((characterSpan, index) => {
        // console.log(arrayValue.length -1)
        //  console.log(index)
        const character = inputvalue[index]
        if(!character){
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false
        }
        else if(character === characterSpan.innerText){
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        }
        // else if(index === arrayValue.length - 1){
        //     let finishTime = timer.value
        //     console.log('pugazh')
        //     console.log('finishTime')
        //     resultDisplay(count, finishTime)
        //     //break
        // }
        else{
            
        
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            correct = false
        }
    })
   // console.log(count)
   if(correct){
       renderqoutes()
   }
   
})

function  resultDisplay(count){
    // container.style.display = 'none'
    // timer.style.display = 'none'
 if(count>0){
    
       let accurate = ((100 - count)/100)*100 + '%'
       accuracy.innerHTML = `Your accuracy is ${accurate}`
    finaltime.innerText = finishTime
    }else{
        // let accurate = '100%'
        finaltime.innerText = finishTime
        accuracy.innerHTML = '100%'
    }
}

async function getquoutes(){
   const response =  await fetch(Random_Quote)
   const waitquote = await response.json();
   

   return waitquote

}
async function renderqoutes(){
    quotes = await getquoutes()
   container.style.display = 'block'
    timer.style.display = 'block'
    
    displayQuotes.innerHTML = ''
    quotes.content.split('').forEach(character => {
        const characterSpan = document.createElement('span');
        characterSpan.innerHTML = character
        displayQuotes.appendChild(characterSpan)
    
    });
    inputBox.value = null
    startTimer()
}

let starttime;

function startTimer(){
    timer.innerText = 0;
    starttime = new Date()
    const interval = setInterval(() => {
        let time = getTimerTime()
        timer.innerText =  time
        if(time > 60000){
            clearInterval(interval)
        }
       
    }, 1000)

}

function getTimerTime(){
    return Math.floor((new Date() - starttime) / 1000)
}



