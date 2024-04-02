let modalkey = 0
let arrayCar = []
let arrayBordas = [
        {
            0: [ 6 , 2 , 2 , 6 ]
        },
        {
            0: [ 6 , 2 , 2 , 6 ]
        },
        {
            0: [ 10 , 4 , 4 , 10 ]
        },
        {
            0: [ 12 , 5 , 5 , 12 ]
        }
    ]
    console.log(arrayBordas);
    console.log(arrayBordas[1][0][2]);
let chaveIndex = 2
let itemProdutos = []
let qtdProdutos = 1
const selecionar=(item)=>document.querySelector(item);
const selecionarTodos=(item)=>document.querySelectorAll(item);

const pizzas = selecionar("#pizzas")
const pizzas_especiais = selecionar("#pizzas_especiais")
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
    } else if (conf.type == "pizzas_especiais") {
        pizzas_especiais.appendChild(produto)
    } else if (conf.type == "pizzas_doces") {
        pizzas_doces.appendChild(produto)
    } else if (conf.type == "sucos") {
        sucos.appendChild(produto)
        sucos.querySelector('.span_preco').remove()
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

    if (conf.type == "petiscos") {
        box_card.querySelector("#tm_4").classList.add("hidden")
        box_card.querySelector("#tm_2").classList.add("hidden")
    } else if (conf.type == 'sucos') {
        selecionar('#tm_4').querySelectorAll('p').forEach((item)=>item.classList.remove('tm_p'))
        box_card.querySelector("#tm_2").classList.remove("hidden")
        box_card.querySelector("#tm_4").classList.add("hidden")
    } else {
        selecionar('#tm_4').querySelectorAll('p').forEach((item)=>item.classList.add('tm_p'))
        box_card.querySelector("#tm_4").classList.remove("hidden")
        box_card.querySelector("#tm_2").classList.add("hidden")
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
    
    document.querySelectorAll('.tm_p').forEach((size)=>{
        size.classList.remove('selected');
        (size.id == 0) ? size.classList.add('selected') : ''
    });
}

const escolherTamanhoPreco=(chave)=>{
    let teste = null
    document.querySelectorAll('.tm_p').forEach((size)=>{
        size.addEventListener('click',()=>{
            selecionar('.tm_p.selected').classList.remove('selected')
            size.classList.add('selected')

            selecionar('#preco').innerHTML = formatoReal(itemProdutos[chave].preco[size.id])

            teste = size.id
        })
    })
let index = 0
let size = ''
    box_card.querySelector('#sim').addEventListener('click',()=>{
        selecionar('.select').classList.remove('hidden')
        selecionar('#list_bordas').addEventListener('change',(e)=>{
            let borda = e.target.value
            if (teste != null) {
                index = teste
            }
            if (index == 1) {
                size = 'm'
            } else if (index == 2) {
                size = 'g'
            } else if (index == 3) {
                size = 'gg'
            }

            console.log(size);
            console.log(itemProdutos[chave]);
            console.log(itemProdutos[chave].preco[index]);
            // console.log(`pizza ${itemProdutos[chave].titulo} com borda ${arrayBordas[0][borda]}`);
            // arrayBordas[0].p[borda]
            let tes = 
            selecionar('#preco').innerHTML = formatoReal(itemProdutos[chave].preco[index] + arrayBordas[index][0][borda])
        })
    })

    box_card.querySelector('#nao').addEventListener('click',()=>{
        selecionar('.select').classList.add('hidden')
        index = 0
        selecionar('#preco').innerHTML = formatoReal(itemProdutos[chave].preco[teste])
    })
}

const abriJanela = () =>{
    box_card.classList.remove("hidden")
}

const fechaJanela = () =>{
    box_card.classList.add("hidden")
    selecionar('.select').classList.add('hidden')
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

        let size = selecionar('.tm_p.selected').getAttribute('data-key')

        let preco = selecionar('#preco').innerHTML.replace('R$&nbsp;','')

        let identifica = itemProdutos[modalkey].id+'t'+size

        let chave = arrayCar.findIndex((item)=>item.identifica == identifica)

        if (chave > -1) {
            arrayCar[chave].qt += qtdProdutos
            console.log(qtdProdutos);
        } else {
            let item = {
                identifica,
                id: itemProdutos[modalkey].id,
                size,
                qt: qtdProdutos,
                preco: parseFloat(preco)
            }
            arrayCar.push(item)
            console.log(preco);
            console.log(arrayCar);
            console.log(`sub total R$ ${(item.qt * item.preco).toFixed(2)}`);
        }

        fechaJanela()
        atualizaCarrinho()
    })
}

const atualizaCarrinho = () =>{
    selecionar('.carrinho').dataset.content = (arrayCar.length < 10) ? `0${arrayCar.length}` : arrayCar.length 

    if (arrayCar.length > 0) {

        selecionar('#pdts_carrinho').innerHTML = ''

        let subTotal = 0
        let total = 0

        for (let i in arrayCar) {
            let produtoItem = itemProdutos.find((item) =>item.id == arrayCar[i].id)

            subTotal += arrayCar[i].preco * arrayCar[i].qt

            let cardItem = selecionar('.card_item').cloneNode(true)
            selecionar('#pdts_carrinho').append(cardItem)

            let itemSizeName = arrayCar[i].size
            
            let itemName = `${produtoItem.titulo} (${itemSizeName})`

            cardItem.querySelector('img').src = produtoItem.img
            cardItem.querySelector('img').alt = produtoItem.titul
            cardItem.querySelector('.titulo').innerHTML = produtoItem.titulo
            if (produtoItem.type == 'petiscos') {
                cardItem.querySelector('.descricao').innerHTML = ''
            } else {
                cardItem.querySelector('.descricao').innerHTML = `(${itemSizeName})`
            }
            cardItem.querySelector('.qt').innerHTML = arrayCar[i].qt

            cardItem.querySelector('.qt_mais').addEventListener('click',()=>{
                arrayCar[i].qt++
                atualizaCarrinho()
            })

            cardItem.querySelector('.qt_menos').addEventListener('click',()=>{
                if (arrayCar[i].qt > 1) {
                    arrayCar[i].qt--
                } else {
                    arrayCar.splice(i,1)
                }

                atualizaCarrinho()
            })

            selecionar('#pdts_carrinho').append(cardItem)
        }

        total = subTotal
        selecionar('#valor_carrinho span').innerHTML = formatoReal(total)
    } else {
        selecionar('#box_carrinho').classList.add('left-full')
    }
}

const abrirCarrinho = () =>{
    if (arrayCar.length > 0) {
        selecionar('#box_carrinho').classList.remove('left-full')
    }
}

const fechaCarrinho = ()=>{
    selecionarTodos('.voltar_carrinho').forEach((item)=>{
        item.addEventListener('click', () => selecionar('#box_carrinho').classList.add('left-full'))
    })
}

mudarQuantidade()
selecionar('.carrinho').addEventListener('click',()=>abrirCarrinho())
adicionarNoCarrinho()
atualizaCarrinho()
fechaCarrinho()
