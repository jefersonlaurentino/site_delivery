const teste = [...document.querySelectorAll('.click')]
const div_teste = document.querySelector('.teste');
console.log(teste);

teste.map((evt)=>{
    evt.addEventListener('click',(e)=>{
        if (div_teste.classList[10] == 'hidden'){
            div_teste.classList.remove('hidden')
        } else {
            div_teste.classList.add('hidden')
        }
    })
})