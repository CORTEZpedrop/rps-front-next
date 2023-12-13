"use client";
import Image from "next/image";
import styles from "./page.module.css";
import axios from "axios";
import { CSSProperties, useState } from "react";
import Confetti from "react-confetti";
import { useSpring, animated } from "react-spring";

interface GameResponse {
  escolha_computador: string;
  resultado: string;
}

export default function Home() {
  const [playerChoice, setPlayerChoice] = useState<string | null>(null);
  const [computerChoice, setComputerChoice] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [playerScore, setPlayerScore] = useState<number>(0);
  const [computerScore, setComputerScore] = useState<number>(0);
  const [draws, setDraws] = useState<number>(0);
  const [logic, setLogic] = useState<string>("jogar");
  const [playConfetti, setPlayConfetti] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const playGame = async () => {
    try {
      const response = await axios.post<GameResponse>(
        `http://localhost:8080/${logic}`,
        {
          escolha: playerChoice,
        }
      );

      setComputerChoice(response.data.escolha_computador);
      setResult(response.data.resultado);

      if (response.data.resultado === "Jogador Vence!") {
        setPlayConfetti(true);

        // alguns segundos e desativa o efeito
        setTimeout(() => {
          setPlayConfetti(false);
        }, 3000);
        setPlayerScore(playerScore + 1);
      } else if (response.data.resultado === "Computador Vence!") {
        setIsGameOver(true);

        // alguns segundos e desativa o efeito
        setTimeout(() => {
          setIsGameOver(false);
        }, 4000);
        setComputerScore(computerScore + 1);
      } else {
        setDraws(draws + 1);
      }
    } catch (error) {
      console.error("Erro ao jogar o jogo:", error);
    }
  };

  // Configuração da animação de fade-out usando react-spring
  const fadeOut = useSpring({
    opacity: isGameOver ? 0 : 1,
    pointerEvents: isGameOver ? "none" : "auto",
    config: { duration: 3000 },
  });

  return (
    <main className={styles.main}>
      {playConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
        />
      )}
      {isGameOver && (
        <animated.div
          style={fadeOut as unknown as CSSProperties}
          className={styles.lossMessage}
        >
          You lost! Better luck next time.
        </animated.div>
      )}
      {playConfetti && (
        <animated.div
          style={fadeOut as unknown as CSSProperties}
          className={styles.winMessage}
        >
          You Won! Congratulations!
        </animated.div>
      )}
      <div className={styles.description}>
        <p>
          Let's play a game of {"Rock-paper-scissors-lizard-Spock"}
          <span role="img" aria-label="victory hand"></span>
          ✌️🧻✂️🪨🦎
        </p>
        <div>
          <a
            href="https://en.m.wikipedia.org/wiki/Rock_paper_scissors#Additional_weapons"
            target="_blank"
            rel="noopener noreferrer"
          >
            A game created By{" "}
            <Image
              src="/BBT.png"
              alt="Big bang theory logo"
              className={styles.vercelLogo}
              width={100}
              height={100}
              priority
            />
          </a>
        </div>
      </div>
      <div className={styles.grid2}>
        <div className={styles.card}>
          <h2>Score</h2>
          <p>Player: {playerScore}</p>
          <p>Computer: {computerScore}</p>
          <p>Draws: {draws}</p>
        </div>
        <div className={styles.card}>
          Chose the logic:
          <select
            className={styles.select}
            value={logic}
            onChange={(event) => setLogic(event.target.value)}
          >
            <option value="jogar">Logic 1</option>
            <option value="jogar2">Logic 2</option>
            <option value="jogar3">Logic 3</option>
          </select>
        </div>
        <div className={styles.card}>
          <button onClick={playGame} className={styles.card2}>
            Play
          </button>

          {playerChoice && (
            <div>
              <p>Player choice: {playerChoice}</p>
              <p>Computer choice: {computerChoice}</p>
              <p>Result: {result}</p>
            </div>
          )}
        </div>
      </div>

      <div className={styles.grid}>
        <button
          onClick={() => {
            setPlayerChoice("lizard");
            setResult(null);
            setComputerChoice(null);
          }}
          className={styles.card}
        >
          <h2>
            Lizard <span>-&gt;</span>
          </h2>
          <p>Play</p>
        </button>

        <button
          onClick={() => {
            setPlayerChoice("lizard");
            setResult(null);
            setComputerChoice(null);
          }}
          className={styles.card}
        >
          <h2>
            Paper <span>-&gt;</span>
          </h2>
          <p>Play</p>
        </button>

        <button
          onClick={() => {
            setPlayerChoice("lizard");
            setResult(null);
            setComputerChoice(null);
          }}
          className={styles.card}
        >
          <h2>
            Scissors <span>-&gt;</span>
          </h2>
          <p>Play</p>
        </button>

        <button
          onClick={() => {
            setPlayerChoice("lizard");
            setResult(null);
            setComputerChoice(null);
          }}
          className={styles.card}
        >
          <h2>
            Spock <span>-&gt;</span>
          </h2>
          <p>Play</p>
        </button>

        <button
          onClick={() => {
            setPlayerChoice("lizard");
            setResult(null);
            setComputerChoice(null);
          }}
          className={styles.card}
        >
          <h2>
            Rock <span>-&gt;</span>
          </h2>
          <p>Play</p>
        </button>
      </div>
    </main>
  );
}
