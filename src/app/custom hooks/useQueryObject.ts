// hooks/useQueryObject.js
import { useState } from 'react';

export const useQueryObject = () => {
    const [queryObject, setQueryObject] = useState({
        Difficulty: "",
        Topic: "",
    });

    return {
        queryObject,
        setQueryObject
    };
};
