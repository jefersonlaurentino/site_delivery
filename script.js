let modalkey = 0

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
        produto.setAttribute("id", this.id)
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

const pegarKey= (e)=>{
    console.log(e.target.closest('.card').id);
}

// janela card produto
const click = (elem , conf)=>{
    let teste = elem.querySelectorAll(".click")
    const click_produto = [...teste]
        click_produto.map((el)=>{
        el.addEventListener('click',(e)=>{
            pegarKey(e)
            abriJanela(conf)
        })
    })
}

// fim janela card


// abre e fecha janela 
const janela = (conf)=>{
    selecionar("#img").src = conf.img
    selecionar("#img").alt = conf.titulo
    box_card.querySelector(".titulo_info").innerText = conf.titulo
    box_card.querySelector(".descri_info").innerText = conf.descricao
    if (conf.type == "petisco") {
        box_card.querySelector(".tm").classList.add("hidden")
    } else {
        box_card.querySelector(".tm").classList.remove("hidden")
    }
    selecionar("#preco").innerText = formatoReal(conf.preco[0])
    tamanho_pedido(box_card.querySelectorAll(".tm_p"))
    box_card.querySelector("#voltar").addEventListener("click",()=>{
        fechaJanela()
    })

}

const abriJanela = (conf) =>{
    box_card.classList.remove("hidden")
    janela(conf)
}

const fechaJanela = () =>{
    box_card.classList.add("hidden")
}

const tamanho_pedido = (tm)=>{
    tm.forEach((e)=>{
        e.addEventListener("click",()=>{
            remove_tamanho(tm)
            e.classList.add('bg-red-600','text-white')
            // console.log(key);
        })
    })

}

const remove_tamanho = (tm)=>{
    tm.forEach((e)=>{
        e.classList.remove('bg-red-600','text-white')
    })
}