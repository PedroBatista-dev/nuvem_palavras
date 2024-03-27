# ProjetoLiven

Este projeto foi desenvolvido em TypeScript com uso de um banco de dados MySql. Trata-se de um controle de respostas a uma pergunta com possibilidade da geração de relatórios com uso de Json Web Tokens e documentação no Swagger.
Para execução do projeto é necessário o uso do comando 
```
npm install
```
Seguido do comando 
```
npm run dev.
```
Tecnologias utilizadas: 
* TypeScript para desenvolvimento do código
* Testes Automatizados feitos com Jest
* Documentação feita com Swagger

Observação para Verificar os testes automatizados basta comentar as linhas referentes ao Swagger no arquivo routes.ts e rodar o comando 
```
npm test.
```