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
            <div id="frutas-container"></div>
        </div>
    `;
    iniciarFrutas();
}

function voltarMenu() {
    document.getElementById('main-menu').style.display = 'block';
    document.getElementById('project-container').innerHTML = '';
}