'use client';
import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

export default function AnswerBoard({ answers }) {

    
    const [revealed, setRevealed] = useState(() => answers.map(() => false));

    const toggle = useCallback((i) => {
        setRevealed((prev) => {
            const next = [...prev];
            next[i] = !next[i]; // Flip state of index
            return next;
        });
    }, []);

    return (
        <div className="grid grid-cols-2 grid-rows-5 gap-8 items-center justify-center w-full h-[50%] mt-8 py-8 px-64 gap-x-22">
            {answers.map(({ answer, points }, i) => (
                <div key={i} className="item-container w-full h-12 flex flex-row items-center justify-center gap-6">

                    {/* Diamond button */}
                    <button
                        type="button"
                        onClick={() => toggle(i)}
                        className="relative inline-block group focus:outline-none hover:cursor-pointer"
                        aria-pressed={revealed[i]}
                        aria-label={revealed[i] ? 'Hide answer' : 'Reveal answer'}
                    >
                        <div
                            className={`diamond-outline absolute w-4 h-4 rotate-45 linear-blue-outline mix-blend-plus-lighter transition-all duration-300 ease-in-out
                          ${revealed[i] ? 'opacity-100 scale-[1.7]' : 'opacity-0 scale-100'}`}
                        />
                        <div className="relative z-10 w-4 h-4 rotate-45 linear-blue mix-blend-plus-lighter flex items-center justify-center">
                            <div className="w-2 h-2 linear-blue mix-blend-plus-lighter" />
                        </div>
                    </button>

                    {/* Stacked layers: "?" fades out, real content fades/slides in */}
                    <div className="question-container relative overflow-hidden flex-1 h-full linear-blue mix-blend-plus-lighter rounded-2xl flex items-center pl-6">

                        <div className="score-layer isolate h-full w-18 linear-blue mix-blend-screen rounded-2xl absolute right-0 z-0" />
                        
                        {/* Placeholder Container */}
                        <div className={`absolute inset-0 flex items-center pl-6 transition-all duration-300 ease-out
                          ${revealed[i] ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'}`}
                        >
                            <p
                                className="text-lg filter drop-shadow-lg text-outline"
                                style={{
                                    textShadow: [
                                        '-1px -1px 0 #000',
                                        ' 1px -1px 0 #000',
                                        '-1px  1px 0 #000',
                                        ' 1px  1px 0 #000',
                                    ].join(','),
                                }}
                            >
                                ?
                            </p>

                            <div className="ml-auto w-18 flex items-center justify-center ">
                                <img src="/assets/scores/qm.png" alt="?" className="h-4" onError={(e) => (e.currentTarget.style.display = 'none')} />
                            </div>
                        </div>

                        {/* Real Content Container */}
                        <div className={`absolute inset-0 flex items-center pl-6 transition-all duration-300 ease-out
                          ${revealed[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                        >
                            <p className="uppercase text-lg filter drop-shadow-lg text-outline tracking-wider"
                                style={{
                                    textShadow: [
                                        '-1px -1px 0 #000',
                                        ' 1px -1px 0 #000',
                                        '-1px  1px 0 #000',
                                        ' 1px  1px 0 #000',
                                    ].join(','),
                                }}
                            >
                                {answer}
                            </p>

                            
                            <div className="ml-auto flex items-center z-10 w-18 justify-center">
                                <img
                                    src={`/assets/scores/${points}.png`}
                                    alt={`${points} points`}
                                    className="h-4"
                                    onError={(e) => (e.currentTarget.outerHTML = `<span class="text-white font-semibold">${points}</span>`)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

AnswerBoard.propTypes = {
    answers: PropTypes.arrayOf(
        PropTypes.shape({
            answer: PropTypes.string.isRequired,
            points: PropTypes.number.isRequired,
        })
    ).isRequired,
};
