import React, { useState } from 'react';

const QuestionnairePage: React.FC = () => {
    const [answers, setAnswers] = useState<{ [questionId: string]: string }>({});

    const handleAnswerChange = (questionId: string, answer: string) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: answer,
        }));
    };

    const handleSubmit = () => {
        // Vous pouvez traiter les réponses ici, par exemple les envoyer à un serveur ou les stocker localement
        console.log(answers);
    };

    return (
        <div>
            <h1>Questionnaire</h1>

            <div>
                <label htmlFor="question1">Question 1:</label>
                <input
                    type="text"
                    id="question1"
                    value={answers['question1'] || ''}
                    onChange={(e) => handleAnswerChange('question1', e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="question2">Question 2:</label>
                <input
                    type="text"
                    id="question2"
                    value={answers['question2'] || ''}
                    onChange={(e) => handleAnswerChange('question2', e.target.value)}
                />
            </div>

            {/* Ajoutez plus de questions ici */}

            <button onClick={handleSubmit}>Soumettre</button>
        </div>
    );
};

export default QuestionnairePage;