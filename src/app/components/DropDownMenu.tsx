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
        console.log(value)
        setDropDownVal(value);
        onChange(value);
    }
    console.log(dropdownVal)


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
                            <li className='p-0' key={i}>
                                <button onClick={() => handleDropdownItem(Option)} className='dropdown-item text-center p-0' title={dropdownVal} type='button'>{Option}</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </>
    )
}


export default DropDownMenu;





//old code
// interface DropDownProps {
//     InitialDropDownValue: string;
//     Theme?: string;
//     DropDownOptions: string[];
//     onChange: (value: string) => void;
// }

// function DropDownMenu({ InitialDropDownValue, Theme, DropDownOptions, onChange }: DropDownProps) {
//     const [menuOpen, setMenuOpen] = useState<boolean>(false);
//     const [selectedValue, setSelectedValue] = useState<string>(InitialDropDownValue);

//     const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//         e.preventDefault();
//         setMenuOpen(!menuOpen);
//     };

//     const handleItemClick = (value: string) => {
//         setSelectedValue(value);
//         setMenuOpen(false);
//         onChange(value);
//     };

//     return (
//         <>

//             <div className="DropDownMenu container position-relative">
//                 <button
//                     className={`${Theme} w-25 ${menuOpen ? `rounded-top-3` : `rounded-1`} btn text-white  dropDownBtn`}
//                     onClick={handleClick}
//                 >
//                     {selectedValue}
//                 </button>
//                 {menuOpen && (
//                     <div className={`DropDownOptions   rounded-bottom-3  ${Theme}`} >
//                         <ul className={`list-unstyled ${menuOpen ? `opacity-1` : `opacity-0`}`} style={{ transition: "0.3s;" }}>
//                             {DropDownOptions.map((option, i) => (
//                                 <li key={i} onClick={() => handleItemClick(option)}>
//                                     <a href="#" className='text-decoration-none text-white'>{option}</a>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 )}
//             </div>
//         </>
//     );
// }

