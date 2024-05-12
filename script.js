let modalkey = 0
let arrayCar = []
let arrayBordas = [
    {
        0: [6, 2, 2, 6]
    },
    {
        0: [6, 2, 2, 6]
    },
    {
        0: [10, 4, 4, 10]
    },
    {
        0: [12, 5, 5, 12]
    }
]
let chaveIndex = 2
let itemProdutos = []
let qtdProdutos = 1
const selecionar = (item) => document.querySelector(item);
const selecionarTodos = (item) => document.querySelectorAll(item);

const saboresPizzas = selecionarTodos('.sabores__pizzas')
const pizzas = selecionar("#pizzas")
const pizzas_especiais = selecionar("#pizzas_especiais")
const pizzas_doces = selecionar("#pizzas_doces")
const petiscos = selecionar("#petiscos")
const sucos = selecionar("#sucos")
const box_card = selecionar("#box_card")
const montePizzaClassic = selecionarTodos('.pz__classic')
const montePizzaEspeciais = selecionar('.pz__especiais')
const montePizzaDoces = selecionar('.pz__doces')

const apiProdutos = "lista_produtos.json"
fetch(apiProdutos)
    .then(res => res.json())
    .then(res => {
        itemProdutos = res
        res.forEach((el, index) => {
            const produto = selecionar(".card").cloneNode(true);

            preencheDadosProdutos(produto, el, index)

            produto.addEventListener('click', (e) => {
                let chave = key(e)

                abriJanela()

                preencheDadosmodal(el)

                preencherTamanhos(chave)

                selecionar('.qtd-produto').innerHTML = qtdProdutos

                escolherTamanhoPreco(chave)

                escolherBorda()
            })

            btnFechar()
        });
    })

    const btn = selecionar('.montePizza')
    btn.addEventListener('click',(e)=>{
        selecionar('.monte_pizza').classList.remove('hidden')
        escolhe_borda()
    })

const montarSaboresPizza = (conf , index) =>{
    let element = document.createElement('option')
    element.setAttribute('value', index)
    element.innerHTML = conf.titulo
    if (conf.type == 'pizza') {
        addPZClassic('#P__classic',element)
    } else if (conf.type == 'pizzas_especiais'){
        montePizzaEspeciais.appendChild(element)
    } else {
        montePizzaDoces.appendChild(element)
    }
} 

const addPZClassic = (id,element) =>{
    selecionar(id).append(element)
}

const montarSaboresPizza2 = (conf , index) =>{
    let element = document.createElement('option')
    element.setAttribute('value', index)
    element.innerHTML = conf.titulo
    if (conf.type == 'pizza') {
        addPZClassic2('#P2__classic',element)
    } else if (conf.type == 'pizzas_especiais'){
        montePizzaEspeciais.appendChild(element)
    } else {
        montePizzaDoces.appendChild(element)
    }
} 

const addPZClassic2 = (id,element) =>{
    selecionar(id).append(element)
}

const escolhe_borda = () =>{
    let nome = ["chocolate","cheddar", "catupiry" , "cream cheese"]
    for (let index = 0; index < arrayBordas.length ; index++) {
        let bordas = document.createElement('option')
        bordas.value = index
        bordas.innerHTML = nome[index]
        selecionar('#escolhe_borda').appendChild(bordas)
    }
}

const preencheDadosProdutos = (produto, conf, index) => {
    produto.classList.remove("hidden")
    produto.setAttribute("data-key", index)
    produto.querySelector(".img").src = conf.img
    produto.querySelector(".img").alt = conf.titulo
    produto.querySelector(".titulo_info").innerText = conf.titulo
    produto.querySelector(".desc_info").innerText = conf.descricao
    produto.querySelector(".preco_info").innerText = formatoReal(conf.preco[0])
    if (conf.type == "pizza") {
        pizzas.appendChild(produto)
        montarSaboresPizza(conf , index)
        montarSaboresPizza2(conf , index)
    } else if (conf.type == "pizzas_especiais") {
        pizzas_especiais.appendChild(produto)
        montarSaboresPizza(conf , index)
    } else if (conf.type == "pizzas_doces") {
        pizzas_doces.appendChild(produto)
        montarSaboresPizza(conf , index)
    } else if (conf.type == "sucos") {
        sucos.appendChild(produto)
        sucos.querySelector('.span_preco').remove()
    } else {
        petiscos.appendChild(produto)
    }
}

const formatoReal = (valor) => {
    return valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
}

// abre e fecha janela 
const preencheDadosmodal = (conf) => {
    box_card.firstElementChild.setAttribute('id', conf.id)
    selecionar("#img").src = conf.img
    selecionar("#img").alt = conf.titulo
    box_card.querySelector(".titulo_info").innerText = conf.titulo
    box_card.querySelector(".descri_info").innerText = conf.descricao

    if (conf.type == "petiscos") {
        box_card.querySelector("#tm_4").classList.add("hidden")
        box_card.querySelector("#tm_2").classList.add("hidden")
    } else if (conf.type == 'sucos') {
        selecionar('#tm_4').querySelectorAll('p').forEach((item) => item.classList.remove('tm_p'))
        box_card.querySelector("#tm_2").classList.remove("hidden")
        box_card.querySelector("#tm_4").classList.add("hidden")
    } else {
        selecionar('#tm_4').querySelectorAll('p').forEach((item) => item.classList.add('tm_p'))
        box_card.querySelector("#tm_4").classList.remove("hidden")
        box_card.querySelector("#tm_2").classList.add("hidden")
    }
}

const key = (e) => {
    let key = e.target.parentNode.getAttribute('data-key')

    qtdProdutos = 1

    modalkey = key

    return key
}

const preencherTamanhos = () => {

    document.querySelectorAll('.tm_p').forEach((size) => {
        size.classList.remove('selected');
        (size.id == 0) ? size.classList.add('selected') : ''
    });
}

const escolherTamanhoPreco = (chave) => {
    selecionar('option').setAttribute('disabled', true)
    // borda(chave)
    let Borda = null//selecionar('#list_bordas').value
    let tmP = 0
    selecionar('#list_bordas').addEventListener('change', (item) => {
        Borda = item.target.value
        borda(chave, tmP, Borda)
        console.log(item);
    })
    document.querySelectorAll('.tm_p').forEach((size) => {
        size.addEventListener('click', () => {
            selecionar('.tm_p.selected').classList.remove('selected')
            size.classList.add('selected')
            tmP = size.id
            borda(chave, size.id, Borda)

            // let teste = selecionar('#list_bordas')
            // console.log(teste.value == '');
        })
    })
    selecionarTodos('input[type="radio"]').forEach((item) => {
        item.addEventListener('click', (el) => {
            if (el.target.id == 'nao') {
                Borda = null
                borda(chave, tmP, Borda)
                removeSelection()
            }
        })
    })
    borda(chave, tmP, Borda)
}

const borda = (chave, preco, borda) => {
    if (borda != null) {
        selecionar('#preco').innerHTML = formatoReal((itemProdutos[chave].preco[preco] + arrayBordas[preco][0][borda]))
    } else {
        selecionar('#preco').innerHTML = formatoReal(itemProdutos[chave].preco[preco])
    }
}

const escolherBorda = (chave) => {
    selecionarTodos('input[type="radio"]').forEach((item) => {
        item.addEventListener('click', (el) => {
            if (el.target.id == 'sim') {
                selecionar('.select').classList.remove('hidden')
            } else {
                selecionar('.select').classList.add('hidden')
            }
        })
    })
}

const removeSelection = () => {
    selecionarTodos('option').forEach((item, index) => {
        if (item.selected) {
            item.selected = false
        }
        if (index == 0) {
            item.removeAttribute('disabled')
        }
    })
}

const abriJanela = () => {
    box_card.classList.remove("hidden")
}

const fechaJanela = () => {
    box_card.classList.add("hidden")
    selecionarTodos('#tm_4 input[type="radio"]').forEach((item) => {
        if (item.id == 'sim') {
            item.checked = false
            removeSelection()
        } else {
            item.checked = true
        }
    })

    selecionar('.select').classList.add('hidden')
    modalkey = 0
}

const btnFechar = () => {
    document.querySelectorAll('#box_card button').forEach((item) => item.addEventListener('click', fechaJanela))
}

const remove_tamanho = (tm) => {
    tm.forEach((e) => {
        e.classList.remove('bg-red-600', 'text-white')
    })
}

const mudarQuantidade = () => {
    selecionar('#mais_produtos').addEventListener('click', () => {
        qtdProdutos++
        selecionar('.qtd-produto').innerHTML = qtdProdutos
    })

    selecionar('#menos_produtos').addEventListener('click', () => {
        if (qtdProdutos > 1) {
            qtdProdutos--
            selecionar('.qtd-produto').innerHTML = qtdProdutos
        }
    })
}

const adicionarNoCarrinho = () => {
    selecionar('#carrinho').addEventListener('click', () => {
        console.log('adicionado no carrinho');

        let size = selecionar('.tm_p.selected').getAttribute('data-key')

        let preco = selecionar('#preco').innerHTML.replace('R$&nbsp;', '')

        let identifica = itemProdutos[modalkey].id + 't' + size

        let sizeBorda = selecionar('#list_bordas').value
        if (sizeBorda != '') {
            identifica += `comB${sizeBorda}`
        } else {
            console.log('nao tem borda');
        }

        let arrayNomesBordas = ['Chocolate', 'Cheddar', 'Catupiry', 'Cream Cheese']
        let chave = arrayCar.findIndex((item) => item.identifica == identifica)

        if (chave > -1) {
            arrayCar[chave].qt += qtdProdutos
            console.log(qtdProdutos);
        } else {
            let item = {
                identifica,
                id: itemProdutos[modalkey].id,
                size,
                qt: qtdProdutos,
                Borda: (sizeBorda) ? arrayNomesBordas[sizeBorda] : '',
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

const atualizaCarrinho = () => {
    selecionar('.carrinho').dataset.content = (arrayCar.length < 10) ? `0${arrayCar.length}` : arrayCar.length

    if (arrayCar.length > 0) {

        selecionar('#pdts_carrinho').innerHTML = ''

        let subTotal = 0
        let total = 0

        for (let i in arrayCar) {
            let produtoItem = itemProdutos.find((item) => item.id == arrayCar[i].id)

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
                cardItem.querySelector('.descricao').innerHTML = (arrayCar[i].Borda != '') ? `(${itemSizeName}) Borda: ${arrayCar[i].Borda}` : `(${itemSizeName})`
            }
            cardItem.querySelector('.qt').innerHTML = arrayCar[i].qt

            cardItem.querySelector('.qt_mais').addEventListener('click', () => {
                arrayCar[i].qt++
                atualizaCarrinho()
            })

            cardItem.querySelector('.qt_menos').addEventListener('click', () => {
                if (arrayCar[i].qt > 1) {
                    arrayCar[i].qt--
                } else {
                    arrayCar.splice(i, 1)
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

const abrirCarrinho = () => {
    if (arrayCar.length > 0) {
        selecionar('#box_carrinho').classList.remove('left-full')
    }
}

const fechaCarrinho = () => {
    selecionarTodos('.voltar_carrinho').forEach((item) => {
        item.addEventListener('click', () => selecionar('#box_carrinho').classList.add('left-full'))
    })
}

mudarQuantidade()
selecionar('.carrinho').addEventListener('click', () => abrirCarrinho())
adicionarNoCarrinho()
atualizaCarrinho()
fechaCarrinho()


// parte endereço
selecionar('.finalizar_pedido').addEventListener('click', () => {
    removeHidden('.campo__endereco', 'hidden')
    valorAPagar()
    zonaInput()
    selecionarTodos('#pagamento option')[0].setAttribute('disabled', true)
})

const validityInput = (input) => {
    return selecionar(input).validity.valid
}

selecionar('.enviar_wap').addEventListener('click', (e) => {
    let name = validityInput('#input_name')
    let end = validityInput('#endereco')
    let zona = validityInput('.zona_input input')
    let NuCasa = validityInput('#N_casa')
    let typePagamento = validityInput('#pagamento')
    let troco = validityInput('.troco input')
    let voltaTroco = validityInput('#T_valor')

    let valueTotal = parseFloat((selecionar('.valor__total p').innerHTML).replace('R$&nbsp;',''))
    let valueTroco = parseFloat(selecionar('#T_valor').value)

    if (name && end && zona && NuCasa && typePagamento && troco && voltaTroco) {
        if (valueTroco > valueTotal) {
            enviarPedido()
        } else {
            alert('valor para troco deve ser maior')
            e.preventDefault()
        }
    }
})

selecionar('.cancelar').addEventListener('click', (e) => {
    e.preventDefault()
    selecionarTodos('#pagamento option')[0].removeAttribute('disabled')
    removeSelection()
    addHidden('.campo__endereco', 'hidden')
})

const zonaInput = () => {
    selecionarTodos('.zona_input input[type="radio"]').forEach((item) => {
        item.addEventListener('change', (e) => {
            if (e.target.id == 'rural') {
                selecionar('.valor__entrega p').innerHTML = formatoReal(5)
                valorAPagar(5)
            } else {
                selecionar('.valor__entrega p').innerHTML = 'Grátis'
                valorAPagar(0)
            }
        })
    })
}

const qtdTroco = () => {
    selecionarTodos('.troco input').forEach((item) => {
        item.addEventListener('click', (troco) => {
            if (troco.target.id == 'T_sim') {
                removeHidden('.qtTroco', 'hidden')
                selecionar('.qtTroco input').setAttribute('required', true)
            } else {
                addHidden('.qtTroco', 'hidden')
                selecionar('.qtTroco input').removeAttribute('required')
            }
        })
    })
}

const removeHidden = (itemDom, element) => {
    selecionar(itemDom).classList.remove(element)
}

const addHidden = (itemDom, element) => {
    selecionar(itemDom).classList.add(element)
}

const formaPagamento = () => {
    selecionar('#pagamento').addEventListener('change', (fornato) => {
        if (fornato.target.value == 'dinheiro') {
            removeHidden('.troco', 'hidden')
            selecionar('.troco input').setAttribute('required', true)
        } else {
            addHidden('.troco', 'hidden')
            selecionarTodos('.troco input').forEach((el) => el.checked = false)
            selecionar('.troco input').removeAttribute('required')
            addHidden('.qtTroco', 'hidden')
            selecionar('.qtTroco input').removeAttribute('required')
        }
    })
}

const valorAPagar = (valor = 0) => {
    if (valor != 0) {
        selecionar('.valor__total p').innerHTML = formatoReal((parseInt(selecionar('#valor_carrinho span').innerHTML.replace('R$&nbsp;', '')) + valor))
    } else {
        selecionar('.valor__total p').innerHTML = selecionar('#valor_carrinho span').innerHTML
    }
}

const enviarPedido = () => {
    let arrayEnviarPedido = []
    let obs = selecionar('#obs').value

    let end = selecionar('#endereco').value
    let zona;
    selecionarTodos('.zona_input input').forEach((item) => {
        if (item.checked) {
            zona = item.id
        }
    })
    let NuCasa = selecionar('#N_casa').value
    let pontoReferencia = selecionar('#referencia').value
    let total = selecionar('.valor__total p').innerHTML.replace('R$&nbsp;', '')
    let frete = selecionar('.valor__entrega p').innerHTML.replace('R$&nbsp;', '')
    let troco = selecionar('#T_sim').checked
    let formatoPg = selecionar('#pagamento').value
    let qtTroco = selecionar('#T_valor').value

    for (const i in arrayCar) {
        let arrayPedidos = {
            titulo: itemProdutos[(parseInt(arrayCar[i].id) - 1)].titulo,
            size: arrayCar[i].size,
            qt: arrayCar[i].qt,
            preco: arrayCar[i].preco,
            borda: (arrayCar[i].Borda) ? arrayCar[i].Borda : undefined,
        }
        arrayEnviarPedido.push(arrayPedidos)
    }
    let fone = 5584987121574
    let teste = '-------PEDIDO-------%0A%0A'

    for (let i = 0; i < arrayEnviarPedido.length; i++) {
        let msg = ''
        if (arrayEnviarPedido[i].borda == undefined) {
            msg += `${arrayEnviarPedido[i].qt} - ${arrayEnviarPedido[i].titulo} (${arrayEnviarPedido[i].size})%0A`
        } else {
            msg += `${arrayEnviarPedido[i].qt} - ${arrayEnviarPedido[i].titulo} (${arrayEnviarPedido[i].size}) com borda de ${arrayEnviarPedido[i].borda}%0A`
        }

        teste += msg
    }

    teste += `------OBSERVAÇÃO------%0A%0AObs:%20${obs}%0A%0A-----DADOS DO CLIENTE-----%0A%0A`
    if (frete != 'Grátis') {
        frete = 'R$ ' + frete
    }

    let value_troco = parseFloat(qtTroco) - parseFloat(total)

    if (troco) {
        if (pontoReferencia) {
            teste += `Endereço: ${end}-${NuCasa}/zona ${zona}.%0APonto de referencia: ${pontoReferencia}.%0AEntrega: ${frete}.%0APagamento no: ${formatoPg}.%0ATroco para: R$${qtTroco}.%0Avalor total: R$${total}.%0A*valor do troco: R$ ${value_troco},00*`
        } else {
            teste += `Endereço: ${end}-${NuCasa}/zona ${zona}.%0Aentrega: ${frete}.%0APagamento no: ${formatoPg}.%0ATroco para: R$${qtTroco}.%0Avalor total: R$${total}.%0A*valor do troco: R$ ${value_troco},00*`
        }
        
    } else {
        if (pontoReferencia) {
            teste += `Endereço: ${end}-${NuCasa}/zona ${zona}.%0Aentrega: ${frete}.%0APagamento no: ${formatoPg}.%0Avalor total: R$${total}.`
        } else {
            teste += `Endereço: ${end}-${NuCasa}/zona ${zona}.%0APonto de referencia: ${pontoReferencia}.%0Aentrega: ${frete}.%0APagamento no: ${formatoPg}.%0Avalor total: R$${total}.`
        }
    }


    let url = `https://api.whatsapp.com/send?phone=${fone}&text=${teste}`
    window.open(url)
}

selecionar('#T_valor').addEventListener('input', (el) => {
    el.target.value = el.target.value.replace(/[^0-9\,\.]/g, '')
})

selecionar('#T_valor').addEventListener('change', (el) => {
    let value = parseFloat(el.target.value).toFixed(2)
    el.target.value = value.replace(/[.]/g, ',')
})

formaPagamento()
qtdTroco()
