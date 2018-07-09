# Teste de Manipulação de Dados

O código foi dividido em 2 serviços que podem
ser reutilizados em outros contextos:

- Services/UtilService.js
- Services/EventService.js

O EventService é o responsável por gerar o relatório
requisitado a partir de uma lista de eventos.

O UtilService contém uma função que eu criei anteriormente
para outro projeto chamada `reduceByKey()`.

Essa função é utilizada pelo EventService para agrupar os
eventos pelo ID de cada transação e em seguida reduzir
cada grupo de eventos a um único elemento da timeline final.

Para demonstrar o uso do EventService criei um arquivo
main.js que pode ser executado utilizando o node.js:

- `node main.js`
