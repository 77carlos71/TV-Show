📺 TV Show Details Page

📌 Descrição

Esta aplicação exibe detalhes de um programa de TV, incluindo informações sobre a série, episódios e elenco. Os dados são recuperados de uma API externa e apresentados de forma dinâmica.


🛠️ Tecnologias Utilizadas

HTML5 e CSS3

SCSS (SASS) para pré-processamento de CSS

JavaScript (ES6+)

Fetch API para consumo dos dados

Arquitetura CSS: BEM

Tipografia: Nunito

📥 Instalação e Execução

Clone o repositório:

git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio

Instale o SASS:Para compilar os estilos, foi instalado o SASS, e o comando abaixo deve ser executado:

sass styles.scss:styles.css

Rodar o projeto:Foi utilizada a extensão Live Server no VS Code para rodar o projeto. Caso tenha ela instalada, basta clicar com o botão direito no index.html e selecionar "Open with Live Server".

Ou simplesmente abra o arquivo index.html no navegador.

🌐 Consumo de API

Os dados do programa e dos episódios são consumidos via Fetch API das seguintes URLs:

Detalhes do Show: SHOW123.json

Lista de Episódios: episodes.json

🎨 Funcionalidades

✅ Exibe informações detalhadas do programa de TV✅ Permite navegar entre temporadas (T1, T2, T3)✅ Permite visualizar detalhes de cada episódio ao clicar nele✅ Seção dedicada para exibir o elenco

📂 Estrutura do Projeto

/tv-show-details
│── 
/src

│   │── /assets   # imagens

│   │── /styles   # Arquivos SCSS/CSS

│   │── /scripts  # Arquivos JavaScript

│   │── index.html # Página principal

│── README.md     # Documentação

📝 Melhorias Futuras

Melhorar a interface responsiva e adicionar mais efeitos de interação
