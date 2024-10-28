"use client";
import { CategoryId, EnumToArray } from '../functions/categoryEnum';
import * as React from 'react';
import { useState } from 'react';
import 'bootstrap/js/dist/dropdown'

import DropDownMenu from './DropDownMenu';
import Link from 'next/link';

export let questionCounter = 1;
export let HighScore = 0;

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
    const HintsNumber = 3
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


    console.log(Data);

    return (
        <div className=" position-absolute start-50 top-50 translate-middle text-center container rounded-4 bg-info-subtle p-4 col-md-6 col-sm-6">
            <h2 className="text-white text-center fs-2">Quiz Game</h2>
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
                    className='btn btn-primary p-2 fs-4'
                >
                    Start
                </Link>
            </div>
        </div>
    );
}

export default Main; 