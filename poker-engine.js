:root{
    --felt:#114227;
    --felt-dark:#0a2f1b;
    --gold:#ffd700;
    --red:#e74c3c;
    --blue:#3498db;
    --green:#2ecc71;
    --white:#ffffff;
}

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    -webkit-tap-highlight-color:transparent;
}

html,body{
    width:100%;
    height:100%;
    overflow:hidden;
}

body{
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
    background:
        radial-gradient(circle at center,
        var(--felt),
        var(--felt-dark));
    color:white;
    display:flex;
    flex-direction:column;
}

.top-bar{
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:15px;
    font-size:1rem;
    font-weight:700;
    border-bottom:1px solid rgba(255,255,255,.15);
}

.bankroll{
    color:var(--gold);
}

.pot{
    color:white;
}

#table{
    flex:1;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    padding:15px;
}

#bots-container{
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:10px;
}

.bot-seat{
    background:rgba(255,255,255,.06);
    border:1px solid rgba(255,255,255,.08);
    border-radius:14px;
    padding:8px;
    text-align:center;
}

.bot-name{
    font-size:.8rem;
    color:var(--gold);
}

.bot-stack{
    font-size:.75rem;
    opacity:.85;
}

.cards-row{
    display:flex;
    justify-content:center;
    gap:8px;
    flex-wrap:wrap;
}

.card{
    width:60px;
    height:90px;
    background:white;
    color:black;
    border-radius:8px;
    display:flex;
    justify-content:center;
    align-items:center;
    font-weight:700;
    font-size:1.1rem;
    box-shadow:0 4px 10px rgba(0,0,0,.4);
}

.card.red{
    color:#d63031;
}

.card.back{
    background:#1e5aa8;
    color:white;
}

#community-section{
    text-align:center;
}

#community-section h3{
    margin-bottom:10px;
}

#player-section{
    display:flex;
    flex-direction:column;
    gap:15px;
}

#action-panel{
    display:grid;
    grid-template-columns:repeat(2,1fr);
    gap:10px;
}

button{
    border:none;
    border-radius:12px;
    padding:14px;
    font-weight:700;
    font-size:1rem;
}

#btn-fold{
    background:var(--red);
    color:white;
}

#btn-check{
    background:var(--blue);
    color:white;
}

#btn-raise{
    background:var(--green);
    color:white;
}

#btn-allin{
    background:var(--gold);
    color:black;
}

#message-box{
    min-height:60px;
    padding:15px;
    text-align:center;
    font-weight:600;
    background:rgba(0,0,0,.2);
    border-top:1px solid rgba(255,255,255,.1);
}

@media (max-width:500px){

    .card{
        width:50px;
        height:75px;
        font-size:.95rem;
    }

    button{
        padding:12px;
        font-size:.9rem;
    }
}
