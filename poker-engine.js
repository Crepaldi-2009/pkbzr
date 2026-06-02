class Card {

    constructor(rank,suit){

        this.rank = rank;
        this.suit = suit;

    }

    get display(){

        return `${this.rank}${this.suit}`;

    }

}

class Deck {

    constructor(){

        this.cards = [];

        const suits = ["♠","♥","♦","♣"];

        const ranks = [
            "2","3","4","5","6","7",
            "8","9","10",
            "J","Q","K","A"
        ];

        for(const suit of suits){

            for(const rank of ranks){

                this.cards.push(
                    new Card(rank,suit)
                );

            }

        }

        this.shuffle();

    }

    shuffle(){

        for(
            let i=this.cards.length-1;
            i>0;
            i--
        ){

            const j =
            Math.floor(
                Math.random()*(i+1)
            );

            [this.cards[i],this.cards[j]]
            =
            [this.cards[j],this.cards[i]];

        }

    }

    deal(){

        return this.cards.pop();

    }

}

const VALUE_MAP = {
    "2":2,
    "3":3,
    "4":4,
    "5":5,
    "6":6,
    "7":7,
    "8":8,
    "9":9,
    "10":10,
    "J":11,
    "Q":12,
    "K":13,
    "A":14
};

class HandEvaluator {

    static evaluate(cards){

        let high = 0;

        cards.forEach(card => {

            const value =
                VALUE_MAP[card.rank];

            if(value > high){

                high = value;

            }

        });

        return {
            rank: high,
            name: "Carta Alta"
        };

    }

}
