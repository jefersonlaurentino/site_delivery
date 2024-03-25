let modalkey = 0
let arrayCar = []

const selecionar=(item)=>document.querySelector(item);

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
        this.conf = el
        
        const produto = selecionar(".card").cloneNode(true);
        produto.classList.remove("hidden")
        produto.querySelector(".img").src = this.img
        produto.querySelector(".img").alt = this.titulo
        produto.querySelector(".titulo_info").innerText = this.titulo
        produto.querySelector(".desc_info").innerText = this.descricao
        produto.querySelector(".preco_info").innerText = formatoReal(this.preco[0])
        click(produto , this.conf)
        if (this.conf.type == "pizza") {
            pizzas.appendChild(produto)
        } else if (this.conf.type == "pizza_doce") {
            pizzas_doces.appendChild(produto)
        } else {
            petiscos.appendChild(produto)
        }
    }
}

const formatoReal = (valor) =>{
    return valor.toLocaleString('pt-br',{ style: 'currency',currency: 'BRL'})
}

// janela card produto
const click = (elem , conf)=>{
    let teste = elem.querySelectorAll(".click")
    const click_produto = [...teste]
        click_produto.map((el)=>{
        el.addEventListener('click',(e)=>{
            abriJanela(conf)
        })
    })
}

// fim janela card


// abre e fecha janela 
const janela = (conf)=>{
    let tes = box_card.firstElementChild.setAttribute('id',conf.id) 
    selecionar("#img").src = conf.img
    selecionar("#img").alt = conf.titulo
    box_card.querySelector(".titulo_info").innerText = conf.titulo
    box_card.querySelector(".descri_info").innerText = conf.descricao
    if (conf.type == "petisco") {
        box_card.querySelector(".tm").classList.add("hidden")
    } else {
        box_card.querySelector(".tm").classList.remove("hidden")
    }
    selecionar("#preco").innerText = formatoReal(conf.preco[modalkey])
    tamanho_pedido(box_card.querySelectorAll(".tm_p"),conf)
    
    box_card.querySelector('#voltar').addEventListener('click',()=>{
        fechaJanela()
    })
    box_card.querySelector('#carrinho').addEventListener('click',()=>{
        fechaJanela()
    })
}

const abriJanela = (conf) =>{
    box_card.classList.remove("hidden")
    janela(conf)
}

const fechaJanela = () =>{
    box_card.classList.add("hidden")
    modalkey = 0
}

const tamanho_pedido = (tm,conf)=>{
    tm.forEach((e,index)=>{
        remove_tamanho(tm)
        tm[0].classList.add('bg-red-600','text-white')
        e.addEventListener("click",()=>{
            remove_tamanho(tm)
            e.classList.add('bg-red-600','text-white')
            selecionar("#preco").innerText = formatoReal(conf.preco[index])
            modalkey = index
        })
    })
// e.classList.add('bg-red-600','text-white')
}

const remove_tamanho = (tm)=>{
    tm.forEach((e)=>{
        e.classList.remove('bg-red-600','text-white')
    })
}