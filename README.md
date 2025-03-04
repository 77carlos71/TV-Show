📺 Penny Dreadful - TV Show Details Page
📌 Descrição
Uma aplicação web interativa que exibe detalhes da série Penny Dreadful, incluindo informações gerais, episódios por temporada, elenco e prêmios. Os dados são consumidos dinamicamente de APIs externas e apresentados em uma interface moderna, com navegação fluida e design responsivo. Repositório disponível em: https://github.com/77carlos71/TV-Show

🛠️ Tecnologias Utilizadas

HTML5 e CSS3: Estrutura e estilos base.
SCSS (SASS): Pré-processamento de CSS para modularidade e manutenção.
JavaScript (ES6+): Lógica dinâmica e interatividade.
Fetch API: Consumo de dados de APIs externas.
Arquitetura CSS: BEM para organização e escalabilidade.
Tipografia: Nunito para uma experiência visual elegante.

📥 Instalação e Execução
Clone o repositório:
git clone https://github.com/77carlos71/TV-Show.git
cd TV-Show

Instale o SASS e compile os estilos:
npm install -g sass
sass styles/scss/styles.scss styles/css/styles.css
Rode o projeto:

Use a extensão Live Server no VS Code: clique com o botão direito em index.html e selecione "Open with Live Server".
Ou abra o arquivo index.html diretamente no navegador.

🌐 Consumo de API

A aplicação consome dados via Fetch API das seguintes URLs hospedadas na AWS S3:
Detalhes da Série: https://agile-releases.s3.us-east-1.amazonaws.com/tests/tv-shows/SHOW123.json
Lista de Episódios: https://agile-releases.s3.us-east-1.amazonaws.com/tests/episodes/SHOW123.json

🎨 Funcionalidades
✅ Exibe informações detalhadas da série Penny Dreadful.
✅ Navegação entre temporadas (T1, T2, T3) com destaque visual.
✅ Detalhes de episódios (sinopse, duração, imagem) ao clicar.
✅ Seções interativas para elenco e prêmios com rolagem horizontal.


📝 Melhorias Futuras

Melhorar a responsividade para dispositivos móveis.
Implementar cache para otimizar o carregamento de dados.
🤝 Contribuição

Quer ajudar? Siga os passos:

Faça um fork do repositório.
Crie uma branch para sua feature:
git checkout -b minha-feature
Commit suas alterações:
git commit -m "Adicionei uma nova feature"
Envie para o repositório remoto:
git push origin minha-feature
Abra um Pull Request.
