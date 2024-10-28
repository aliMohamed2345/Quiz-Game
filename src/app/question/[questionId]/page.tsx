"use client"
import QuestionStructure from '@/app/components/QuestionStructure'
import Loading from '@/app/Loading';
import { useEffect, useState } from 'react'
import { CategoryId } from '@/app/functions/categoryEnum';
import { useParams, useSearchParams } from 'next/navigation'

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
    const [isLoading, setIsLoading] = useState<boolean>(true);
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
            fetch(`https://opentdb.com/api.php?amount=1&difficulty=${Difficulty}&type=multiple&category=${GetTheTopicID(CategoryId, Topic)}`)
                .then(res => res.json())
                .then(data => {
                    if (data.results.length > 0) {
                        const { question, correct_answer, incorrect_answers } = data.results[0];
                        setData({
                            ...initialContentData,
                            QuestionContent: question,
                            correct_answers: correct_answer,
                            incorrect_answers: [...incorrect_answers]
                        });
                    }
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error('Fetching data failed:', error);
                    setIsLoading(false);
                });
        }, 2000);
    }, [Difficulty, Topic, Hints, currentPage, Score]);

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <QuestionStructure
                    QuestionNumber={+currentPage}
                    Score={+Score}
                    Hints={+Hints}
                    Topic={Topic}
                    Difficulty={Difficulty}
                    QuestionContent={data.QuestionContent}
                    correctAnswer={data.correct_answers}
                    IncorrectAnswers={data.incorrect_answers}
                />
            )}
        </>
    );
}

export default Question;



