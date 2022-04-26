$(document).ready(function() {

    var select = $('select[multiple]');
    var options = select.find('option');

    var div = $('<div />').addClass('selectMultiple');
    var active = $('<div />');
    var list = $('<ul />');
    var placeholder = select.data('placeholder');

    var span = $('<span />').text(placeholder).appendTo(active);

    options.each(function() {
        var text = $(this).text();
        if($(this).is(':selected')) {
            active.append($('<a />').html('<em>' + text + '</em><i></i>'));
            span.addClass('hide');
        } else {
            list.append($('<li />').html(text));
        }
    });

    active.append($('<div />').addClass('arrow'));
    div.append(active).append(list);

    select.wrap(div);

    $(document).on('click', '.selectMultiple ul li', function(e) {
        var select = $(this).parent().parent();
        var li = $(this);
        if(!select.hasClass('clicked')) {
            select.addClass('clicked');
            li.prev().addClass('beforeRemove');
            li.next().addClass('afterRemove');
            li.addClass('remove');
            var a = $('<a />').addClass('notShown').html('<em>' + li.text() + '</em><i></i>').hide().appendTo(select.children('div'));
            a.slideDown(400, function() {
                setTimeout(function() {
                    a.addClass('shown');
                    select.children('div').children('span').addClass('hide');
                    select.find('option:contains(' + li.text() + ')').prop('selected', true);
                }, 500);
            });
            setTimeout(function() {
                if(li.prev().is(':last-child')) {
                    li.prev().removeClass('beforeRemove');
                }
                if(li.next().is(':first-child')) {
                    li.next().removeClass('afterRemove');
                }
                setTimeout(function() {
                    li.prev().removeClass('beforeRemove');
                    li.next().removeClass('afterRemove');
                }, 200);

                li.slideUp(400, function() {
                    li.remove();
                    select.removeClass('clicked');
                });
            }, 600);
        }
    });

    $(document).on('click', '.selectMultiple > div a', function(e) {
        var select = $(this).parent().parent();
        var self = $(this);
        self.removeClass().addClass('remove');
        select.addClass('open');
        setTimeout(function() {
            self.addClass('disappear');
            setTimeout(function() {
                self.animate({
                    width: 0,
                    height: 0,
                    padding: 0,
                    margin: 0
                }, 300, function() {
                    var li = $('<li />').text(self.children('em').text()).addClass('notShown').appendTo(select.find('ul'));
                    li.slideDown(400, function() {
                        li.addClass('show');
                        setTimeout(function() {
                            select.find('option:contains(' + self.children('em').text() + ')').prop('selected', false);
                            if(!select.find('option:selected').length) {
                                select.children('div').children('span').removeClass('hide');
                            }
                            li.removeClass();
                        }, 400);
                    });
                    self.remove();
                })
            }, 300);
        }, 400);
    });

    $(document).on('click', '.selectMultiple > div .arrow, .selectMultiple > div span', function(e) {
        $(this).parent().parent().toggleClass('open');
    });

});
/*________________________________________________________________________________________________________________________________________________________________*/
/*JS DA ATIVIDADE EM SI*/
//VARIAVEL GLOBAL
var global = []
var index = 0;
var indexEmpty = 0;

//VARIAVEL DO PARA PUXAR O BUTTON DO HTML
var btnAdicionar = document.querySelector('#button-salvar');

//VARIAVEL DO INPUT
var inputNome = document.querySelector('#nome');

//VARIAVEL DO SELECT 
var select = document.getElementById('select-dias');

//FUNÇÃO MONTAR TABELA
function pegandoInfo(){
    if(select.value == ""){
        alert("Selecione um dia, por favor!")
        return;
    }
    if(checarVaziotd(select.value) && index != 0){
        global[indexEmpty].tdContent[select.value] = ''+inputNome.value+'<div class="edit"><span class="material-icons" onclick="Editar()">edit</span></div><div class="delete"><span class="material-icons">delete</span></div>';
    }
    else{
        global[index] = {
            td: [],
            tdContent: [],
            index: index
        };
        for(let i = 0; i < 7; i++){
            if(i == select.value){ // O i VAI PASSAR POR TODOS OS SELECTS
                global[index].td[i] = '<td>';
                global[index].tdContent[i] = ''+inputNome.value+'<div class="edit"><span class="material-icons" onclick="Editar()">edit</span></div><div class="delete" onclick="Excluir()"><span class="material-icons">delete</span></div>';
            }
            else{
                global[index].td[i] = '<td>';
                global[index].tdContent[i] = '';
            }
        };
        index++;
    }
}

function salvar(){
    this.pegandoInfo();
    this.CriandoHtml();
}

function colocarPagina(Info, index){
    if (index === 0) {
        document.querySelector("tbody").insertAdjacentHTML("afterbegin", Info);
    } else {
        document.querySelector("[data-counteud-index='" + (index - 1) + "']").insertAdjacentHTML("afterend", Info);
    }
}

function CriandoHtml(){
    let element = document.querySelector("tbody");
    let child = element.lastElementChild;
    while (child) {
        element.removeChild(child);
        child = element.lastElementChild;
    }
    global.forEach((value) => {
        let html = '<tr class="tr" data-counteud-index="' + value.index + '">';
        value.td.forEach((tdValue, index) => {
            html += tdValue + value.tdContent[index] + "</td>";
        })
        html += '</tr>';
        this.colocarPagina(html, value.index);
    });

}

function checarVaziotd(dia){
    global.every((value) => {
        if (value.tdContent[dia] == '') {
            indexEmpty = value.index;
            return value.index;
        }

        indexEmpty = false;
        return true;
    })

    return (indexEmpty !== false ? true : false);
}

// function Editar(){

// }

// function Excluir(){

// }

