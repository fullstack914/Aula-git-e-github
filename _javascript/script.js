function pesquisa_cep(cep){
    //Remove o '-' do cep
    cep = cep.replace("-","");

    //usar requisição XMLHttpsRequest
    let resposta = new XMLHttpRequest();//cria o objeto que manipula a requisição Http
    let url = 'https://viacep.com.br/ws/'+cep+'/json/';
    resposta.open('GET', url);//descreve o que será buscado e qual local

    //Configurações
    resposta.onreadystatechange = () =>{ //executa a alteração do estado da rtequisição
        if(resposta.readyState == 4){
            console.log(resposta);
            if(resposta.status == 200){
                meu_callback(JSON.parse(resposta.responseText));
            }else{
                meu_callback({"erro":true});
            }
        }
    };
    resposta.send(); //Executa a requisição
}

function meu_callback(conteudo){
    if(!("erro" in conteudo)){
        document.getElementById("endereco").value = conteudo.logradouro;
        document.getElementById("bairro").value = conteudo.bairro;
        document.getElementById("cidade").value = conteudo.localidade;
        document.getElementById("estado").value = conteudo.uf;
        document.getElementById("ibge").value = conteudo.ibge;

    }else{
        alert("CEP Inválido")
        document.getElementById("endereco").value = "";
        document.getElementById("bairro").value = "";
        document.getElementById("cidade").value = "";
        document.getElementById("estado").value = "";
        document.getElementById("ibge").value = "";
    }
}

//Mascara
$(function(){
    $(".cpf_mask").mask('999.999.999-99');
    $(".tel_res_mask").mask('(99)9999-9999');
    $(".tel_cel_mask").mask('(18)99999-9999');
    $(".cep_mask").mask('99999-999');
});

function gerar_json(form){
    var nome = form.nome.value;
    var cpf = form.cpf.value;
    var telefone_res = form.telefone_res.value;
    var telefone_cel = form.telefone_cel.value;
    var cep = form.cep.value;
    var endereco = form.endereco.value;
    var numero = form.numero.value;
    var bairro = form.bairro.value;
    var cidade = form.cidade.value;
    var estado = form.estado.value;
    var ibge  =  form.ibge.value;

    var dados = {nome, cpf, telefone_res, telefone_cel, cep, endereco,
    numero, bairro, cidade, estado, ibge};

    document.write("<h2>Retorno em JSON</h2>");
    document.write(JSON.stringify(dados, null,'<br>'))
}
