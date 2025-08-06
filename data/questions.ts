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
        question: "Question 1 goes here",
        answers: [
            { answer: "Item 1", points: 18 },
            { answer: "Item 2", points: 12 },
            { answer: "Item 3", points: 10 },
            { answer: "Item 4", points: 8 },
            { answer: "Item 5", points: 4 },
            { answer: "Item 6", points: 2 }
        ]
    },
    {
        id: 2,
        question: "Question 2 goes here",
        answers: [
            { answer: "Item 1", points: 18 },
            { answer: "Item 2", points: 12 },
            { answer: "Item 3", points: 10 },
            { answer: "Item 4", points: 8 },
            { answer: "Item 5", points: 4 },
            { answer: "Item 6", points: 2 }
        ]
    },
    {
        id: 3,
        question: "Question 3 goes here",
        answers: [
            { answer: "Item 1", points: 18 },
            { answer: "Item 2", points: 12 },
            { answer: "Item 3", points: 10 },
            { answer: "Item 4", points: 8 },
            { answer: "Item 5", points: 4 },
            { answer: "Item 6", points: 2 }
        ]
    },
    {
        id: 4,
        question: "Question 4 goes here",
        answers: [
            { answer: "Item 1", points: 18 },
            { answer: "Item 2", points: 12 },
            { answer: "Item 3", points: 10 },
            { answer: "Item 4", points: 8 },
            { answer: "Item 5", points: 4 },
            { answer: "Item 6", points: 2 }
        ]
    },
    {
        id: 5,
        question: "Question 5 goes here",
        answers: [
            { answer: "Item 1", points: 18 },
            { answer: "Item 2", points: 12 },
            { answer: "Item 3", points: 10 },
            { answer: "Item 4", points: 8 },
            { answer: "Item 5", points: 4 },
            { answer: "Item 6", points: 2 }
        ]
    },


]