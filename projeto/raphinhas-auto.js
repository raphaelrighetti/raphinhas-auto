(function(window, document, DOM) {
    var application = function app() {
        return {
            init: function init() {
                this.initEvents();
                this.getCarsFromServer();
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
                application().fillTable();
                application().addCarToServer();
                application().addRemoveButton();
            },
            getCarsFromServer: function getCarsFromServer() {
                var ajax = new XMLHttpRequest();
                ajax.open('GET', 'http://localhost:3000/car');
                ajax.send();
                ajax.addEventListener('readystatechange', application().addCarsFromServer, false);
            },
            addCarsFromServer: function addCarsFromServer() {
                if(this.readyState === 4 && this.status === 200) {
                    var cars = JSON.parse(this.responseText);
                    var $tbody = new DOM('[data-js="tbody"]');
                    if(cars[0].image === undefined)
                        return;
                    cars.forEach(function(item) {
                        var fragment = document.createDocumentFragment();
                        var newTr = document.createElement('tr');
                        var imageTd = document.createElement('td');
                        var brandModelTd = document.createElement('td');
                        var yearTd = document.createElement('td');
                        var plateTd = document.createElement('td');
                        var colorTd = document.createElement('td');
                        var image = document.createElement('img');
                        image.src = item.image;
                        
                        imageTd.appendChild(image);
                        brandModelTd.textContent = item.brandModel;
                        yearTd.textContent = item.year;
                        plateTd.textContent = item.plate;
                        colorTd.textContent = item.color;
                        arrTd = [imageTd, brandModelTd, yearTd, plateTd, colorTd]
                        arrTd.forEach(function(item) {
                            newTr.appendChild(item);
                        })

                        fragment.appendChild(newTr);
                        $tbody.get(0).appendChild(fragment);
                    });
                    application().addRemoveButton();
                }
            },
            removeCarFromServer: function removeCarFromServer() {
                var ajax = new XMLHttpRequest();
                ajax.open('DELETE', 'http://localhost:3000/car');
                ajax.send();

                ajax.addEventListener('readystatechange', function(e) {
                    if(ajax.readyState === 4 && ajax.status === 200)
                        console.log(JSON.parse(ajax.responseText).message);
                });
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
            addCarToServer: function addCarToServer() {
                var $image = new DOM('[data-js="imagem"]');
                var $modelo = new DOM('[data-js="marca-modelo"]');
                var $ano = new DOM('[data-js="ano"]');
                var $placa = new DOM('[data-js="placa"]');
                var $cor = new DOM('[data-js="cor"]');
                var ajaxPost = new XMLHttpRequest();
                ajaxPost.open('POST', 'http://localhost:3000/car');
                ajaxPost.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                ajaxPost.send('image=' + $image.get(0).value +
                '&brandModel=' + $modelo.get(0).value +
                '&year=' + $ano.get(0).value +
                '&plate=' + $placa.get(0).value +
                '&color=' + $cor.get(0).value);

                ajaxPost.addEventListener('readystatechange', function() {
                    if(this.readyState === 4 && this.status === 200)
                        console.log(JSON.parse(this.responseText).message);
                }, false)
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
                var $tbodyButton = new DOM('[data-js="tbody-button"]');
                var lastChild = $tbody.get(0).lastElementChild;
                var parentNode = $tbodyButton.get(0).parentNode;
                var parentNodeLastChild = parentNode.lastElementChild;
                $tbody.get(0).removeChild(lastChild);
                application().removeCarFromServer();
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