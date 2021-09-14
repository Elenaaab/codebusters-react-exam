import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect, useParams, Link } from 'react-router-dom';

// import utils from 'src/utils';
// import background from 'src/assets/images/10V2.png';
import Bot from '../Bot';
import Timer from '../Timer';
import InputGame from '../InputGame';
import './board.scss';

// const { items } = utils[4];

const changeInArray = (object) => {
  const array = Object.values(object);
  return (array);
};

const Board = ({
  startGame,
  items,
  background,
  displayPicture,
  toggleDisplayPicture,
  setCurrentImg,
  currentImg,
  toggleDisplayInput,
  displayInput,
  inputGameValue,
  win,
  changeField,
  toggleDisplayDescription,
  currentDescription,
  setCurrentDescription,
  displayDescription,
  setMinutes,
  setSeconds,
  seconds,
  minutes,
  submitAnswer,
}) => {
  useEffect(() => {
    startGame();
  }, []);
  const { slug } = useParams();
  return (
    <>
      <Bot />
      <Timer setSeconds={setSeconds} setMinutes={setMinutes} />
      <img className="board-background" src={background} alt="" />
      {/* ON TE VOIT PETIT COQUIN ! */}
      <Link className="board-home-link" to="/">&#8962;</Link>
      {changeInArray(items).map((item) => (
        <div key={item.name}>
          {
          item.type === 'clickable'
          && (
            <div
              key={item.name}
              className="board-item"
              onClick={() => {
                setCurrentImg(item.picture1);
                toggleDisplayPicture();
                setCurrentDescription(item.description1);
              }}
            >
              <style jsx>{`
                  .board-item{
                    position: absolute;
                    top: ${item.y};
                    left: ${item.x};
                    width: ${item.width};
                    height: ${item.height};
                    border-radius: ${item.borderradius}
                  }
              `}
              </style>
            </div>
          )
        }
          {
          item.type === 'inputable'
          && (
          <div
            key={item.name}
            className="board-item"
            onClick={() => {
              toggleDisplayInput();
              setCurrentDescription(item.description1);
            }}
          >
            <style jsx>{`
                .board-item{
                  position: absolute;
                  top: ${item.y};
                  left: ${item.x};
                  width: ${item.width};
                  height: ${item.height};
                  border-radius: ${item.borderradius}
                }
            `}
            </style>
          </div>
          )
        }
          {
            item.type === 'nopicture'
            && (
            <div
              key={item.name}
              className="board-item"
              onClick={() => {
                setCurrentDescription(item.description1);
                toggleDisplayDescription();
              }}
            >
              <style jsx>{`
                  .board-item{
                    position: absolute;
                    top: ${item.y};
                    left: ${item.x};
                    width: ${item.width};
                    height: ${item.height};
                    border-radius: ${item.borderradius}
                  }
              `}
              </style>
            </div>
            )
          }
        </div>
      ))}
      {
    displayPicture && (
      <div className="image-container">
        <button
          className="image-button"
          type="button"
          onClick={() => {
            toggleDisplayPicture();
          }}
        >
          x
        </button>
        <img
          className="image"
          src={currentImg}
          alt=""
        />
        <p className="description">{currentDescription}</p>
      </div>
    )
    }
      {
        displayInput && (
          <InputGame
            inputGameValue={inputGameValue}
            changeField={changeField}
            toggleDisplayInput={toggleDisplayInput}
            displayDescription={displayDescription}
            toggleDisplayDescription={toggleDisplayDescription}
            submitAnswer={submitAnswer}
          />
        )
      }
      {
        displayDescription && (
          <div className="description-container">
            <button
              className="description-button"
              type="button"
              onClick={() => {
                toggleDisplayDescription();
              }}
            >
              x
            </button>
            <p className="description-nopicture">{currentDescription}</p>
          </div>
        )
      }
      {
      win && !displayInput && (
        <>
          <Redirect to={`/game/${slug}/win`} />
        </>
      )
      }
      {
        seconds === 0 && minutes === 0 && (
          <>
            <Redirect to={`/game/${slug}/loose`} />
          </>
        )
      }
    </>
  );
};

Board.propTypes = {
  startGame: PropTypes.func.isRequired,
  items: PropTypes.object.isRequired,
  background: PropTypes.string.isRequired,
  displayPicture: PropTypes.bool.isRequired,
  toggleDisplayPicture: PropTypes.func.isRequired,
  setCurrentImg: PropTypes.func.isRequired,
  currentImg: PropTypes.string.isRequired,
  toggleDisplayInput: PropTypes.func.isRequired,
  displayInput: PropTypes.bool.isRequired,
  inputGameValue: PropTypes.string.isRequired,
  win: PropTypes.bool.isRequired,
  changeField: PropTypes.func.isRequired,
  toggleDisplayDescription: PropTypes.func.isRequired,
  currentDescription: PropTypes.string.isRequired,
  setCurrentDescription: PropTypes.func.isRequired,
  displayDescription: PropTypes.bool.isRequired,
  setMinutes: PropTypes.func.isRequired,
  setSeconds: PropTypes.func.isRequired,
  seconds: PropTypes.number.isRequired,
  minutes: PropTypes.number.isRequired,
  submitAnswer: PropTypes.func.isRequired,
};
export default Board;
