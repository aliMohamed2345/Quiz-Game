"use client";
import { CategoryId, EnumToArray } from '../functions/categoryEnum';
import DropDownMenu from './DropDownMenu';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import 'bootstrap/js/dist/dropdown'


interface DataOptionsTypes {
    Difficulty: string;
    Topic: string;
}

export const initialDataOptions: DataOptionsTypes = {
    Difficulty: "",
    Topic: "",
};

function Main() {
    const [Data, SetData] = useState<DataOptionsTypes>(initialDataOptions);
    const [HighScore, setHighScore] = useState(0);
    const HintsNumber = 3;

    const router = useSearchParams();
    const Score = Number(router.get("Score")) || 0; // Fallback to 0 if Score is null or invalid

    useEffect(() => {
        // Retrieve high score from localStorage on component mount
        const storedHighScore = Number(localStorage.getItem("HighScore")) || 0;
        setHighScore(storedHighScore);
        // Update high score in localStorage if the current Score is higher
        if (Score > storedHighScore) {
            localStorage.setItem("HighScore", Score.toString());
            setHighScore(Score); // Update state to reflect new high score
        }
    }, [Score]);

    const queryObject: { [key: string]: string | number } = {
        Difficulty: Data.Difficulty,
        Topic: Data.Topic,
        Hints: HintsNumber,
        Score: 0,
    };

    const DataFromTopicDropDown = (topic: string) => {
        SetData(prevData => ({ ...prevData, Topic: topic }));
    };

    const DataFromDifficultyDropDown = (difficulty: string) => {
        SetData(prevData => ({ ...prevData, Difficulty: difficulty }));
    };

    return (
        <div className="position-absolute start-50 top-50 translate-middle text-center container rounded-4 bg-info-subtle p-4 col-md-6 col-sm-6">
            <h2 className="text-white text-center ">Quiz Game</h2>
            <div>
                <p className='text-centralize pt-2'>Select the difficulty</p>
                <DropDownMenu
                    InitialDropDownValue='Difficulty'
                    Theme="secondary"
                    DropDownOptions={["easy", "medium", "hard"]}
                    onChange={DataFromDifficultyDropDown}
                />
                <p className='pt-3'>Select the topic</p>
                <DropDownMenu
                    InitialDropDownValue='Topic'
                    Theme="secondary"
                    DropDownOptions={EnumToArray(CategoryId)}
                    onChange={DataFromTopicDropDown}
                />
                <p className="text-write pt-3">High Score: {HighScore}</p>
                <Link
                    href={{
                        pathname: `/question/${1}`,
                        query: queryObject
                    }}
                    className={`btn btn-primary p-2   ${!Data.Difficulty || !Data.Topic ? `disabled` : ``}`}
                >
                    Start
                </Link>
            </div>
        </div >
    );
}

export default Main;
