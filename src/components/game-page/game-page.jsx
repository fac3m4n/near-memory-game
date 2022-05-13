import { useEffect, useState } from "react";
import GameCard from "../game-card/game-card";
import classes from "./game-page.module.css";
import useAccount from "../../store/account.store";

import { v4 } from "uuid";
import { getPointsForLevel, getTimeForLevel } from "../../utils/game-rules";
import useUpdateEffect from "../../hooks/use-update-effect";
import { Navigate } from "react-router-dom";

const cardImages = [
  { src: "/img/deer.png", matched: false },
  { src: "/img/elephant.png", matched: false },
  { src: "/img/panda.png", matched: false },
  { src: "/img/tiger.png", matched: false },
  { src: "/img/zebra.png", matched: false },
  { src: "/img/gorilla.png", matched: false },
];

const GamePage = () => {
  const TOTAL_LEVELS = 10;

  const [pageLoading, setPageLoading] = useState(true);

  const [curLevel, setCurLevel] = useState(0);
  const [numberOfWins, setNumberOfWins] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // get account details
  const { accountId, isWalletConnected } = useAccount();

  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: v4() })); // use uuid for unique key

    setCards(shuffledCards);
  };

  // start new game auto
  useEffect(() => {
    (async () => {
      // perform async actions with smart contracts to get the level, number of times won, etc, will get them from localStorage for now
      const curData = localStorage.getItem(accountId)
        ? JSON.parse(localStorage.getItem(accountId))
        : null;

      setCurLevel(curData?.level || 0);
      setNumberOfWins(curData?.wins || 0);
      setRemainingTime(getTimeForLevel(curData?.level));
      setTotalPoints(curData?.points || 0);

      shuffleCards();
      setChoiceOne(null);
      setChoiceTwo(null);
      setTurns(0);

      setPageLoading(false);
    })();
  }, []); /* eslint-disable-line */

  // check for changes in cards to see if user has won the game
  useEffect(() => {
    // check if all cards are matched, to count it as a win
    const hasWonGame = cards.length > 0 && !cards.some((card) => !card.matched);

    if (hasWonGame) {
      // perform actions here to update wins and award points or whatever

      setTimeout(() => {
        setNumberOfWins((numWins) => numWins + 1);
        shuffleCards();
        setChoiceOne(null);
        setChoiceTwo(null);
        setRemainingTime(getTimeForLevel(curLevel));
        setTurns(0);
        setDisabled(false);
      }, 3000);
    }
  }, [cards, curLevel]);

  // check if user has won 3 times, in which case move them up a level
  useEffect(() => {
    if (numberOfWins >= 3) {
      // perform actions here to update points for user

      const newLevel = curLevel + 1;
      setCurLevel(newLevel);
      setNumberOfWins(0);
      setRemainingTime(getTimeForLevel(newLevel));
      setTotalPoints((curPts) => curPts + getPointsForLevel(newLevel));
    }
  }, [numberOfWins, curLevel]);

  // store data in localStorage (after initial renders are done)
  useUpdateEffect(() => {
    if (!accountId) return;

    localStorage.setItem(
      accountId,
      JSON.stringify({
        level: curLevel,
        wins: numberOfWins,
        totalPoints: totalPoints,
      })
    );
  }, [accountId, curLevel, numberOfWins, totalPoints]);

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

  //reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  if (!isWalletConnected) {
    return <Navigate to="/" />;
  }

  if (pageLoading) return <div>Hang on, fetching game info...</div>;

  return (
    <div className={classes.gameBody}>
      <div className={classes.game}>
        <h1>
          Level {curLevel} of {TOTAL_LEVELS}
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
