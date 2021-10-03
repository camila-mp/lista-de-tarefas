// armazenando elementos uteis em variaveis
const listaTarefas = document.getElementById('lista-tarefas');
const botaoCriarTarefa = document.getElementById('criar-tarefa');
const botaoApagarTudo = document.getElementById('apaga-tudo');
const botaoApagarFin = document.getElementById('remover-finalizados');
const botaoRemoverSel = document.getElementById('remover-selecionado');
const botaoSalvar = document.getElementById('salvar-tarefas');
const botaoMoverCima = document.getElementById('mover-cima');
const botaoMoverBaixo = document.getElementById('mover-baixo');
const elementoInput = document.getElementById('texto-tarefa');
const itemLista = 'item-lista';
const listaLis = document.getElementsByClassName(itemLista);
const backgroundTarefa = 'rgb(68, 240, 185)';

// criando uma div para guardar texto do botao mover pra cima//
const divBotaoMoverCima = document.createElement('div');
botaoMoverCima.appendChild(divBotaoMoverCima);
divBotaoMoverCima.id = 'texto-mover-cima';
divBotaoMoverCima.innerHTML = 'Subir tarefa';

// criando uma div para guardar texto do botao mover pra baixo//
const divBotaoMoverBaixo = document.createElement('div');
botaoMoverBaixo.appendChild(divBotaoMoverBaixo);
divBotaoMoverBaixo.id = 'texto-mover-baixo';
divBotaoMoverBaixo.innerHTML = 'Descer tarefa';

// criando uma div para guardar texto do botao adicionar//
const divBotao = document.createElement('div');
botaoCriarTarefa.appendChild(divBotao);
divBotao.id = 'texto-botao';
divBotao.innerHTML = 'Adicionar';

// criando uma div para guardar texto do botao apagar tudo//
const divBotaoApagar = document.createElement('div');
botaoApagarTudo.appendChild(divBotaoApagar);
divBotaoApagar.id = 'texto-botao-apagar';
divBotaoApagar.innerHTML = 'Apagar tudo';

// criando uma div para guardar texto do botao apagar finalizados//
const divBotaoApagarFin = document.createElement('div');
botaoApagarFin.appendChild(divBotaoApagarFin);
divBotaoApagarFin.id = 'texto-botao-apagar-finalizados';
divBotaoApagarFin.innerHTML = 'Apagar finalizados';

// criando uma div para guardar texto do botao salvar//
const divBotaoSalvar = document.createElement('div');
botaoSalvar.appendChild(divBotaoSalvar);
divBotaoSalvar.id = 'texto-botao-salvar';
divBotaoSalvar.innerHTML = 'Salvar tarefas';

// criando uma div para guardar texto do botao remover selecionado//
const divBotaoRemoverSel = document.createElement('div');
botaoRemoverSel.appendChild(divBotaoRemoverSel);
divBotaoRemoverSel.id = 'texto-botao-remover-sel';
divBotaoRemoverSel.innerHTML = 'Remover selecionado';

// função que cria event listener no botao, adiciona value na lista e limpa input//

function criaEventoBotao() {
  botaoCriarTarefa.addEventListener('click', () => {
    const novoLi = document.createElement('li');
    listaTarefas.appendChild(novoLi);
    novoLi.className = itemLista;
    novoLi.innerHTML = elementoInput.value;
    elementoInput.value = '';
  });
}

criaEventoBotao();

// altera a cor de fundo da tarefa com um click//

function mudaCorItem() {
  listaTarefas.addEventListener('click', ({ target }) => {
    for (let index = 0; index < listaLis.length; index += 1) {
      listaLis[index].style.backgroundColor = '';
    }
    target.style.backgroundColor = backgroundTarefa;
  });
}

mudaCorItem();

// função para riscar elemento com double-click e des-riscar com double-click//

function riscaItem() {
  listaTarefas.addEventListener('dblclick', (event) => {
    if (event.target.className === 'item-lista completed') {
      event.target.className = 'item-lista';
    } else {
      event.target.className = 'item-lista completed';
    }
  });
}

riscaItem();

// função do botão que ao ser clicado limpa a lista//

function apagaTudo() {
  const botaoApagador = document.getElementById('apaga-tudo');
  botaoApagador.addEventListener('click', () => {
    while (listaTarefas.firstChild) {
      listaTarefas.removeChild(listaTarefas.firstChild);
    }
  });
}

apagaTudo();

// função do botão que remove itens finalizados da lista//

function removeFinalizados() {
  const botaoApagaFin = document.getElementById('remover-finalizados');
  botaoApagaFin.addEventListener('click', () => {
    const filhosListaTarefas = listaTarefas.children;
    for (let index3 = 0; index3 < filhosListaTarefas.length; index3 += 1) {
      if (filhosListaTarefas[index3].className === 'item-lista completed') {
        filhosListaTarefas[index3].remove();
        index3 -= 1;
      }
    }
  });
}
removeFinalizados();

// transforma a listaTarefas que é um objeto em uma string e armazenar no local storage//

function salvarLista() {
  localStorage.setItem('listaDeTarefas', listaTarefas.innerHTML);
}

function adicionaEventoSalvar() {
  botaoSalvar.addEventListener('click', salvarLista);
}

adicionaEventoSalvar();

window.onload = function () {
  const storageListaString = localStorage.getItem('listaDeTarefas'); // recupera lista como string//
  listaTarefas.innerHTML = storageListaString;
};

// adiciona event listeners aos botoes de mover (para baixo ou para cima) e fazer funções especificas para cada um deles//
function moverCima() {
  const listaEstLis = document.querySelectorAll('.item-lista');
  for (let index4 = 1; index4 < listaEstLis.length; index4 += 1) {
    if (listaEstLis[index4].style.backgroundColor === backgroundTarefa) {
      listaTarefas.insertBefore(listaEstLis[index4], listaEstLis[index4].previousSibling);
    }
  }
}

function adicionaEventoMoverCima() {
  botaoMoverCima.addEventListener('click', moverCima);
}

adicionaEventoMoverCima();

function moverBaixo() {
  const listaEstLis = document.querySelectorAll('.item-lista');
  for (let index5 = 0; index5 < listaEstLis.length - 1; index5 += 1) {
    if (listaEstLis[index5].style.backgroundColor === backgroundTarefa) {
      listaTarefas.insertBefore(listaEstLis[index5], listaEstLis[index5].nextSibling.nextSibling);
    }
  }
}

function adicionaEventoMoverBaixo() {
  botaoMoverBaixo.addEventListener('click', moverBaixo);
}
adicionaEventoMoverBaixo();

// função que remove item selecionado

function adicionaEventoRemoverSel() {
  botaoRemoverSel.addEventListener('click', () => {
    for (let index6 = 0; index6 < listaLis.length; index6 += 1) {
      if (listaLis[index6].style.backgroundColor === backgroundTarefa) {
        listaLis[index6].remove();
      }
    }
  });
}

adicionaEventoRemoverSel();
