function iniciarCalculadora() {
    const container = document.getElementById('calculadora-container');
    container.innerHTML = `
        <h2>Calculadora de Média Escolar</h2>
        
        <div class="calculadora-box">
            <div class="input-group">
                <label for="qtd-materias">Quantidade de matérias (máx. 10):</label>
                <div class="input-with-button">
                    <input type="number" id="qtd-materias" min="1" max="10" placeholder="Ex: 5">
                    <button onclick="criarCamposNotas()" class="btn-confirmar">Confirmar</button>
                </div>
            </div>
            
            <div id="notas-container" class="notas-grid"></div>
            
            <div class="botoes-acao">
                <button onclick="calcularMedia()" class="btn-calcular">Calcular Média</button>
                <button onclick="limparCalculadora()" class="btn-limpar">Limpar Tudo</button>
            </div>
            
            <div id="resultado-container" class="resultado-box">
                <div id="resultado"></div>
            </div>
        </div>
        
        <button onclick="voltarMenu()" class="back-button">Voltar</button>
    `;

    window.criarCamposNotas = function() {
        const qtd = parseInt(document.getElementById('qtd-materias').value);
        const container = document.getElementById('notas-container');
        container.innerHTML = '';
        
        if (isNaN(qtd)) {
            mostrarAlerta('Por favor, digite um número válido');
            return;
        }
        
        if (qtd > 10 || qtd < 1) {
            mostrarAlerta('A quantidade deve ser entre 1 e 10');
            return;
        }

        for (let i = 1; i <= qtd; i++) {
            container.innerHTML += `
                <div class="nota-item">
                    <label for="nota-${i}">Matéria ${i}:</label>
                    <input type="number" id="nota-${i}" min="0" max="10" step="0.1" placeholder="0.0 a 10.0">
                </div>
            `;
        }
    };

    window.calcularMedia = function() {
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
    };

    window.limparCalculadora = function() {
        if (confirm('Tem certeza que deseja limpar todos os campos?')) {
            document.getElementById('qtd-materias').value = '';
            document.getElementById('notas-container').innerHTML = '';
            document.getElementById('resultado').innerHTML = '';
            document.getElementById('resultado-container').className = 'resultado-box';
        }
    };

    window.mostrarAlerta = function(mensagem) {
        const alerta = document.createElement('div');
        alerta.className = 'custom-alert';
        alerta.textContent = mensagem;
        document.querySelector('.calculadora-box').prepend(alerta);
        
        setTimeout(() => {
            alerta.style.opacity = '0';
            setTimeout(() => alerta.remove(), 300);
        }, 3000);
    };
}