// Variável global para o projeto de frutas
let frutas = [];

// navegação
function carregarCalculadora() {
    document.getElementById('main-menu').style.display = 'none';
    const container = document.getElementById('project-container');
    container.innerHTML = `
        <div class="project-view">
            <div id="calculadora-container"></div>
        </div>
    `;
    iniciarCalculadora();
}

function carregarFormulario() {
    document.getElementById('main-menu').style.display = 'none';
    const container = document.getElementById('project-container');
    container.innerHTML = `
        <div class="project-view">
            <div id="formulario-container"></div>
        </div>
    `;
    iniciarFormulario();
}

function carregarFrutas() {
    document.getElementById('main-menu').style.display = 'none';
    const container = document.getElementById('project-container');
    container.innerHTML = `
        <div class="project-view">
            <div id="frutas-container" class="frutas-container"></div>
        </div>
    `;
    iniciarFrutas();
}

function voltarMenu() {
    document.getElementById('main-menu').style.display = 'block';
    document.getElementById('project-container').innerHTML = '';
    // Reseta a lista de frutas ao sair
    frutas = [];
}

// Calculadora de Médias
function iniciarCalculadora() {
    const container = document.getElementById('calculadora-container');
    container.innerHTML = `
        <h2>Calculadora de Média Escolar</h2>
        
        <div class="calculadora-box">
            <div class="input-group">
                <label for="qtd-materias">Quantidade de matérias (máx. 10):</label>
                <div class="input-with-button">
                    <input type="number" id="qtd-materias" min="1" max="10" placeholder="Ex: 5">
                    <button class="btn-confirmar">Confirmar</button>
                </div>
            </div>
            
            <div id="notas-container" class="notas-grid"></div>
            
            <div class="botoes-acao">
                <button class="btn-calcular">Calcular Média</button>
                <button class="btn-limpar">Limpar Tudo</button>
            </div>
            
            <div id="resultado-container" class="resultado-box">
                <div id="resultado"></div>
            </div>
        </div>
        
        <button class="back-button">Voltar</button>
    `;

    document.querySelector('.btn-confirmar').addEventListener('click', criarCamposNotas);
    document.querySelector('.btn-calcular').addEventListener('click', calcularMedia);
    document.querySelector('.btn-limpar').addEventListener('click', limparCalculadora);
    document.querySelector('.back-button').addEventListener('click', voltarMenu);

    function criarCamposNotas() {
        const qtd = parseInt(document.getElementById('qtd-materias').value);
        const containerNotas = document.getElementById('notas-container');
        containerNotas.innerHTML = '';
        
        if (isNaN(qtd)) {
            mostrarAlerta('Por favor, digite um número válido');
            return;
        }
        
        if (qtd > 10 || qtd < 1) {
            mostrarAlerta('A quantidade deve ser entre 1 e 10');
            return;
        }

        for (let i = 1; i <= qtd; i++) {
            containerNotas.innerHTML += `
                <div class="nota-item">
                    <label for="nota-${i}">Matéria ${i}:</label>
                    <input type="number" id="nota-${i}" min="0" max="10" step="0.1" placeholder="0.0 a 10.0">
                </div>
            `;
        }
    }

    function calcularMedia() {
        const qtd = parseInt(document.getElementById('qtd-materias').value);
        if (isNaN(qtd) || qtd < 1) {
            mostrarAlerta('Selecione primeiro a quantidade de matérias');
            return;
        }

        let soma = 0;
        let todasValidas = true;
        
        for (let i = 1; i <= qtd; i++) {
            const notaInput = document.getElementById(`nota-${i}`);
            const nota = parseFloat(notaInput.value);
            
            if (isNaN(nota)) {
                notaInput.style.borderColor = 'red';
                todasValidas = false;
            } else if (nota < 0 || nota > 10) {
                notaInput.style.borderColor = 'red';
                todasValidas = false;
            } else {
                notaInput.style.borderColor = '';
                soma += nota;
            }
        }

        if (!todasValidas) {
            mostrarAlerta('Por favor, preencha todas as notas com valores entre 0 e 10');
            return;
        }

        const media = soma / qtd;
        const resultado = document.getElementById('resultado');
        resultado.innerHTML = `
            <div class="media-valor">${media.toFixed(2)}</div>
            <div class="media-status">${media >= 6 ? '✅ APROVADO' : '❌ REPROVADO'}</div>
            <div class="media-mensagem">${media >= 6 ? 'Parabéns! Continue assim!' : 'Estude mais para a próxima!'}</div>
        `;
        resultado.parentElement.className = media >= 6 ? 'resultado-box aprovado' : 'resultado-box reprovado';
    }

    function limparCalculadora() {
        if (confirm('Tem certeza que deseja limpar todos os campos?')) {
            document.getElementById('qtd-materias').value = '';
            document.getElementById('notas-container').innerHTML = '';
            document.getElementById('resultado').innerHTML = '';
            document.getElementById('resultado-container').className = 'resultado-box';
        }
    }

    function mostrarAlerta(mensagem) {
        const alerta = document.createElement('div');
        alerta.className = 'custom-alert';
        alerta.textContent = mensagem;
        document.querySelector('.calculadora-box').prepend(alerta);
        
        setTimeout(() => {
            alerta.style.opacity = '0';
            setTimeout(() => alerta.remove(), 300);
        }, 3000);
    }
}

// Formulário
function iniciarFormulario() {
    const container = document.getElementById('formulario-container');
    container.innerHTML = `
        <h2>Formulário</h2>
        <form id="meuFormulario">
            <div class="form-group">
                <label for="nome">Nome Completo:</label>
                <input type="text" id="nome" required>
            </div>
            
            <div class="form-group">
                <label for="email">E-mail:</label>
                <input type="email" id="email" required>
            </div>
            
            <div class="form-group">
                <label for="telefone">Telefone:</label>
                <input type="tel" id="telefone" required>
            </div>
            
            <div class="form-group">
                <label for="idade">Idade:</label>
                <input type="number" id="idade" min="0" required>
            </div>
            
            <div class="form-group">
                <label for="endereco">Endereço:</label>
                <input type="text" id="endereco" required>
            </div>
            
            <div class="form-group">
                <label for="cidade">Cidade:</label>
                <input type="text" id="cidade" required>
            </div>
            
            <div class="form-group">
                <label for="estado">Estado:</label>
                <select id="estado" required>
                    <option value="">Selecione...</option>
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                </select>
            </div>
            
            <div class="form-actions">
                <button type="button" class="btn-salvar">
                    <span class="icon">💾</span> Salvar em TXT
                </button>
                <button type="reset" class="btn-limpar-form">Limpar Formulário</button>
            </div>
        </form>
        <button class="back-button">Voltar</button>
    `;

    document.querySelector('.btn-salvar').addEventListener('click', salvarFormulario);
    document.querySelector('.back-button').addEventListener('click', voltarMenu);

    function salvarFormulario() {
        // Coleta de dados
        const dados = {
            nome: document.getElementById('nome').value.trim(),
            email: document.getElementById('email').value.trim(),
            telefone: document.getElementById('telefone').value.trim(),
            idade: document.getElementById('idade').value.trim(),
            endereco: document.getElementById('endereco').value.trim(),
            cidade: document.getElementById('cidade').value.trim(),
            estado: document.getElementById('estado').value
        };

        // Validação
        for (const [campo, valor] of Object.entries(dados)) {
            if (!valor) {
                alert(`Por favor, preencha o campo ${campo}`);
                return;
            }
        }

        // Formatação
        let conteudo = `DADOS DO FORMULÁRIO\n`;
        conteudo += `========================\n\n`;
        conteudo += `Nome: ${dados.nome}\n`;
        conteudo += `E-mail: ${dados.email}\n`;
        conteudo += `Telefone: ${dados.telefone}\n`;
        conteudo += `Idade: ${dados.idade} anos\n`;
        conteudo += `Endereço: ${dados.endereco}\n`;
        conteudo += `Cidade: ${dados.cidade}\n`;
        conteudo += `Estado: ${dados.estado}\n`;
        conteudo += `\nData: ${new Date().toLocaleString()}`;

        // Cria e baixa o arquivo
        const blob = new Blob([conteudo], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `formulario_${dados.nome.replace(/\s+/g, '_')}.txt`;
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Libera memória!!
        setTimeout(() => URL.revokeObjectURL(url), 100);
    }
}

// App de Frutas
function iniciarFrutas() {
    const container = document.getElementById('frutas-container');
    container.innerHTML = `
        <h2>Manipulando Frutas</h2>
        <div class="input-group">
            <input type="text" id="frutaInput" placeholder="Digite uma fruta">
            <button id="btn-adicionar">Adicionar</button>
        </div>
        
        <h3>Frutas Atuais:</h3>
        <p id="listaFrutas">[]</p>
        
        <div class="botoes-metodos">
            <button data-acao="push">Push (Adicionar ao final)</button>
            <button data-acao="pop">Pop (Remover do final)</button>
            <button data-acao="shift">Shift (Remover do início)</button>
            <button data-acao="unshift">Unshift (Adicionar ao início)</button>
            <button data-acao="includes">Includes('banana')</button>
            <button data-acao="indexOf">IndexOf('uva')</button>
            <button data-acao="join">Join(', ')</button>
            <button data-acao="slice">Slice(1, 3)</button>
            <button data-acao="splice">Splice(1, 1)</button>
            <button data-acao="map">Map (MAIÚSCULAS)</button>
            <button data-acao="filter">Filter (nome > 4 letras)</button>
        </div>
        
        <h3>Saída:</h3>
        <pre id="saida"></pre>
        
        <button class="back-button">Voltar</button>
    `;

    atualizarLista();

    document.getElementById('btn-adicionar').addEventListener('click', adicionarFruta);
    document.querySelector('.back-button').addEventListener('click', voltarMenu);

    const botoes = document.querySelectorAll('.botoes-metodos button');
    botoes.forEach(botao => {
        botao.addEventListener('click', function() {
            const acao = this.getAttribute('data-acao');
            manipularFrutas(acao);
        });
    });

    function adicionarFruta() {
        const input = document.getElementById('frutaInput');
        const valor = input.value.trim();

        if (valor) {
            frutas.push(valor);
            input.value = "";
            atualizarLista();
        }
    }

    function atualizarLista() {
        document.getElementById('listaFrutas').textContent = JSON.stringify(frutas);
    }

    function manipularFrutas(acao) {
        let resultado;
        switch(acao) {
            case 'push':
                const frutaPush = prompt("Digite uma fruta para adicionar no final:");
                if (frutaPush) frutas.push(frutaPush);
                atualizarLista();
                break;
            case 'pop':
                frutas.pop();
                atualizarLista();
                resultado = "Pop: removido o último elemento.";
                break;
            case 'shift':
                frutas.shift();
                atualizarLista();
                resultado = "Shift: removido o primeiro elemento.";
                break;
            case 'unshift':
                const frutaUnshift = prompt("Digite uma fruta para adicionar no início:");
                if (frutaUnshift) frutas.unshift(frutaUnshift);
                atualizarLista();
                break;
            case 'includes':
                resultado = frutas.includes('banana')
                    ? "🍌 Banana está no array!"
                    : "🚫 Banana NÃO está no array.";
                break;
            case 'indexOf':
                const index = frutas.indexOf('uva');
                resultado = index !== -1
                    ? `A fruta 'uva' está na posição ${index}.`
                    : `'uva' não foi encontrada.`;
                break;
            case 'join':
                resultado = "join(', '): " + frutas.join(', ');
                break;
            case 'slice':
                const fatiado = frutas.slice(1, 3);
                resultado = "slice(1, 3): " + JSON.stringify(fatiado);
                break;
            case 'splice':
                frutas.splice(1, 1);
                atualizarLista();
                resultado = "splice(1, 1) aplicado. Removido o elemento no índice 1.";
                break;
            case 'map':
                const maiusculas = frutas.map(f => f.toUpperCase());
                resultado = "map (toUpperCase): " + JSON.stringify(maiusculas);
                break;
            case 'filter':
                const grandes = frutas.filter(f => f.length > 4);
                resultado = "filter (length > 4): " + JSON.stringify(grandes);
                break;
            default:
                resultado = "Ação desconhecida";
        }

        if (resultado) {
            document.getElementById('saida').textContent = resultado;
        }
    }
}
