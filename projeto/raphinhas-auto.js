(function(window, document, DOM) {
    var application = function app() {
        return {
            init: function init() {
                this.initEvents()
            },
            initEvents: function initEvents() {
                var $form = new DOM('[data-js="form-cadastro"]');
                var $ano = new DOM('[data-js="ano"]');
                var $placa = new DOM('[data-js="placa"]');
                $form.on('submit', this.handleSubmit);
                $ano.on('input', this.formatYear);
                $placa.on('input', this.formatPlate);
            },
            handleSubmit: function handleSubmit(event) {
                event.preventDefault();
                if(application().isURLOk() !== true) {
                    alert('Insira uma URL válida!');
                    return;
                }
                if(application().isEveryFieldFilled() !== true) {
                    alert('Preencha todos os campos corretamente!');
                    return;
                }
                console.log(application().isEveryFieldFilled());   
                application().fillTable();
                application().addRemoveButton();
            },
            fillTable: function fillTable() {
                var fragment = document.createDocumentFragment();
                var $tbody = new DOM('[data-js="tbody"]');
                
                var newTr = document.createElement('tr');
                var imageTd = document.createElement('td');
                var modeloTd = document.createElement('td');
                var anoTd = document.createElement('td');
                var placaTd = document.createElement('td');
                var corTd = document.createElement('td');

                var $image = new DOM('[data-js="imagem"]');
                var $modelo = new DOM('[data-js="marca-modelo"]');
                var $ano = new DOM('[data-js="ano"]');
                var $placa = new DOM('[data-js="placa"]');
                var $cor = new DOM('[data-js="cor"]');

                var image = document.createElement('img');
                image.src = $image.get(0).value;
                
                imageTd.appendChild(image);
                modeloTd.textContent = $modelo.get(0).value;
                anoTd.textContent = $ano.get(0).value;
                placaTd.textContent = $placa.get(0).value;
                corTd.textContent = $cor.get(0).value;
                var arrTd = [imageTd, modeloTd, anoTd, placaTd, corTd];
                arrTd.forEach(function(item) {
                    newTr.appendChild(item);
                });

                fragment.appendChild(newTr);
                $tbody.get(0).appendChild(fragment);
            },
            addRemoveButton: function addRemoveButton() {
                var $tbody = new DOM('[data-js="tbody"]');
                var parentNode = $tbody.get(0).parentNode;
                var lastChild = parentNode.lastElementChild;
                $tbody.get(0).insertAdjacentHTML('afterend',
                '<tbody data-js="tbody-button">' +
                '<tr><td colspan="5"><button data-js="remove-button">Remover</button></td></tr>' + 
                '</tbody>');
                if(parentNode.childElementCount > 3)
                    parentNode.removeChild(lastChild);

                this.addRemoveButtonEvent();
            },
            addRemoveButtonEvent: function addRemoveButtonEvent() {
                var removeButton = new DOM('[data-js="remove-button"]');
                removeButton.on('click', this.handleClickRemoveButton);
            },
            handleClickRemoveButton: function handleClickRemoveButton(event) {
                var $tbody = new DOM('[data-js="tbody"]');
                var $tbodyButton = new DOM('[data-js="tbody-button"]')
                var lastChild = $tbody.get(0).lastElementChild;
                var parentNode = $tbodyButton.get(0).parentNode;
                var parentNodeLastChild = parentNode.lastElementChild;
                $tbody.get(0).removeChild(lastChild);
                console.log(parentNode.childElementCount);
                if(parentNode.childElementCount === 3 && $tbody.get(0).childElementCount < 1)
                    parentNode.removeChild(parentNodeLastChild)
            },
            formatYear: function formatYear() {
                this.value = application().removeNotNumber(this.value);
            },
            formatPlate: function formatPlate() {
                if(this.value.length === 4)    
                    this.value = application().addTraceToPlate(this.value);
                this.value = this.value.toUpperCase()
            },
            isURLOk: function isURLOk() {
                var $image = new DOM('[data-js="imagem"]');
                return $image.get(0).value.endsWith('.jpg')
                || $image.get(0).value.endsWith('.jpeg')
                || $image.get(0).value.endsWith('.png');
            },
            isEveryFieldFilled: function isEveryFieldFilled() {
                var $image = new DOM('[data-js="imagem"]');
                var $modelo = new DOM('[data-js="marca-modelo"]');
                var $ano = new DOM('[data-js="ano"]');
                var $placa = new DOM('[data-js="placa"]');
                var $cor = new DOM('[data-js="cor"]');

                return $image.get(0).value !== '' &&
                $modelo.get(0).value !== '' &&
                $ano.get(0).value !== '' &&
                $placa.get(0).value !== '' &&
                $cor.get(0).value !== '';
            },
            removeNotNumber: function removeNotNumber(str) {
                return str.replace(/\D+/g, '');
            },
            addTraceToPlate: function addTraceToPlate(str) {
                return str.replace(/(\w{3})(\w+)/, '$1-$2');
            }
        };
    }

    application().init();
})(window, document, window.DOM);