document.getElementById('formularioErro').addEventListener('submit', function(evento) {
    evento.preventDefault();

    const nomeUsuario = document.getElementById('nomeUsuario').value;
    const descricaoErro = document.getElementById('descricaoErro').value;
    const dataLancamento = document.getElementById('dataLancamento').value;

    const erro = {
        nomeUsuario,
        descricaoErro,
        dataLancamento,
        solucao: ''
    };

    salvarErro(erro);
    exibirErros();
    this.reset();
});

function salvarErro(erro) {
    const erros = JSON.parse(localStorage.getItem('erros')) || [];
    erros.push(erro);
    localStorage.setItem('erros', JSON.stringify(erros));
}

function exibirErros() {
    const erros = JSON.parse(localStorage.getItem('erros')) || [];
    const listaErros = document.getElementById('listaErros');
    listaErros.innerHTML = '';

    erros.forEach((erro, indice) => {
        const itemErro = document.createElement('div');
        itemErro.classList.add('item-erro');
        itemErro.innerHTML = `
            <strong>${erro.nomeUsuario}</strong> - ${erro.dataLancamento}<br>
            ${erro.descricaoErro}<br>
            <div class="solucao">${erro.solucao}</div>
            <input type="text" placeholder="Digite a solução" id="inputSolucao${indice}">
            <button onclick="salvarSolucao(${indice})">Salvar Solução</button>
            <button onclick="excluirErro(${indice})">Excluir Erro</button>
        `;
        listaErros.appendChild(itemErro);
    });
}

function salvarSolucao(indice) {
    const inputSolucao = document.getElementById(`inputSolucao${indice}`);
    const solucao = inputSolucao.value;

    const erros = JSON.parse(localStorage.getItem('erros'));
    erros[indice].solucao = solucao;
    localStorage.setItem('erros', JSON.stringify(erros));

    exibirErros();
}

function excluirErro(indice) {
    const erros = JSON.parse(localStorage.getItem('erros'));
    erros.splice(indice, 1);
    localStorage.setItem('erros', JSON.stringify(erros));

    exibirErros();
}

// Carregar erros ao iniciar
document.addEventListener('DOMContentLoaded', exibirErros);
