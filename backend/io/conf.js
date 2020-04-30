const socketio = require("socket.io");
const { decks } = require("cards");
const Player = require("../lib/player");

module.exports = function(server) {
  // io server
  const io = socketio(server);
  // game state (players list)
  let players = [];
  let game = {};
  let connectionsLimit = 4;

  io.on("connection", function(socket) {
    // register new player
    players.push(new Player(socket));

    if (io.engine.clientsCount > connectionsLimit) {
      socket.emit("quota", {
        message: "quota de connections atteint"
      });

      return;
    } else if (io.engine.clientsCount < 4) {
      socket.emit("enattente", {
        message: "Nous attendons un autre joueur"
      });
    } else {
      // Create a standard 32 card deck
      const deck = new decks.PiquetDeck();
      // Shuffle the deck
      deck.shuffleAll();
      // Draw a hand of five cards from the deck
      let hand1 = deck.draw(8);
      let hand2 = deck.draw(8);
      let hand3 = deck.draw(8);
      let hand4 = deck.draw(8);
      let hands = [hand1, hand2, hand3, hand4];

      //Object.keys(players)
      for (let p = 0; p < players.length; p++) {
        players[p].hand = hands[p];
      }

      let tour = null;
      tour %= Object.keys(players).length;

      game = {
        players: players,
        tour: tour,
        message: "La partie peut commencer"
      };

      io.emit("init", game);
    }

    // delete disconnected player
    socket.on("disconnect", function() {
      players.forEach(el => {
        console.log(el);
        if (el.id === socket.id) {
          console.log("players disconnect ", players.indexOf(el));
          players.splice(players.indexOf(el), 1);
        }
      });
      console.log("disconnect players", players);
    });
  });
};
