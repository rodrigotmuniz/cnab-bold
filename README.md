# Instruções

Para inicar a aplicação
1. instale as dependências
  ```bash
  npm install
  ```
2. Execute o arquivo principal
  ```bash
  npm start
  ```

  # Considerações
  1. Considerei que o arquivo CNAB possui sempre duas linha de header e duas trailler / footer
  2. Cada "elemento" de cada uma das linha possuem posição de inicio e fim fixas
  3. Todos os caminhos inseridos são absolutos
  4. Preferi utilizar uma abordagem de "escolha e avance" ao invês de utilizar todos os comandos via argumento pois, além de ser mais amigável essa abordagem, a quantidade de opções eram pequenas e a maioria dos campos era obrigatório e fixos.
  5. Não entendi porque usava apenas o primeiro lote e não todos no exemplo. Preferi mostrar sempre todos os lotes mas, caso que mostre apenas um especifico, fica facil de implementar
  6. Fiz algumas validações porém existem mais para serem feitas, além de testes unitário e outras melhorias como publicação na NPM para utitlização sem necessidade de ter que clonar o projeto.
  7. Não vi a necessidade de realizar o help pois já estava utilizando uma abordagem mais auto-instrutiva
  8. Algumas variáveil poderia ter sido colocadas em um arquivo de ambiente (.env). Decidi deixá-las no código para agilizar o processo.