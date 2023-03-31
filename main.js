var table = document.getElementById("table")
var divResultado = document.getElementById("resultado")
var inputNome = document.getElementById("nome")
var inputPreco = document.getElementById("preco")
var inputEstoque = document.getElementById("estoque")
var buttonAtualizar = document.getElementById("buttonAtualizar")

var id = 4
var arrayProdutos = [
    {id: 1, nome: "Camiseta", preco: 29.99, estoque: 20 },
    {id: 2, nome: "Calça", preco: 59.99, estoque: 10 },
    {id: 3, nome: "Meia", preco: 9.99, estoque: 50 },
    {id: 4, nome: "Meia", preco: 7.99, estoque: 30 }
]

function cadastrarProduto(){
    var inputNome = document.getElementById("nome").value
    var inputPreco = document.getElementById("preco").value
    var inputEstoque = document.getElementById("estoque").value
    


     
     if(inputNome == "" || inputPreco == "" || inputEstoque == ""){
        alert("Todos os campos devem ser preenchidos")
     }
     else{
        let newProduto = new Produto(inputNome, inputPreco, inputEstoque)
     adicionarProduto(newProduto)
     }
}

function adicionarProduto(newProdut){
newProdut.id = id++
   arrayProdutos.push(newProdut)
   
   alert("Produto adicionado com sucesso ")
   limparInputs()
   if(divResultado.innerHTML != ""){
    exibirProdutos()
   }
   
}


function Produto(nome, preco, estoque) {
    this.nome = nome;
    this.preco = preco;
    this.estoque = estoque;

    
}

function exibirProdutos(){
    table.style.display = ""
    divResultado.innerHTML= ""
    arrayProdutos.map((Element) =>{
        divResultado.innerHTML += `<tr ><th>${Element.id}</th><strong>  <th><h3> ${Element.nome}</th><th>${Element.preco} </th><th>${Element.estoque}</th> <th><button type="button" class="btn btn-light" id="editar-produto" onclick="editarProduto(${Element.id})">Editar Produto</button></th><th><button type="button" class="btn btn-danger" id="excluir-produto" onclick="excluirProduto(${Element.id})">Excluir</button></th></tr></h3>`
               
    })
    setTimeout(limparInputs, 500)
    
}
var produtoEncontrado
function encontrarProdutos(){
    divResultado.innerHTML= ""
    var num =0
    let buscarNome = prompt("Digite o produto a ser buscado")
    arrayProdutos.forEach((produto) =>{
        if(produto.nome.toUpperCase() === buscarNome.toUpperCase()){
            num++
            table.style.display = ""
            divResultado.innerHTML += `<tr class="table-striped "><th>${produto.id}</th><strong> <th><h3> ${produto.nome}</th><th>${produto.preco} </th><th>${produto.estoque}</th> <th><button type="button" class="btn btn-light" id="editar-produto" onclick="editarProduto(${produto.id})">Editar Produto</button></th><th><button type="button" class="btn btn-danger" id="excluir-produto" onclick="excluirProduto(${produto.id})">Excluir</button></th></tr></h3> `    
            return produto}
        else{return null}  
      })
      if ( num === 0){
        alert("Produto não encontrado (obs: é necessario inserir os acentos)")
      }  
}
let n = 0
function verificarEstoque(){
    let buscarEstoque = prompt("Digite o produto a ser verificado")
    divResultado.innerHTML= ""
    arrayProdutos.find((buscarProduto) =>{
      if(buscarProduto.nome.toUpperCase() === buscarEstoque.toUpperCase()){
        table.style.display = ""
      divResultado.innerHTML += `<tr class="table-striped "><th>${buscarProduto.id}</th><strong>  <th><h3> ${buscarProduto.nome}</th><th>${buscarProduto.preco} </th><th>${buscarProduto.estoque}</th> <th><button type="button" class="btn btn-light" id="editar-produto" onclick="editarProduto(${id})">Editar Produto</button></th><th><button type="button" class="btn btn-danger" id="excluir-produto" onclick="excluirProduto(${buscarProduto.id})">Excluir</button></th></tr></h3> `
        n++
    }  
    })
    if(n == 0){
        alert("Produto não encontrado (obs: é necessario inserir os acentos)")
      }
   
}

function ordenarPorPreco(){
    arrayProdutos.sort(function(a, b){
        if(a.preco < b.preco){
            return -1
        }
        else {
            return true
        }
    })
    //Ordenar Ids
   for(let i=0; i<arrayProdutos.length; i++){
    id = 1
    arrayProdutos[i].id = id + i
       
   }

    divResultado.innerHTML = ""
    arrayProdutos.map((Element) =>{
        table.style.display = ""
        divResultado.innerHTML += `<tr class="table-striped "><th>${Element.id}</th><strong> <th><h3> ${Element.nome}</th><th>${Element.preco} </th><th>${Element.estoque}</th></strong> <th><button type="button" class="btn btn-light" id="editar-produto" onclick="editarProduto(${Element.id})">Editar Produto</button></th><th><button type="button" class="btn btn-danger" id="excluir-produto" onclick="excluirProduto(${Element.id})">Excluir</button></th></tr></h3>`

    })
      
}
function editarProduto(ev){
    analisarProduto(ev)
    ev= ""
    
}
var elemnto = 0
function analisarProduto(elementoId){
    limparInputs()
    elementoId = parseInt(elementoId)
   // console.log(arrayProdutos.indexOf({id: elementoId, nome: buscarProduto.nome, preco: buscarProduto.preco, estoque: buscarProduto.estoque }))
        for(let i =0; i<arrayProdutos.length; i++){
        if(arrayProdutos[i].id === elementoId){
            inputNome.value = arrayProdutos[i].nome
            inputPreco.value = arrayProdutos[i].preco
            inputEstoque.value = arrayProdutos[i].estoque
            elemnto = parseInt(elementoId)
            break
        }  
        
    }
    buttonAtualizar.innerHTML = `<button type="button" class="btn btn-toolbar" id="buttonAtualizar">Atualizar</button>`
    buttonAtualizar.addEventListener("click",(event)=>{
        event.preventDefault()
       atualizacaoProduto()
    })
    
    
}
function atualizacaoProduto(){
    
        for(let i = 0; i<arrayProdutos.length; i++){
            if(arrayProdutos[i].id === elemnto){
                let nomeInput = inputNome.value
                let precoInput = parseFloat(inputPreco.value)
                let estoqueInput = parseFloat(inputEstoque.value)
                if(inputNome.value == "" || inputPreco.value == "" || inputEstoque.value == ""){
                    alert("Todos os campos devem ser preenchidos")
                }
                 else{
                arrayProdutos[i].nome = inputNome.value
                arrayProdutos[i].preco = inputPreco.value
                arrayProdutos[i].estoque = inputEstoque.value
                exibirProdutos()
                }
            }
        }
            exibirProdutos()

    }
function limparInputs(){
    inputNome.value = ""
    inputPreco.value = ""
    inputEstoque.value = ""
    buttonAtualizar.innerHTML = ""
}

function excluirProduto(idExcluir){
    let confirma = confirm("Deseja realmente excluir? (obs: Os dados não poderão ser recuperados)")
    if(confirma){
    arrayProdutos.splice(idExcluir - 1, 1)
    exibirProdutos()
    }
}