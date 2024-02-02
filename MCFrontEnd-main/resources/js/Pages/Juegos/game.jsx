import React, { useState, useEffect } from 'react';
import './style.css';
import { FaArrowLeft } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJetFighterUp } from '@fortawesome/free-solid-svg-icons';
import ParticlesLinks from '@/Components/Customized/ParticlesComponents/ParticlesLinks';
import TrailAppear from '@/Components/Customized/AnimationComponents/TrailAppear';

function Game() {
  const [gameInProgress, setGameInProgress] = useState(true);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [airplaneSpeed, setAirplaneSpeed] = useState(10);
  const [obstacleSpeed, setObstacleSpeed] = useState(5);
  const [obstacleMoveInterval, setObstacleMoveInterval] = useState(null);
  const [showModal, setShowModal] = useState(false);
  function restartGame() {
    setGameInProgress(true);
    setScore(0);
    setLevel(1);
    setShowModal(false);
  
    const obstacles = document.querySelectorAll('.obstacle');
    obstacles.forEach((obstacle) => obstacle.remove());
  }
  

  useEffect(() => {
    const airplane = document.getElementById('airplane');
    const gameContainer = document.getElementById('game-container');
    const modal = document.getElementById('modal');

    document.addEventListener('keydown', handleKeyDown);

    let obstacleMoveInterval;

    function handleKeyDown(event) {
      if (event.code === 'ArrowLeft') {
        moveLeft();
      } else if (event.code === 'ArrowRight') {
        moveRight();
      }
    }

    function moveLeft() {
      if (!gameInProgress) return;
      let leftPosition = parseInt(window.getComputedStyle(airplane).getPropertyValue('left'));
      if (leftPosition > 0) {
        airplane.style.left = Math.max(0, leftPosition - airplaneSpeed) + 'px';
      }
      checkCollision();
    }

    function moveRight() {
      if (!gameInProgress) return;
      let leftPosition = parseInt(window.getComputedStyle(airplane).getPropertyValue('left'));
      let maxLeftPosition = gameContainer.offsetWidth - airplane.offsetWidth;
      if (leftPosition < maxLeftPosition) {
        airplane.style.left = Math.min(maxLeftPosition, leftPosition + airplaneSpeed) + 'px';
      }
      checkCollision();
    }

    function createObstacle() {
      const obstacle = document.createElement('div');
      obstacle.classList.add('obstacle');
      obstacle.style.left = `${Math.floor(Math.random() * (gameContainer.offsetWidth - 100))}px`;
      obstacle.style.top = '-20px';
      gameContainer.appendChild(obstacle);

      obstacleMoveInterval = setInterval(() => {
        if (!gameInProgress) {
          clearInterval(obstacleMoveInterval);
          return;
        }
        const topPosition = parseInt(window.getComputedStyle(obstacle).getPropertyValue('top'));
        if (topPosition > gameContainer.offsetHeight) {
          obstacle.remove();
          clearInterval(obstacleMoveInterval);
          updateScore(10);
        } else {
          obstacle.style.top = `${topPosition + obstacleSpeed}px`;
          checkCollision();
        }
      }, 10);
    }

    function checkCollision() {
      const obstacles = document.getElementsByClassName('obstacle');
      let airplaneRect = airplane.getBoundingClientRect();

      for (let obstacle of obstacles) {
        let obstacleRect = obstacle.getBoundingClientRect();
        if (
          airplaneRect.top < obstacleRect.bottom &&
          airplaneRect.bottom > obstacleRect.top &&
          airplaneRect.left < obstacleRect.right &&
          airplaneRect.right > obstacleRect.left
        ) {
          endGame();
          break; // Exit the loop after detecting collision
        }
      }
    }

    function updateScore(points) {
      setScore((prevScore) => {
        const newScore = prevScore + points;

        if (newScore >= level * 100) {
          const newLevel = Math.floor(newScore / 100) + 1;
          setLevel(newLevel);
          increaseDifficulty();

          setGameInProgress(false); // Pausar juego
        }

        return newScore;
      });
    }

    function increaseDifficulty() {
      setAirplaneSpeed((prevSpeed) => prevSpeed + 3);
      setObstacleSpeed((prevSpeed) => prevSpeed + 2);
    }

    function endGame() {
      setGameInProgress(false);
      clearInterval(obstacleMoveInterval);
      setShowModal(true);
    }

    createObstacle();
    const obstacleInterval = setInterval(createObstacle, 3000);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(obstacleInterval);
    };
  }, []);

  return (
    <div>
      <div className='w-full relative bg-gradient-to-b from-mc-primary to-mc-gradient3_2'>
        <ParticlesLinks color="#ffffff" />
        <TrailAppear>
          <div className="w-full max-w-7xl mx-auto px-6 xs:px-2 sm:px-10 lg:px-30 py-5 pt-10 text-white h-[150px]">
            <h1
              className='ml-4 font-black text-4xl'
              style={{
                fontFamily: 'Poppins, sans-serif',
                color: 'transparent',
                WebkitTextStroke: '2px #ffffff'
              }}
            >
              Airplane Game!
            </h1>
          </div>
        </TrailAppear>
      </div>

      <div className="flex flex-wrap justify-center px-20 py-2 justify-around bg-gray-900">
        <div className="bg-gray-900 text-sm font-semibold text-white shadow-sm" id="level">
          Nivel {level}
        </div>
        <div className="bg-gray-900 text-sm font-semibold text-white shadow-sm" id="score">
          Puntos: {score}
        </div>
        <button className="bg-orange-500 rounded px-1 text-sm font-semibold text-white shadow-sm"
          onClick={restartGame}
        >
          Reiniciar Juego
        </button>
        <button className='justify-center flex items-justify text-center bg-orange-500 rounded px-2 py-1 text-sm font-semibold text-white shadow-sm'
          onClick={() => location.replace(route('juegos.page'))}>
        <FaArrowLeft className='justify-center flex items-justify text-center pt-1 pr-1'/>
          Volver
        </button>
      </div>

      <div id="container">
        <div id="game-container">
          <div id="airplane">
            <div>
              <FontAwesomeIcon icon={faJetFighterUp} />
            </div>
          </div>
        </div>

        {showModal && (
          <div id="modal" className="bg-orange-500 rounded px-1 text-md font-semibold text-white shadow-sm">
            <p id="modal-message">Game over!</p>
            <p>Tu puntaje final es: {score}</p>
            <button
              className="bg-orange-500 rounded px-1 mt-7 text-sm font-semibold text-white shadow-sm"
              onClick={restartGame}
            >
              Reiniciar Juego
            </button>
          </div>
        )}
      </div>

      <div className='w-full text-white py-2 bg-[#101010]'>
        <div className='max-w-7xl mx-auto px-16 xs:px-6 sm:px-6 lg:px-30 h-full flex flex-col'>
          <div className='pt-6'>
            <h1 className='text-md font-bold'>Dirección:</h1>
            <p>Lousiana Nápoles, 23923</p>
          </div>
          <div className='pt-4'>
            <h1 className='text-md font-bold'>Correo Electrónico:</h1>
            <p>contacto@airplane-game.com</p>
          </div>
          <div className='pt-4'>
            <h1 className='text-md font-bold'>Teléfono:</h1>
            <p>+1 234 567 8901</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;
