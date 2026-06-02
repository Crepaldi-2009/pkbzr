class PokerBot {

    constructor(name, style) {

        this.name = name;
        this.style = style;

        this.chips = 10000;

        this.cards = [];

        this.folded = false;

    }

    resetHand() {

        this.cards = [];
        this.folded = false;

    }

    evaluatePreFlop() {

        if (this.cards.length < 2) return 0;

        const c1 = VALUE_MAP[this.cards[0].rank];
        const c2 = VALUE_MAP[this.cards[1].rank];

        if (c1 === c2) return 9;

        if (c1 >= 13 && c2 >= 13) return 8;

        if (c1 >= 10 && c2 >= 10) return 7;

        if (Math.abs(c1 - c2) <= 1) return 6;

        return 3;

    }

    decide(currentBet) {

        if (this.folded) {
            return "fold";
        }

        const strength = this.evaluatePreFlop();

        switch(this.style){

            case "aggressive":

                if(strength >= 7) return "raise";
                if(strength >= 4) return "call";
                return Math.random() < 0.3 ? "call" : "fold";

            case "tight":

                if(strength >= 8) return "raise";
                if(strength >= 6) return "call";
                return "fold";

            case "bluffer":

                if(Math.random() < 0.25) return "raise";
                if(strength >= 5) return "call";
                return "fold";

            case "maniac":

                return Math.random() < 0.6
                    ? "raise"
                    : "call";

            default:

                if(strength >= 7) return "raise";
                if(strength >= 5) return "call";
                return "fold";
        }

    }

}

const bots = [

    new PokerBot("Bot A","tight"),
    new PokerBot("Bot B","aggressive"),
    new PokerBot("Bot C","balanced"),
    new PokerBot("Bot D","bluffer"),
    new PokerBot("Bot E","maniac")

];
