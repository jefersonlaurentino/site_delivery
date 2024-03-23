const produto = document.querySelector('#clone').cloneNode(true);
produto.classList.remove("hidden")
const pizzas = document.querySelector("#pizzas")
const box_card = document.querySelector("#box_card")
pizzas.appendChild(produto)
const click_produto = [...document.querySelectorAll('.click')]

// janela card produto
click_produto.map((el)=>{
    el.addEventListener('click',()=>{
        console.log(el.tagName);
        if (box_card.classList[9] == 'hidden'){
            box_card.classList.remove('hidden')
        } else {
            box_card.classList.add('hidden')
        }
    })
})
// fim janela card

console.log(click_produto);