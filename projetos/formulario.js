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
                    <option value="AL">São Paulo</option>
                    <option value="AL">Paraná</option>
                    <option value="AL">Rio de Janeiro</option>
                    <option value="AL">Minas Gerais</option>
                    <option value="AL">Maranhão</option>
                    <option value="AL">Pará</option>
                    <option value="AL">Rio Grande do Sul</option>
                    <option value="AL">Rio Grande do Norte</option>
                    <option value="AL">Bahia</option>
                    <!-- Adicione todos os estados -->
                </select>
            </div>
            
            <div class="form-actions">
                <button type="button" onclick="salvarFormulario()" class="btn-salvar">
                    <span class="icon">💾</span> Salvar em TXT
                </button>
                <button type="reset" class="btn-limpar">Limpar Formulário</button>
            </div>
        </form>
        <button onclick="voltarMenu()" class="back-button">Voltar</button>
    `;
}

window.salvarFormulario = function() {
    // Coleta de dados (todos os campos)
    const dados = {
        nome: document.getElementById('nome').value.trim(),
        email: document.getElementById('email').value.trim(),
        telefone: document.getElementById('telefone').value.trim(),
        idade: document.getElementById('idade').value.trim(),
        endereco: document.getElementById('endereco').value.trim(),
        cidade: document.getElementById('cidade').value.trim(),
        estado: document.getElementById('estado').value
    };

    // Validação dos Campos!!!!
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

    // Cria e baixa o arquivo !
    const blob = new Blob([conteudo], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `formulario_${dados.nome.replace(/\s+/g, '_')}.txt`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Libera memória!!!!!!!
    setTimeout(() => URL.revokeObjectURL(url), 100);
};