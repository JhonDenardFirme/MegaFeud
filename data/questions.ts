export interface Answer {
    answer: string;
    points: number;
}

export interface Question {
    id: number;
    question: string;
    answers: Answer[];
}

export const MegaQuestions: Question[] = [
        {
        id: 1,
        question: "What are the Top Words for SMDC?",
        answers: [
            { answer: "home", points: 72 },
            { answer: "residence", points: 67 },
            { answer: "life", points: 67 },
            { answer: "community", points: 45 },
            { answer: "city", points: 36 },
            { answer: "experience", points: 27 },
            { answer: "step", points: 26 },
            { answer: "smdcthegoodguys", points: 25 },
            { answer: "designed", points: 23 },
            { answer: "move", points: 23 }
        ]
    },

    {
        id: 2,
        question: "What are the Top Words for Robinsons Land?",
        answers: [
            { answer: "hotel", points: 53 },
            { answer: "mall", points: 48 },
            { answer: "rlcbuildingbetter", points: 37 },
            { answer: "life", points: 31 },
            { answer: "filipino", points: 28 },
            { answer: "year", points: 27 },
            { answer: "estate", points: 27 },
            { answer: "land", points: 27 },
            { answer: "resort", points: 26 },
            { answer: "business", points: 26 }
        ]
    },


    {
        id: 3,
        question: "What are the Top Words for Ayala Land?",
        answers: [
            { answer: "community", points: 37 },
            { answer: "makati", points: 36 },
            { answer: "life", points: 35 },
            { answer: "estate", points: 34 },
            { answer: "philippine", points: 31 },
            { answer: "together", points: 24 },
            { answer: "space", points: 23 },
            { answer: "south", points: 22 },
            { answer: "urban", points: 21 },
            { answer: "development", points: 21 }
        ]
    },

    {
        id: 4,
        question: "What are the Top Words for Megaworld?",
        answers: [
            { answer: "township", points: 37 },
            { answer: "new", points: 33 },
            { answer: "megaworldtownships", points: 24 },
            { answer: "country", points: 22 },
            { answer: "first", points: 20 },
            { answer: "community", points: 18 },
            { answer: "iloilo", points: 18 },
            { answer: "philippine", points: 16 },
            { answer: "global", points: 15 },
            { answer: "mactan", points: 15 }
        ]
    },
];
