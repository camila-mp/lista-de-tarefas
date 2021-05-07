
//armazenando elementos uteis em variaveis//
let listaTarefas = document.getElementById('lista-tarefas');
let botaoCriarTarefa = document.getElementById('criar-tarefa');
let botaoApagarTudo = document.getElementById('apaga-tudo');
let botaoApagarFin = document.getElementById('remover-finalizados');
let botaoSalvar = document.getElementById('salvar-tarefas');
let elementoInput = document.getElementById('texto-tarefa');
let listaLis = document.getElementsByClassName('item-lista');

//criando uma div para guardar texto do botao adicionar//
let divBotao = document.createElement('div');
botaoCriarTarefa.appendChild(divBotao);
divBotao.id = 'texto-botao'
divBotao.innerHTML = 'Adicionar'

//criando uma div para guardar texto do botao apagar tudo//
let divBotaoApagar = document.createElement('div');
botaoApagarTudo.appendChild(divBotaoApagar);
divBotaoApagar.id = 'texto-botao-apagar';
divBotaoApagar.innerHTML = 'Apagar tudo';

//criando uma div para guardar texto do botao apagar tudo//
let divBotaoApagarFin = document.createElement('div');
botaoApagarFin.appendChild(divBotaoApagarFin);
divBotaoApagarFin.id = 'texto-botao-apagar-finalizados';
divBotaoApagarFin.innerHTML = 'Apagar finalizados';

//criando uma div para guardar texto do botao salvar//
let divBotaoSalvar = document.createElement('div');
botaoSalvar.appendChild(divBotaoSalvar);
divBotaoSalvar.id = 'texto-botao-salvar';
divBotaoSalvar.innerHTML = 'Salvar tarefas';

//REQUISITO 5 e 6//
//função que cria event listener no botao, adiciona value na lista e limpa input//

function criaEventoBotao() {
  botaoCriarTarefa.addEventListener('click', function() {
    let novoLi = document.createElement('li');
    listaTarefas.appendChild(novoLi);
    novoLi.className = 'item-lista';
    novoLi.innerHTML = elementoInput.value;
    elementoInput.value = '';
  });
};

criaEventoBotao();

//REQUISITO 7 e 8//

function mudaCorItem() {
    let listaTarefas = document.getElementById('lista-tarefas');
    listaTarefas.addEventListener('click', function(event) {
        for (index = 0; index < listaLis.length; index += 1){
            listaLis[index].style.backgroundColor = '';
        }
        event.target.style.backgroundColor = 'rgb(128, 128, 128)';
    });
};

mudaCorItem();

//REQUISITO 9//

//função para riscar elemento com double-click e des-riscar com double-click//

function riscaItem() {
  let listaTarefas = document.getElementById('lista-tarefas');
  listaTarefas.addEventListener('dblclick', function(event) {
    if (event.target.className === 'item-lista completed'){
      event.target.className = 'item-lista';
    }else{
      event.target.className = 'item-lista completed'
    };
  });
};

riscaItem();

//REQUISITO 10//
//função do botão que ao ser clicado limpa a lista//

function apagaTudo() {
  let botaoApagador = document.getElementById('apaga-tudo');
    botaoApagador.addEventListener('click', function() {
      while (listaTarefas.firstChild) {
        listaTarefas.removeChild(listaTarefas.firstChild);
        };
    });
};

apagaTudo();

//REQUISITO 11//
//função do botão que remove itens finalizados da lista//

function removeFinalizados() {
  let botaoApagaFin = document.getElementById('remover-finalizados');
  botaoApagaFin.addEventListener('click', function() {
    let filhosListaTarefas = listaTarefas.children;
    for (index3 = 0; index3 < filhosListaTarefas.length; index3 += 1){
      if (filhosListaTarefas[index3].className === 'item-lista completed'){
        filhosListaTarefas[index3].remove();
        index3 -= 1;
      }
    };
  });
};
                     
removeFinalizados();

//REQUISITO 12//

//1-transformar a listaTarefas que é um objeto em uma string e armazenar no local storage//

function salvarLista () {
  localStorage.setItem('listaDeTarefas', listaTarefas.innerHTML);
}

function adicionaEventoSalvar () {
    let botaoSalvar = document.getElementById('salvar-tarefas');
    botaoSalvar.addEventListener('click', salvarLista);
}

adicionaEventoSalvar();

window.onload = function () {
    let storageListaString = localStorage.getItem('listaDeTarefas') //recupera lista como string//
    listaTarefas.innerHTML = storageListaString;
}
