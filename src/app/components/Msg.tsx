'use client';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
function Msg() {
    let { Score, Hints, QuestionNumber, IsCorrectAnswer } = useSelector((state: RootState) => state.QuestionStructure)
    const nextQuestion = IsCorrectAnswer ? QuestionNumber + 1 : QuestionNumber;

    let { Difficulty, Topic } = useSelector((state: RootState) => state.QuestionStructure)
    return (
        <>
            {IsCorrectAnswer ? (
                <>
                    <div className="overlay"></div>
                    <div className="position-absolute top-50 start-50 translate-middle container bg-dark pb-5 p-3 w-50 col-12 text-center rounded-4">
                        <h1 className=" col-lg-12 fw-bold text-success">
                            Your Answer is Correct,
                        </h1>
                        <p className=" text-white m-4 mb-5 ">Score: {Score}</p>
                        <div className=" gap-2 ">
                            <Link href={{ pathname: `/`, query: { Score: Score } }} className="rounded-pill text-white text-decoration-none  p-3 bg-danger">Go To Home</Link>
                            <Link href={{
                                pathname: `/question/${nextQuestion}`,
                                query: { Difficulty: Difficulty, Topic: Topic, Hints: Hints, Score: Score }
                            }} className="rounded-pill text-white text-decoration-none  p-3 bg-success ms-5">Next Question</Link>
                        </div>
                    </div>
                </>
            ) : (<>
                <div className="overlay"></div>
                <div className="position-absolute top-50 start-50 translate-middle container bg-dark pb-5 p-3 w-50 col-12 text-center rounded-4">
                    <h1 className=" col-lg-12 fw-bold text-danger">
                        Your Answer is wrong, please try again
                    </h1>
                    <p className=" text-white m-4 mb-5 ">Score: {Score}</p>
                    <Link href={{ pathname: `/`, query: { Score: Score } }} className="rounded-pill text-white text-decoration-none  p-3 bg-danger">Go To Home</Link>
                </div>
            </>
            )
            }
        </>
    );
}
export default Msg