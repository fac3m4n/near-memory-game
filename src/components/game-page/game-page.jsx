import { useEffect, useState } from "react";
import GameCard from "../game-card/game-card";
import classes from "./game-page.module.css";

import { v4 } from "uuid";

const cardImages = [
  { src: "/img/deer.png", matched: false },
  { src: "/img/elephant.png", matched: false },
  { src: "/img/panda.png", matched: false },
  { src: "/img/tiger.png", matched: false },
  { src: "/img/zebra.png", matched: false },
  { src: "/img/gorilla.png", matched: false },
];

const GamePage = () => {
  const [curLevel, setCurLevel] = useState(1);
  const totalLevels = 10;
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: v4() })); // use uuid for unique key

    setCards(shuffledCards);
  };

  // start new game auto
  useEffect(() => {
    shuffleCards();

    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
  }, [curLevel]);

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

  return (
    <div className={classes.gameBody}>
      <div className={classes.game}>
        <h1>
          Level {curLevel} of {totalLevels}
        </h1>

        {/* <button onClick={shuffleCards}>New Game</button> */}

        <div className={classes.cardGrid}>
          {cards.map((card) => {
            const isCardFlipped =
              card?.id === choiceOne?.id ||
              card?.id === choiceTwo?.id ||
              card?.matched;

            return (
              <GameCard
                key={card.id}
                card={card}
                handleChoice={handleChoice}
                flipped={isCardFlipped}
                disabled={disabled || isCardFlipped}
              />
            );
          })}
        </div>
        <p>Turns: {turns}</p>
      </div>
    </div>
  );
};

export default GamePage;
