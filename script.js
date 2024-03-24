const selecionar=(item)=>document.querySelector(item);

const selecionarTodos=(item)=>[...document.querySelectorAll(item)];

const pizzas = selecionar("#pizzas")
const pizzas_doces = selecionar("#pizzas_doces")
const petiscos = selecionar("#petiscos")
const box_card = selecionar("#box_card")

const apiProdutos = "lista_produtos.json"
fetch(apiProdutos)
.then(res => res.json())
.then(res =>{
    res.forEach(el => {
        cardProduto.getprodutos(el)
    });
})

class cardProduto {
    static id = null
    static type = null
    static img = null
    static titulo = null
    static descricao = null
    static preco = null
    
    static getprodutos=(el)=>{
        this.id = el.id
        this.type = el.type
        this.img = el.img
        this.titulo = el.titulo
        this.descricao = el.descricao
        this.preco = el.preco
        
        const produto = selecionar(".card").cloneNode(true);
        produto.setAttribute("id", el.id)
        produto.classList.remove("hidden")
        produto.querySelector(".img").src = el.img
        produto.querySelector(".img").alt = el.titulo
        produto.querySelector(".titulo_info").innerText = el.titulo
        produto.querySelector(".desc_info").innerText = el.descricao
        produto.querySelector(".preco_info").innerText = el.preco[0]
        click(produto , el)
        if (el.type == "pizza") {
            pizzas.appendChild(produto)
        } else if (el.type == "pizza_doce") {
            pizzas_doces.appendChild(produto)
        } else {
            petiscos.appendChild(produto)
        }
    }
}

// janela card produto
const click = (elem , conf)=>{
    let teste = elem.querySelectorAll(".click")
    const click_produto = [...teste]
        click_produto.map((el)=>{
        el.addEventListener('click',(e)=>{
            janela(conf)
        })
    })
}

// fim janela card

let key = 0
// abre e fecha janela 
const janela = (conf)=>{
    if (box_card.classList[9] == 'hidden'){
        box_card.classList.remove('hidden')
        box_card.querySelector("#img").src = conf.img
        box_card.querySelector("#img").alt = conf.titulo
        box_card.querySelector(".titulo_info").innerText = conf.titulo
        box_card.querySelector(".descri_info").innerText = conf.descricao
        // box_card.querySelector("#preco").innerText = conf.preco[key]
        tamanho_pedido(box_card.querySelectorAll(".tm_p"))
        box_card.querySelector("#voltar").addEventListener("click",()=>{
            box_card.classList.add('hidden')
        })
    }
}

const tamanho_pedido = (tm)=>{
    tm.forEach((e)=>{
        e.addEventListener("click",()=>{
            remove_tamanho(tm)
            e.classList.add('bg-red-600','text-white')
            // key = e.id
            // console.log(key);
        })
    })

}

const remove_tamanho = (tm)=>{
    tm.forEach((e)=>{
        e.classList.remove('bg-red-600','text-white')
    })
}