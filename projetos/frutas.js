let frutas = [];

function iniciarFrutas() {
    const container = document.getElementById('frutas-container');
    container.innerHTML = `
        <h2>Manipulando Frutas</h2>
        <div class="input-group">
            <input type="text" id="frutaInput" placeholder="Digite uma fruta">
            <button onclick="adicionarFruta()">Adicionar</button>
        </div>
        
        <h3>Frutas Atuais:</h3>
        <p id="listaFrutas">[]</p>
        
        <div class="botoes-metodos">
            <button onclick="metodo('push')">Push (Adicionar ao final)</button>
            <button onclick="metodo('pop')">Pop (Remover do final)</button>
            <button onclick="metodo('shift')">Shift (Remover do início)</button>
            <button onclick="metodo('unshift')">Unshift (Adicionar ao início)</button>
            <button onclick="verificarBanana()">Includes('banana')</button>
            <button onclick="mostrarIndex('uva')">IndexOf('uva')</button>
            <button onclick="mostrarJoin()">Join(', ')</button>
            <button onclick="mostrarSlice()">Slice(1, 3)</button>
            <button onclick="fazerSplice()">Splice(1, 1)</button>
            <button onclick="mapMaiusculas()">Map (MAIÚSCULAS)</button>
            <button onclick="filtrarGrandes()">Filter (nome > 4 letras)</button>
        </div>
        
        <h3>Saída:</h3>
        <pre id="saida"></pre>
        
        <button onclick="voltarMenu()" class="back-button">Voltar</button>
    `;

    // Incicializa com a lista vazia
    atualizarLista();
}

window.adicionarFruta = function() {
    const input = document.getElementById('frutaInput');
    const valor = input.value.trim();

    if (valor) {
        frutas.push(valor);
        input.value = "";
        atualizarLista();
    }
};

window.atualizarLista = function() {
    document.getElementById('listaFrutas').textContent = JSON.stringify(frutas);
};

window.metodo = function(acao) {
    if (acao === 'push') {
        const fruta = prompt("Digite uma fruta para adicionar no final:");
        if (fruta) frutas.push(fruta);
    } else if (acao === 'pop') {
        frutas.pop();
    } else if (acao === 'shift') {
        frutas.shift();
    } else if (acao === 'unshift') {
        const fruta = prompt("Digite uma fruta para adicionar no início:");
        if (fruta) frutas.unshift(fruta);
    }
    atualizarLista();
};

window.verificarBanana = function() {
    const resultado = frutas.includes('banana')
        ? "🍌 Banana está no array!"
        : "🚫 Banana NÃO está no array.";
    document.getElementById('saida').textContent = resultado;
};

window.mostrarIndex = function(fruta) {
    const index = frutas.indexOf(fruta);
    const resultado = index !== -1
        ? `A fruta '${fruta}' está na posição ${index}.`
        : `'${fruta}' não foi encontrada.`;
    document.getElementById('saida').textContent = resultado;
};

window.mostrarJoin = function() {
    const resultado = "join(', '): " + frutas.join(', ');
    document.getElementById('saida').textContent = resultado;
};

window.mostrarSlice = function() {
    const fatiado = frutas.slice(1, 3);
    document.getElementById('saida').textContent = "slice(1, 3): " + JSON.stringify(fatiado);
};

window.fazerSplice = function() {
    frutas.splice(1, 1);
    atualizarLista();
    document.getElementById('saida').textContent = "splice(1, 1) aplicado.";
};

window.mapMaiusculas = function() {
    const maiusculas = frutas.map(f => f.toUpperCase());
    document.getElementById('saida').textContent = "map (toUpperCase): " + JSON.stringify(maiusculas);
};

window.filtrarGrandes = function() {
    const grandes = frutas.filter(f => f.length > 4);
    document.getElementById('saida').textContent = "filter (length > 4): " + JSON.stringify(grandes);
};

// Função para limpar ao sair
window.voltarMenu = function() {
    frutas = []; 
    document.getElementById('main-menu').style.display = 'block';
    document.getElementById('project-container').innerHTML = '';
};