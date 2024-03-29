let modalkey = 0
let arrayCar = []
let itemProdutos = []
let qtdProdutos = 1
const selecionar=(item)=>document.querySelector(item);

const pizzas = selecionar("#pizzas")
const pizzas_doces = selecionar("#pizzas_doces")
const petiscos = selecionar("#petiscos")
const sucos = selecionar("#sucos")
const box_card = selecionar("#box_card")

const apiProdutos = "lista_produtos.json"
fetch(apiProdutos)
.then(res => res.json())
.then(res =>{
    itemProdutos = res
    res.forEach((el,index) => {
        const produto = selecionar(".card").cloneNode(true);
        
        preencheDadosProdutos(produto, el, index)

        produto.addEventListener('click',(e)=>{
            let chave = key(e)

            abriJanela()

            preencheDadosmodal(el)

            preencherTamanhos(chave)

            selecionar('.qtd-produto').innerHTML = qtdProdutos
            
            escolherTamanhoPreco(chave)
        })

        btnFechar()
    });
})

const preencheDadosProdutos= (produto, conf, index) =>{
    produto.classList.remove("hidden")
    produto.setAttribute("data-key", index)
    produto.querySelector(".img").src = conf.img
    produto.querySelector(".img").alt = conf.titulo
    produto.querySelector(".titulo_info").innerText = conf.titulo
    produto.querySelector(".desc_info").innerText = conf.descricao
    produto.querySelector(".preco_info").innerText = formatoReal(conf.preco[0])
    if (conf.type == "pizza") {
        pizzas.appendChild(produto)
    } else if (conf.type == "pizza_doce") {
        pizzas_doces.appendChild(produto)
    } else if (conf.type == "sucos") {
        sucos.appendChild(produto)
    } else {
        petiscos.appendChild(produto)
    }
}

const formatoReal = (valor) =>{
    return valor.toLocaleString('pt-br',{ style: 'currency',currency: 'BRL'})
}

// abre e fecha janela 
const preencheDadosmodal= (conf)=>{
    box_card.firstElementChild.setAttribute('id',conf.id) 
    selecionar("#img").src = conf.img
    selecionar("#img").alt = conf.titulo
    box_card.querySelector(".titulo_info").innerText = conf.titulo
    box_card.querySelector(".descri_info").innerText = conf.descricao
    if (conf.type == "petiscos" || conf.type == 'sucos') {
        box_card.querySelector(".tm").classList.add("hidden")
    } else {
        box_card.querySelector(".tm").classList.remove("hidden")
    }
    selecionar("#preco").innerText = formatoReal(conf.preco[0])
    
}

const key = (e) =>{
    let key = e.target.parentNode.getAttribute('data-key')
    
    qtdProdutos = 1

    modalkey = key

    return key
}

const preencherTamanhos=() =>{
    
    document.querySelectorAll('.tm_p').forEach((size,sizeindex)=>{
        size.classList.remove('bg-red-600','text-white');
        (sizeindex == 0) ? size.classList.add('bg-red-600','text-white') : ''
    });
}

const escolherTamanhoPreco=(chave)=>{
    document.querySelectorAll('.tm_p').forEach((size , sizeindex)=>{
        size.addEventListener('click',()=>{
            selecionar('.tm_p.bg-red-600').classList.remove('bg-red-600','text-white')
            size.classList.add('bg-red-600','text-white')

            selecionar('#preco').innerHTML = formatoReal(itemProdutos[chave].preco[sizeindex])
        })
    })
}

const abriJanela = () =>{
    box_card.classList.remove("hidden")
}

const fechaJanela = () =>{
    box_card.classList.add("hidden")
    modalkey = 0
}

const btnFechar=()=>{
    document.querySelectorAll('#box_card button').forEach((item)=>item.addEventListener('click', fechaJanela))
}

const remove_tamanho = (tm)=>{
    tm.forEach((e)=>{
        e.classList.remove('bg-red-600','text-white')
    })
}

const mudarQuantidade = () =>{
    selecionar('#mais_produtos').addEventListener('click',()=>{
        qtdProdutos++
        selecionar('.qtd-produto').innerHTML = qtdProdutos
    })

    selecionar('#menos_produtos').addEventListener('click',()=>{
        if (qtdProdutos > 1) {
            qtdProdutos--
            selecionar('.qtd-produto').innerHTML = qtdProdutos
        }
    })
}

const adicionarNoCarrinho = () =>{
    selecionar('#carrinho').addEventListener('click',()=>{
        console.log('adicionado no carrinho');
    })
}

mudarQuantidade()
adicionarNoCarrinho()
