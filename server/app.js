const hbs = require('handlebars');
const fs = require('fs');
const _ = require('underscore');
const path = require('path');
const express = require('express'),
    app = express();

// carregar "banco de dados" (data/jogadores.json e data/jogosPorJogador.json)
// você pode colocar o conteúdo dos arquivos json no objeto "db" logo abaixo
// dica: 3-4 linhas de código (você deve usar o módulo de filesystem (fs))
const db = {
	player: JSON.parse(fs.readFileSync('${__dirname}/data/jogadores.json')),
	gamesPP: JSON.parse(fs.readFileSync('${__dirname}/data/jogosPorJogador.json'))
};

// configurar qual templating engine usar. Sugestão: hbs (handlebars)
app.set('view engine', 'hbs');

// EXERCÍCIO 2
// definir rota para página inicial --> renderizar a view index, usando os
// dados do banco de dados "data/jogadores.json" com a lista de jogadores
// dica: o handler desta função é bem simples - basta passar para o template
//       os dados do arquivo data/jogadores.json
app.get('/',function(req,res){
	res.render('${__dirname}/views/index.hbs',db);
});

// EXERCÍCIO 3
// definir rota para página de detalhes de um jogador --> renderizar a view
// jogador, usando os dados do banco de dados "data/jogadores.json" e
// "data/jogosPorJogador.json", assim como alguns campos calculados
// dica: o handler desta função pode chegar a ter umas 15 linhas de código
app.get('/jogador/:userId/', function(req, res) {

  // retorna detalhes do jogador
  const jogador = _.find(db.player.players, function(el) {
    return el.steamid == req.params.userId;
  });
 
  console.log(jogador.steamid)
  console.log(db.gamesPP)
  const info = db.gamesPP[jogador.steamid];
  const games = [];
  for(joguinho of info.games){
  	joguinho.playtime_forever /= 60;
  	games.push(joguinho);
  }

  const context = {
  	jogador,
  	games,
  	mainGame : games[0]
  }
  res.render('${__dirname}/views/jogador.hbs', context);
 });

// EXERCÍCIO 1
// configurar para servir os arquivos estáticos da pasta "client"
// dica: 1 linha de código
app.use(express.static('${__dirname}/../client'));

// abrir servidor na porta 3000
// dica: 1-3 linhas de código
app.listen(3000, function(){
	console.log('Tá me ouvindo?');
});
