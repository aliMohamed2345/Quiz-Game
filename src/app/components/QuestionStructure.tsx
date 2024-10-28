import { useState, useEffect, useRef } from 'react';
import { Msg } from './Msg';
import { decodeHtmlEntities, HintsProps, RandomFunction, RandomizeOptions, ShowMsgProps, QuestionProps } from '../functions/actions';





function QuestionStructure({ QuestionNumber, Score, QuestionContent, Hints, correctAnswer, IncorrectAnswers, Difficulty, Topic }: QuestionProps) {
  let [Hint, SetHint] = useState<HintsProps>({ Hints: Hints!, IsUsed: false });
  let [shuffle, SetShuffle] = useState<string[]>([]);
  let optionsRef = useRef<HTMLUListElement | null>(null);
  let [checkBtn, SetCheckBtn] = useState<boolean>(false);
  let [showMsg, setShowMsg] = useState<ShowMsgProps>({ show: false, isCorrect: false, Score: 0 });
  console.log(QuestionNumber, IncorrectAnswers, Score, QuestionContent, Hints, correctAnswer, Difficulty, Topic);
  useEffect(() => {
    SetShuffle(RandomizeOptions(IncorrectAnswers, correctAnswer));
  }, [correctAnswer, IncorrectAnswers]);

  console.log(correctAnswer)


  const handleHintClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    SetHint(prevHint => ({
      Hints: prevHint.Hints > 0 ? prevHint.Hints - 1 : 0,
      IsUsed: true
    }));
    let btns: HTMLButtonElement[] = Array.from(optionsRef.current?.querySelectorAll(`button`) || []);
    btns.slice(1).forEach(btn => {
      if (btn.textContent !== correctAnswer) {
        btn.classList.add(`disabled`);
      }
    });
    e.currentTarget.classList.add(`disabled`);
  };

  const HandleOptionsClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    let btns: HTMLButtonElement[] = Array.from(optionsRef.current?.querySelectorAll(`button`) || []);
    btns.forEach((btn: any) => {
      btn.classList.remove(`active`);
    });
    e.currentTarget.classList.toggle(`active`);
    SetCheckBtn(true);
  };

  const handleCheckBtn = () => {
    let btns: HTMLButtonElement[] = Array.from(optionsRef.current?.querySelectorAll(`button`) || []);
    btns.forEach(btn => {
      if (btn.classList.contains(`active`)) {
        if (btn.textContent === correctAnswer) {
          setShowMsg({ show: true, isCorrect: true, Score: (Hint.IsUsed ? 5 : 10) });

        } else {
          setShowMsg({ show: true, isCorrect: false, Score: 0 });
        }
      }
    });
  };

  return (
    <>
      <div className="container bg-warning  p-5 w-75 m-auto text-center text-capitalize text-white rounded-3 position-absolute start-50 top-50 translate-middle">
        <div className="status d-lg-inline-block align-items-center justify-content-between pb-sm-4 d-sm-block">
          <p className='text-dark fs-6 m-0 d-block pb-4'>Score : <span>{Score}</span></p>
          <button onClick={handleHintClick} className="btn-success btn mb-3">
            Hint: <span>{Hint.Hints}</span>
          </button>
        </div>
        <h1 className='fw-bold mb-4 fs-2'>
          Question <span className='text-success'>{QuestionNumber}</span>
        </h1>
        <p className='fs-5 text-dark-emphasis col-sm-12 col-lg'>{decodeHtmlEntities(QuestionContent)}</p>
        <div className="options">
          <ul ref={optionsRef} className='list-unstyled d-flex align-items-center justify-content-center flex-wrap gap-3'>
            {shuffle.map((answer, i) =>
              <li key={i + 1} className="bg-outline-primary col-lg-5 col-md-5 col-sm">
                <button onClick={HandleOptionsClick} className="w-100 btn mw-100 btn-outline-primary ">{decodeHtmlEntities(answer)}</button>
              </li>
            )}
          </ul>
        </div>
        <button onClick={handleCheckBtn} style={{ transition: "0.3s" }} className={`${checkBtn ? `` : `disabled`} btn btn-secondary mt-4 w-50 col-sm-6 col-xs-5`}>
          Check
        </button>
      </div>
      {showMsg.show && <Msg IsCorrectAnswer={showMsg.isCorrect} Score={Score! += Hint.IsUsed ? 5 : 10} QuestionNumber={QuestionNumber++} Hints={Hint.Hints} Difficulty={Difficulty!} Topic={Topic!} />}
    </>
  );
}

export default QuestionStructure;
