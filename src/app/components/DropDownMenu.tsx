"use client";
import 'bootstrap/js/dist/dropdown'
import { useState } from 'react';

interface DropDownProps {
    InitialDropDownValue: string;
    Theme?: "primary" | "secondary" | "territory";
    DropDownOptions: string[];
    onChange: (value: string) => void;
}

const DropDownMenu = ({ InitialDropDownValue, Theme, DropDownOptions, onChange }: DropDownProps) => {

    let [dropdownVal, setDropDownVal] = useState<string>(InitialDropDownValue)

    const handleDropdownItem = (value: string) => {
        setDropDownVal(value);
        onChange(value);
    }

    return (
        <>
            <div className="dropdown open">
                <button
                    className={`btn btn-${Theme} dropdown-toggle`}
                    type="button"
                    id="triggerId"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    {dropdownVal}
                </button>
                <div className="dropdown-menu  " aria-labelledby="triggerId">
                    <ul className=' p-0'>
                        {DropDownOptions.map((Option, i) => (
                            <li className='p-0 col-6 col-lg-12 col-sm-12 col-md-12' key={i} >
                                <button onClick={() => handleDropdownItem(Option)} className='dropdown-item text-center p-0 ' title={dropdownVal} type='button'>{Option}</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}


export default DropDownMenu;

