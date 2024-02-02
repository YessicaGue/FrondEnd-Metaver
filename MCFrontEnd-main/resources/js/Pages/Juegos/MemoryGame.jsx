import React, { useState, useEffect } from 'react';
import './Memory.css';
import { FaArrowLeft } from 'react-icons/fa';
import ParticlesLinks from '@/Components/Customized/ParticlesComponents/ParticlesLinks';
import TrailAppear from '@/Components/Customized/AnimationComponents/TrailAppear';

import img1 from './img1.png';
import img2 from './img2.png';
import img3 from './img3.png';
import img4 from './img4.png';
import img5 from './img5.png';
import img6 from './img6.png';
import img7 from './img7.png';
import img8 from './img8.png';
import img9 from './img9.png';
import img10 from './img10.png';
import img11 from './img11.png';
import img12 from './img12.png';
import img13 from './img13.png';
import img14 from './img14.png';
import img15 from './img15.png';
import img16 from './img16.png';
import img17 from './img17.png';
import img18 from './img18.png';
import img19 from './img19.png';
import img20 from './img20.png';
import imgBack from './img.png';
import { Head } from '@inertiajs/react';

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timer, setTimer] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const levels = [
    { cards: 6 },
    { cards: 10 },
    { cards: 12 },
    { cards: 16 },
    { cards: 20 },
    { cards: 30 },
    { cards: 40 }

  ];

  const images = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
    img12,
    img13,
    img14,
    img15,
    img16,
    img17,
    img18,
    img19,
    img20
  ];

  useEffect(() => {
    if (!gameOver) {
      setCards(createCards(levels[level - 1]));
    }
  }, [level, gameOver]);

  useEffect(() => {
    if (selectedCards.length === 2) {
      checkForMatch();
    }
  }, [selectedCards]);

  useEffect(() => {
    if (score === levels[level - 1].cards / 2) {
      endGame();
      if (level < levels.length) {
        openModal();
        setLevel((prevLevel) => prevLevel + 1);
      } else {
        setGameOver(true);
      }
    }
  }, [score, level]);

  const createCards = (level) => {
    const cardCount = level.cards / 2;
    const cards = [];

    for (let i = 1; i <= cardCount; i++) {
      const cardName = 'card' + i;
      const cardImg = images[i - 1];

      cards.push({ name: cardName, image: cardImg, flipped: false });
      cards.push({ name: cardName, image: cardImg, flipped: false });
    }

    return shuffleCards(cards);
  };

  const shuffleCards = (array) => {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  const selectCard = (cardIndex) => {
    if (!cards[cardIndex].flipped && selectedCards.length < 2) {
      const updatedCards = [...cards];
      updatedCards[cardIndex].flipped = true;

      setCards(updatedCards);
      setSelectedCards((prevSelectedCards) => [...prevSelectedCards, cardIndex]);
    }
  };

  const checkForMatch = () => {
    const [cardIndex1, cardIndex2] = selectedCards;
    const updatedCards = [...cards];

    if (cards[cardIndex1].name === cards[cardIndex2].name) {
      updatedCards[cardIndex1].flipped = true;
      updatedCards[cardIndex2].flipped = true;
      setScore((prevScore) => prevScore + 1);
    } else {
      setTimeout(() => {
        updatedCards[cardIndex1].flipped = false;
        updatedCards[cardIndex2].flipped = false;
        setCards(updatedCards);
      }, 1000);
    }

    setSelectedCards([]);
  };

  const openModal = () => {
    setIsModalOpen(true);
    clearInterval(intervalId);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setScore(0);
    setTimer(0);
    setIntervalId(startTimer());
  };

  const endGame = () => {
    clearInterval(intervalId);
  };

  const startTimer = () => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    return interval;
  };

  const restartGame = () => {
    setLevel(1);
    setScore(0);
    setTimer(0);
    setSelectedCards([]);
    setGameOver(false);
    clearInterval(intervalId);
    setIntervalId(startTimer());
  };

  useEffect(() => {
    if (level === 1) {
      setTimer(0);
      const newIntervalId = startTimer();
      setIntervalId(newIntervalId);
    }
  }, [level]);

  return (
    <div className='h-full'>
      <Head title='Memorama' />

      <div className='w-full h-full bg-gradient-to-b from-mc-primary to-mc-gradient3_2'>

        <ParticlesLinks color="#ffffff" />

        <TrailAppear>
          <div className="w-full max-w-7xl mx-auto px-6 xs:px-2 sm:px-10 lg:px-30 py-5 pt-10 text-white h-[200px]">
              <h1 className='ml-8 font-black text-5xl' style={{
                  fontFamily: 'Poppins, sans-serif',
                  color: 'transparent',
                  WebkitTextStroke: '2px #ffffff'
              }}> Reta a tu mente! </h1>
          </div>
        </TrailAppear>
      </div>


      <div className="flex flex-wrap mb-20 px-20 py-2 justify-around bg-gray-900">
          <div className="bg-gray-900 text-sm font-semibold text-white shadow-sm" id="level">
            Nivel {level}
          </div>
          <div className="bg-gray-900 text-sm font-semibold text-white shadow-sm" id="timer">
            Tiempo {timer}
          </div>
          <div className="bg-gray-900 text-sm font-semibold text-white shadow-sm" id="score">
            Puntos: {score}
          </div>
          <button
            className="bg-orange-500 rounded px-1 text-sm font-semibold text-white shadow-sm"
            onClick={restartGame}
          >
            Reiniciar Juego
          </button>
      </div>
      <div className='h-full w-full p-5'>
        <div className="cards-container h-full" id="game-board">
          {cards.map((card, index) => (
            <div
              className={`memory-card ${card.flipped ? 'flipped' : ''}`}
              key={index}
              onClick={() => selectCard(index)}
            >
              <div className="card-front">
                <img src={card.image} alt={card.name} />
              </div>
              <div className="card-back">
                <img src={imgBack} alt="Back" />
              </div>
            </div>
          ))}
        </div>
        <div className='justify-center flex mb-40'>
            <button class="flex items-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
             onClick={() => location.replace(route('juegos.page'))}>
            <FaArrowLeft className="w-4 h-4 mr-2"/>
              Volver
            </button>
        </div>
      </div>
      <div className='w-full text-white py-2 bg-[#101010]'>
        <div className='max-w-7xl mx-auto px-16 xs:px-6 sm:px-6 lg:px-30 h-full flex flex-col'>
          <div className='pt-6'>
            <h1 className='text-md font-bold'>Dirección:</h1>
            <p>Lousiana Nápoles, 23923</p>
          </div>
          <div className='pt-4'>
            <h1 className='text-md font-bold'>Teléfono:</h1>
            <p>222 333 4567</p>
          </div>
          <div className='pt-4'>
            <h1 className='text-md font-bold'>Contacto:</h1>
            <p>labmc@movimientociudadano.mx</p>
          </div>
        </div>
      </div>
      
      {isModalOpen && (
        <div id="modal">
          <div className="text-lg font-semibold text-white shadow-md" id="modal-content">
            <span id="modal-close-btn" onClick={closeModal}>&times;</span>
            <h2 style={{ justifyContent: 'center' }}> Felicidades! <br /> <br /> Nivel completado</h2>
            {gameOver ? (
              <p>Felicidades! <br /> <br /> Completaste todos los niveles </p>
            ) : (
              <p> en {timer} segundos! <br /> <br /> Buen trabajo sigue así.</p>
            )}
            {!gameOver && (
              <button className="bg-orange-600 rounded my-10 px-10 py-1 text-sm font-semibold text-white shadow-sm" onClick={closeModal}>
                Next Level
              </button>
            )}
          </div>
        </div>
      )}
    </div>
    );
  };



export default MemoryGame;
