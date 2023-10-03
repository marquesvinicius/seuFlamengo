document.addEventListener('DOMContentLoaded', function () {
    const jogadoresCards = document.querySelectorAll('.jogadores-cards-item');
    let origem = null;

    // Função auxiliar para adicionar os event listeners aos elementos
    function addEventListeners(element) {
        element.draggable = true;
    
        element.addEventListener('dragstart', (event) => {
            // Armazena o id do elemento arrastado no dataTransfer
            event.dataTransfer.setData('text/plain', event.target.id);
        });
    
        element.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
    
        element.addEventListener('drop', (e) => {
            e.preventDefault();
    
            // Recupera o id do elemento arrastado do dataTransfer
            const idOrigem = event.dataTransfer.getData('text/plain');
            const origem = document.getElementById(idOrigem);
    
            // Usa o currentTarget para identificar o elemento de destino
            const destino = e.currentTarget;
    
            if (origem && origem !== destino) {
                // Clona os elementos origem e destino
                const cloneOrigem = origem.cloneNode(true); // passa true como parâmetro 
                const cloneDestino = destino.cloneNode(true); // passa true como parâmetro
    
                // Substitui os elementos origem e destino pelos clones
                origem.parentNode.replaceChild(cloneDestino, origem);
                destino.parentNode.replaceChild(cloneOrigem, destino);
    
                // Adiciona os event listeners aos clones
                addEventListeners(cloneOrigem);
                addEventListeners(cloneDestino);
            }
        });
    }

    jogadoresCards.forEach((jogadorCard) => {
        // Adiciona os event listeners aos elementos iniciais
        addEventListeners(jogadorCard);
    });
    
});
