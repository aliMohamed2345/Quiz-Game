
export const CategoryId: object = {
    "GeneralKnowledge": 9,
    "Entertainment: Books": 10,
    "Entertainment: Film": 11,
    "Entertainment: Music": 12,
    "Entertainment: Musicals & Theatres": 13,
    "Entertainment: Television": 14,
    "Entertainment: Video Games": 15,
    "Entertainment: Bored Games": 16,
    "Science & Nature": 17,
    "Science: Computers": 18,
    "Science: Mathematics": 19,
    "Sports": 21,
    "Geography": 22,
    "History": 23,
    "Politics": 24,
    "Celebrities": 26,
    "Animals": 27,
    "Vehicles": 28,
    "Entertainment: Comics": 29,
    "Entertainment: Japanese Anime & Manga": 31,
    "Entertainment: Cartoon & Animations": 32
};

export function EnumToArray(Obj: Object): string[] {
    let Values: string[] = [];
    let AndSign = "And";
    
    for (let E of Object.keys(Obj)) {
        if (E.includes('&amp')) {
            E = E.replace('&amp;', AndSign);
        }
        if (isNaN(+E)) Values.push(E);
    }
    return Values;
}