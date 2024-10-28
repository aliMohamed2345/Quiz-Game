'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { questionCounter } from './Main';
import { initialContentData } from '../question/[questionId]/page';
import { CategoryId } from '../functions/categoryEnum';
import {  useRouter } from 'next/router';

interface MsgProps {
    IsCorrectAnswer: boolean;
    Score: number;
    Hints: number;
    Difficulty: string;
    Topic: string;
    QuestionNumber: number;
}

function GetTheTopicID(CategoryId: object, Topic: string | null): number {
    for (let [key, value] of Object.entries(CategoryId)) {
        if (key === Topic) return value;
    }
    return -1;
}


export function Msg({ IsCorrectAnswer, Score, Hints, Difficulty, Topic, QuestionNumber, }: MsgProps) {
    const nextQuestion = IsCorrectAnswer ? QuestionNumber + 1 : QuestionNumber;
    console.log(IsCorrectAnswer, Score, Hints, Difficulty, Topic, nextQuestion);
    const [data, SetData] = useState(initialContentData);
    useEffect(() => {
        setTimeout(() => {
            fetch(`https://opentdb.com/api.php?amount=1&difficulty=${Difficulty}&type=multiple&category=${GetTheTopicID(CategoryId, Topic)}`)
                .then(res => res.json())
                .then(data => {
                    if (data.results.length > 0) {
                        const { question, correct_answer, incorrect_answers } = data.results[0];
                        SetData({
                            ...initialContentData,
                            QuestionContent: question,
                            correct_answers: correct_answer,
                            incorrect_answers: incorrect_answers,
                        });
                    }
                })
                .catch(error => {
                    console.error('Fetching data failed:', error);
                });
        }, 2000);
    }, [Difficulty, Topic, Hints, nextQuestion, Score]);

    // Prepare the query object
    // const Query = {
    // QuestionContent: data.QuestionContent,
    // QuestionNumber: QuestionNumber,
    // Hints: Hints,
    // correctAnswer: data.correct_answers,
    // IncorrectAnswers: d/ata.incorrect_answers,
    // Difficulty: Difficulty,
    // Topic: Topic,
    // };
    // const handleNextQuestion = (e:any) => {
    //     e.preventDefault();
    //     router.reload(); // Refresh the current page
    //     router.push({
    //         pathname: `/question/${nextQuestion}`,
    //         query: { Difficulty, Topic, Hints, Score },
    //     }); // Then navigate to the next question
    // };
    return (
        <>
            {IsCorrectAnswer ? (
                <>
                    <div className="overlay"></div>
                    <div className="position-absolute top-50 start-50 translate-middle container bg-dark pb-5 p-3 w-50 col-12 text-center rounded-4">
                        <h1 className="fs-5 col-lg-12 fw-bold text-success">
                            Your Answer is Correct,
                        </h1>
                        <p className="fs-5 text-white m-4 mb-5 fs-sm-6">Score: {Score}</p>
                        <div className=" gap-2 ">
                            <Link href="/" className="rounded-pill text-white text-decoration-none  p-3 bg-danger   ">Go To Home</Link>
                            {/* <Link href={{
                                pathname: `/question/${nextQuestion}`,
                                query: { Difficulty: Difficulty, Topic: Topic, Hints: Hints, Score: Score }
                            }} className="rounded-pill text-white text-decoration-none  p-3 bg-success ms-5">Next Question</Link> */}
                            <a
                                href={`/question/${nextQuestion}?Difficulty=${Difficulty}&Topic=${Topic}&Hints=${Hints}&Score=${Score}`}
                                className="rounded-pill text-white text-decoration-none p-3 bg-success ms-5"
                                // onClick={(e) => handleNextQuestion(e)}
                            >
                                Next Question
                            </a>
                        </div>
                    </div>
                </>
            ) : (<>
                <div className="overlay"></div>
                <div className="position-absolute top-50 start-50 translate-middle container bg-dark pb-5 p-3 w-50 col-12 text-center rounded-4">
                    <h1 className="fs-5 col-lg-12 fw-bold text-danger">
                        Your Answer is wrong, please try again
                    </h1>
                    <p className="fs-5 text-white m-4 mb-5 fs-sm-6">Score: {Score}</p>
                    <Link href="/" className="rounded-pill text-white text-decoration-none col-10 p-3 bg-danger">Go To Home</Link>
                </div>
            </>
            )}
        </>
    );
}
