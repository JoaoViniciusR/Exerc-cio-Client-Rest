
// URL do serviço que o client está chamando
const serviceUrl = 'https://viacep.com.br/ws/';

// Selecionar o formulário e o elemento para exibir o resultado
const form = document.querySelector('#cep-form');
const result = document.querySelector('#result');

// Adicionar um event listener para o formulário
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Obter o CEP digitado
    const cep = document.querySelector('#cep').value;

    // Verificar se o CEP tem 8 dígitos
    if (cep.length === 8) {
        // URL do serviço com o CEP como parâmetro
        const url = `${serviceUrl}${cep}/json/`;

        // Fazer a requisição GET para o serviço
        fetch(url)
            .then((response) => {
                // Verificar se a resposta é OK
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Erro na requisição');
                }
            })
            .then((data) => {
                // Exibir o resultado na tela
                result.innerHTML = `
                    <strong>Logradouro:</strong> ${data.logradouro}<br>
                    <strong>Bairro:</strong> ${data.bairro}<br>
                    <strong>Cidade:</strong> ${data.localidade}<br>
                    <strong>Estado:</strong> ${data.uf}<br>
                `;
            })
            .catch((error) => {
                console.error(error);
                result.innerHTML = 'Erro ao buscar o endereço';
            });
    } else {
        result.innerHTML = 'CEP inválido';
    }
});

//A URL do serviço que o client está chamando é https://viacep.com.br/ws/.
// O serviço tem um parâmetro, que é o CEP ({cep}). Ele é necessário para buscar o endereço correspondente ao CEP informado.
// O serviço tem retorno do tipo JSON, contendo informações sobre o endereço, como logradouro, bairro, cidade, estado e CEP.
// O tipo de serviço REST que estamos chamando é um serviço de busca de endereço por CEP (CEP Lookup). Ele é útil para preencher automaticamente os campos de endereço em um formulário de cadastro, por exemplo.