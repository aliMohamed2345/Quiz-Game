"use client"
import QuestionStructure from '@/app/components/QuestionStructure'
import { useEffect, useState } from 'react'
import { CategoryId } from '@/app/functions/categoryEnum';
import { useParams, useSearchParams } from 'next/navigation'
import { useDispatch } from 'react-redux';
import { SetDifficulty, SetIsLoading, SetCorrectAnswer, SetTopic, SetScore, SetIncorrectAnswers, SetHints, SetQuestionNumber, SetQuestionContent } from '@/app/redux/Slices/QuestionStructureSlice';
export interface DataProps {
    QuestionContent: string;
    options: string[];
    correct_answers: string,
    incorrect_answers: string[]
}

export let initialContentData: DataProps = {
    QuestionContent: "",
    correct_answers: "",
    incorrect_answers: [],
    options: []
}

function Question() {
    let dispatch = useDispatch();
    // const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<DataProps>(initialContentData);
    let currentPage = useParams().questionId
    const router = useSearchParams();
    const { Difficulty, Topic, Hints, Score } = {
        Difficulty: router.get('Difficulty') || "",
        Topic: router.get('Topic') || "",
        Hints: router.get("Hints") || "",
        Score: router.get("Score") || ""
    };

    function GetTheTopicID(CategoryId: object, Topic: string | null): number {
        for (let [key, value] of Object.entries(CategoryId)) {
            if (key === Topic) return value
        }
        return -1;
    }

    useEffect(() => {
        setTimeout(() => {
            fetch(`${process.env.NEXT_PUBLIC_QUIZ_GAME_API}?amount=1&difficulty=${Difficulty}&type=multiple&category=${GetTheTopicID(CategoryId, Topic)}`)
                .then(res => res.json())
                .then(data => {
                    if (data.results?.length > 0) {
                        const { question, correct_answer, incorrect_answers } = data.results[0];
                        setData({
                            ...initialContentData,
                            QuestionContent: question,
                            correct_answers: correct_answer,
                            incorrect_answers: [...incorrect_answers]
                        });
                    }
                    // setIsLoading(false);
                    dispatch(SetIsLoading(false))
                })
                .catch(error => {
                    console.error('Fetching data failed:', error);
                    dispatch(SetIsLoading(false));
                });
        }, 2000);
    }, [Difficulty, Topic, Hints, currentPage, Score]);
    //dispatching the data to store  
    useEffect(() => {
        dispatch(SetDifficulty(Difficulty))
        dispatch(SetQuestionNumber(+currentPage!))
        dispatch(SetQuestionContent(data.QuestionContent))
        dispatch(SetScore(+Score))
        dispatch(SetTopic(Topic))
        dispatch(SetIncorrectAnswers(data.incorrect_answers))
        dispatch(SetCorrectAnswer(data.correct_answers))
        dispatch(SetHints(+Hints))
    }, [Difficulty, currentPage, Score, Topic, data])
    return (<QuestionStructure />);
}

export default Question;



