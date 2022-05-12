import { useEffect, useState } from "react";
import GameCard from "../game-card/game-card";
import classes from "./game-page.module.css";

const cardImages = [
  { src: "/img/deer.png", matched: false },
  { src: "/img/elephant.png", matched: false },
  { src: "/img/panda.png", matched: false },
  { src: "/img/tiger.png", matched: false },
  { src: "/img/zebra.png", matched: false },
  { src: "/img/gorilla.png", matched: false },
];

const GamePage = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // console.log(cards)

  //reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  // start new game auto
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className={classes.gameBody}>
      <div className={classes.game}>
        <h1>Level 1</h1>
        <button onClick={shuffleCards}>New Game</button>

        <div className={classes.cardGrid}>
          {cards.map((card) => (
            <GameCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
        </div>
        <p>Turns: {turns}</p>
      </div>
    </div>
  );
};

export default GamePage;
