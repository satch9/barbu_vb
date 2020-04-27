const socketio = require("socket.io");
const {
    decks
} = require("cards");

module.exports = function (server) {

    // io server
    const io = socketio(server);
    // game state (players list)
    let players = {};
    let game = {};
    let connectionsLimit = 4;

    io.on("connection", function (socket) {

        // register new player
        players[socket.id] = socket.id;
        console.log(players);



        if (io.engine.clientsCount > connectionsLimit) {
            socket.emit('quota', {
                message: 'quota de connections atteint'
            })
            socket.disconnect(true);
            console.log('Disconnected...');
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
            const hand1 = deck.draw(8);
            const hand2 = deck.draw(8);
            const hand3 = deck.draw(8);
            const hand4 = deck.draw(8);

            let tour = null;
            tour %= Object.keys(players).length;
            let hands = [hand1, hand2, hand3, hand4];

            function shuffle(a) {
                for (let i = a.length; i; i--) {
                    let j = Math.floor(Math.random() * i);
                    [a[i - 1], a[j]] = [a[j], a[i - 1]];
                }
            }

            const tabHand = [];
            for (let i = 1; i < 5; i++) {
                tabHand.push(i);
            }

            console.log("avant shuffle ", hands)
            console.log("apres shuffle", tabHand);
            game = {
                hands: hands,
                players: players,
                tour: tour,
                message: 'La partie peut commencer'
            }

            io.emit('init', game);
        }


        // delete disconnected player
        socket.on("disconnect", function () {
            delete players[socket.id];
            console.log("players disconnect ", players);
        });


    });



};