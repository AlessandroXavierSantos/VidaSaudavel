/*JS DO SELECT PERSONALIZADO*/
$(document).ready(function () {

    var select = $('select[multiple]');
    var options = select.find('option');

    var div = $('<div />').addClass('selectMultiple');
    var active = $('<div />');
    var list = $('<ul />');
    var placeholder = select.data('placeholder');

    var span = $('<span />').text(placeholder).appendTo(active);

    options.each(function () {
        var text = $(this).text();
        if ($(this).is(':selected')) {
            active.append($('<a />').html('<em>' + text + '</em><i></i>'));
            span.addClass('hide');
        } else {
            list.append($('<li />').html(text));
        }
    });

    active.append($('<div />').addClass('arrow'));
    div.append(active).append(list);

    select.wrap(div);

    $(document).on('click', '.selectMultiple ul li', function (e) {
        var select = $(this).parent().parent();
        var li = $(this);
        if (!select.hasClass('clicked')) {
            select.addClass('clicked');
            li.prev().addClass('beforeRemove');
            li.next().addClass('afterRemove');
            li.addClass('remove');
            var a = $('<a />').addClass('notShown').html('<em>' + li.text() + '</em><i></i>').hide().appendTo(select.children('div'));
            a.slideDown(400, function () {
                setTimeout(function () {
                    a.addClass('shown');
                    select.children('div').children('span').addClass('hide');
                    select.find('option:contains(' + li.text() + ')').prop('selected', true);
                }, 500);
            });
            setTimeout(function () {
                if (li.prev().is(':last-child')) {
                    li.prev().removeClass('beforeRemove');
                }
                if (li.next().is(':first-child')) {
                    li.next().removeClass('afterRemove');
                }
                setTimeout(function () {
                    li.prev().removeClass('beforeRemove');
                    li.next().removeClass('afterRemove');
                }, 200);

                li.slideUp(400, function () {
                    li.remove();
                    select.removeClass('clicked');
                });
            }, 600);
        }
    });

    $(document).on('click', '.selectMultiple > div a', function (e) {
        var select = $(this).parent().parent();
        var self = $(this);
        self.removeClass().addClass('remove');
        select.addClass('open');
        setTimeout(function () {
            self.addClass('disappear');
            setTimeout(function () {
                self.animate({
                    width: 0,
                    height: 0,
                    padding: 0,
                    margin: 0
                }, 300, function () {
                    var li = $('<li />').text(self.children('em').text()).addClass('notShown').appendTo(select.find('ul'));
                    li.slideDown(400, function () {
                        li.addClass('show');
                        setTimeout(function () {
                            select.find('option:contains(' + self.children('em').text() + ')').prop('selected', false);
                            if (!select.find('option:selected').length) {
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

    $(document).on('click', '.selectMultiple > div .arrow, .selectMultiple > div span', function (e) {
        $(this).parent().parent().toggleClass('open');
    });

});
/*________________________________________________________________________________________________________________________________________________________________*/
//ANIMAÇÃO MODAL
let mod = document.getElementById("modal");

function ModalAnimation()
{
    mod.classList.remove('no-see');
    mod.classList.add('see');
    document.querySelector('body').style = "overflow:hidden";
    window.scrollTo(0, 0);
}
function Closing()
{
    
    mod.classList.remove('see');
    mod.classList.add('no-see'); 
    document.querySelector('body').style = "overflow:visible";
}

document.addEventListener('keydown', function(event){
    if(event.key === "Escape"){
        fecharModal();
    }
})

document.querySelector("#modal").addEventListener("click", function(){
    fecharModal();
});
/*________________________________________________________________________________________________________________________________________________________________*/
/*JS DA ATIVIDADE EM SI*/
//VARIAVEL GLOBAL
var html = 0;
//VARIAVEL DO PARA PUXAR O BUTTON DO HTML
var btnAdicionar = document.querySelector('#button-adicionar');

//VARIAVEL DO INPUT
var inputManha = document.querySelector('#manha');
var inputTarde = document.querySelector('#tarde');
var inputNoite = document.querySelector('#noite');

var ArrayCampos = [
    inputManha,
    inputTarde,
    inputNoite
];

var linhas = document.querySelectorAll('.tabela-montada tr')
console.log(linhas);

//VARIAVEL DO SELECT 
var select = document.getElementById('select-dias');

// function Verificacao(){
//     if(ArrayCampos.value == ""){
//         alert("Insira valores válidos nos Inputs, por favor!")
//     }
//     else{

//     }
// }

function PegandoInfo(){ //PEGANDO INFORMAÇÃO DO select
    console.log(linhas);
    let dia = "";
    switch(select.value){
        case "segunda":
        console.log("Segunda-Feira");
        dia = document.querySelector('#segunda')
        break;

        case "terca":
        console.log("Terça-feira");
        dia = document.querySelector('#terca')
        break;
        
        case "quarta":
        console.log("Quarta-Feira")    
        dia = document.querySelector('#quarta')
        break;
        
        case "quinta":
        console.log("Quinta-Feira")
        dia = document.querySelector('#quinta')
        break;

        case "sexta":
        console.log("Sexta-Feira")
        dia = document.querySelector('#sexta')
        break;

        case "sabado":
        console.log("Sabado")
        dia = document.querySelector('#sabado')
        break;
        
        case "domingo":
        console.log("Domingo")
        dia = document.querySelector('#domingo')
        break;
    }
    MontarTabela(dia);
}
    
//FUNÇÃO MONTAR TABELA
    function MontarTabela(dia){
        if(inputManha.value == "" || inputTarde.value == "" || inputNoite.value == "" || select.value == ""){
        alert("Insira valores válidos nos Inputs ou selecione o dia, por favor!")
    }
    else{
        for(let i = 0; i < ArrayCampos.length; i++){
            let td = document.createElement('td');//td CELULA QUE TEM O VALOR
            td.textContent = ArrayCampos[i].value;//CONTEUDO DO TEXTO
            dia.appendChild(td);
        } 
        var btnDeletar = document.createElement('button');/*CRIANDO O ELEMENTO BUTTON APÓS INSERIR OS VALORES DOS
        INPUTS*/
        btnDeletar.textContent = "Deletar";
        dia.appendChild(btnDeletar);
        //classlist.add --> CRIA UMA CLASS PELO JS
        btnDeletar.classList.add('btn');
        btnDeletar.classList.add('btn-danger');
        //TEMPLATE STRING(${VARIAVEL}) PASSA O VALOR DA VARIAVEL
        btnDeletar.id = `${dia.id}`;
        /*AO CLICAR("Click") NO BUTTON DELETAR ELE EXECUTARA UMA FUNÇÃO ANONIMA(()=>)
        ONDE O ID DO BUTTON(btnDeletar.id) TEM QUE SER IGUAL AO ID DA LINHA(dia.id)*/
        btnDeletar.addEventListener("click", ()=>{
            //()=> ARROWFUNCTION --> FUNÇÃO ANONIMA, CALLBACK(FUNÇÕES PASSADAS COMO PARAMETROS)
            if(btnDeletar.id == dia.id){/*VERIFICAÇÃO PARA VER SE O id DO btnDeletar É IGUAL AO DO dia CASO FOR ELE ENTRA NA CONDIÇÃO, 
                CRIA UMA VARIAVEL PARA "ARMAZENAR" TODAS AS LINHAS E VALORES DA LINHA(td) E COLOCA IGUALA A POSIÇÃO
                DAS INFORMAÇÕES A VAZIO APAGANDO O VALOR DIGITADO ANTES*/
                let conjuntoTd = document.querySelectorAll(`#${dia.id} td`);
                console.log(conjuntoTd);
                conjuntoTd[1].textContent = '';
                conjuntoTd[2].textContent = '';
                conjuntoTd[3].textContent = '';
            }        
        });
    
        var btnEditar = document.createElement('button');
        btnEditar.textContent = "Editar";
        btnEditar.classList.add('btn');
        btnEditar.classList.add('btn-warning')
        dia.appendChild(btnEditar);//**PEGA A VARIAVEL "btnEditar" E IMPRIME DENTRO A VARIAVEL "dia" COMO UM FILHO
        btnEditar.id = `${dia.id}`;
        btnEditar.addEventListener("click", ()=>{
            if(btnEditar.id == dia.id){
                let conjuntoTd = document.querySelectorAll(`#${dia.id} td`);
                console.log(conjuntoTd);
                conjuntoTd[1].textContent = inputManha.value;
                conjuntoTd[2].textContent = inputTarde.value;
                conjuntoTd[3].textContent = inputNoite.value;
            }
        });
    }
}


