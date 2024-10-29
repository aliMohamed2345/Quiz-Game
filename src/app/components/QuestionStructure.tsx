
import { useState, useEffect, useRef } from 'react';
import Msg from './Msg';
import { decodeHtmlEntities, HintsProps, RandomizeOptions, ShowMsgProps } from '../functions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { SetHints, SetScore, SetQuestionNumber, SetIsCorrectAnswer } from '../redux/Slices/QuestionStructureSlice';

function QuestionStructure() {
  //Redux variables
  let { QuestionContent,IsLoading, QuestionNumber, Score, Hints, IncorrectAnswers, correctAnswer } = useSelector((state: RootState) => state.QuestionStructure)
  let dispatch = useDispatch();
  //React Hooks
  const [hint, setHint] = useState<HintsProps>({ Hints: Hints!, IsUsed: false });
  const [shuffle, setShuffle] = useState<string[]>([]);
  const [checkBtn, setCheckBtn] = useState<boolean>(false);
  const [showMsg, setShowMsg] = useState<ShowMsgProps>({ show: false, isCorrect: false });
  const [currentScore, setCurrentScore] = useState(Score);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(QuestionNumber);
  const optionsRef = useRef<HTMLUListElement | null>(null);


  useEffect(() => {
    setShuffle(RandomizeOptions(IncorrectAnswers, correctAnswer));
  }, [correctAnswer, IncorrectAnswers]);
  //dispatching to redux 
  useEffect(() => {
    dispatch(SetQuestionNumber(currentQuestionNumber))
    dispatch(SetIsCorrectAnswer(showMsg.isCorrect))
    dispatch(SetScore(currentScore!))
    dispatch(SetHints(hint.Hints))
  }, [currentQuestionNumber, showMsg.isCorrect, currentScore, hint])
  console.log(correctAnswer);

  const handleHintClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setHint(prevHint => ({
      Hints: prevHint.Hints > 0 ? prevHint.Hints - 1 : 0,
      IsUsed: true,
    }));
    const btns: HTMLButtonElement[] = Array.from(optionsRef.current?.querySelectorAll('button') || []);
    btns.slice(1).forEach(btn => {
      if (btn.textContent !== correctAnswer) {
        btn.classList.add('disabled');
      }
    });
    e.currentTarget.classList.add('disabled');
  };

  const handleOptionsClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btns: HTMLButtonElement[] = Array.from(optionsRef.current?.querySelectorAll('button') || []);
    btns.forEach(btn => btn.classList.remove('active'));
    e.currentTarget.classList.toggle('active');
    setCheckBtn(true);
  };

  const handleCheckBtn = () => {
    const btns: HTMLButtonElement[] = Array.from(optionsRef.current?.querySelectorAll('button') || []);
    btns.forEach(btn => {
      if (btn.classList.contains('active')) {
        const isCorrect = btn.textContent === correctAnswer;
        setShowMsg({ show: true, isCorrect });
        setCurrentScore(prevScore => prevScore! + (isCorrect ? (hint.IsUsed ? 5 : 10) : 0));
        setCurrentQuestionNumber(prevNumber => prevNumber + 1);
      }
    });
  };

  return (
    <>
      <div className="container bg-warning p-3 w-75 m-auto text-center text-capitalize text-white rounded-3 position-absolute start-50 top-50 translate-middle">
        
        <p className='text-dark  m-0 d-block pb-4 p-0'>Score: <span>{currentScore}</span></p>
        <h3 className='fw-bold mb-4 '>
          Question <span className='text-success'>{currentQuestionNumber}</span>
        </h3>
        <button type='button' onClick={handleHintClick} className="btn-success btn mb-3">
          Hint: <span>{hint.Hints}</span>
        </button>
        <p className=' text-dark-emphasis col-sm-12 col-lg col-md-12'>{decodeHtmlEntities(QuestionContent)}</p>
        <div className="options">
          <ul ref={optionsRef} className='list-unstyled d-flex align-items-center justify-content-center flex-wrap gap-3'>
            {shuffle.map((answer, i) => (
              <li key={i + 1} className="bg-outline-primary col-12 col-lg-5 col-md-5 ">
                <button onClick={handleOptionsClick} className="w-100 btn mw-100 btn-outline-primary">{decodeHtmlEntities(answer)}</button>
              </li>
            ))}
          </ul>
        </div>
        <button onClick={handleCheckBtn} style={{ transition: "0.3s" }} className={`${checkBtn ? '' : 'disabled'} btn btn-secondary mt-4 w-50 col-sm-6 col-xs-5`}>
          Check
        </button>
      </div>
      {showMsg.show && (
        <Msg />
      )}
    </>
  );
}

export default QuestionStructure;
