import React from 'react';
import WrongAnswer from './WrongAnswer.js'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const questions = [
    {
        question: 'How many tons of laundry are thrown away every minute?',
        answers: ['5 Million', '7.5 Million', '10.5 Million', '2 Million'],
        correct: 1,
    },
    {
        question: 'How many tons of laundry are thrown away every minute?',
        answers: ['5 Million', '7.5 Million', '10.5 Million', '2 Million'],
        correct: 1,
    },
    {
        question: 'How many tons of laundry are thrown away every minute?',
        answers: ['5 Million', '7.5 Million', '10.5 Million', '2 Million'],
        correct: 1,
    },
    {
        question: 'How many tons of laundry are thrown away every minute?',
        answers: ['5 Million', '7.5 Million', '10.5 Million', '2 Million'],
        correct: 1,
    },
    {
        question: 'How many tons of laundry are thrown away every minute?',
        answers: ['5 Million', '7.5 Million', '10.5 Million', '2 Million'],
        correct: 1,
    },
]

export default function QuestionAnswers(props) {
  const classes = useStyles();
  const question = questions[props['num']];
  const [isCorrect, setIsCorrect] = React.useState(null);

    const onClick = (clickedIsCorrect, num) => {
        if(clickedIsCorrect) {
        } else {
        }
    }
        return (
            <div className={classes.root}>
            <h1>{question['question']}</h1>
            <div>
            <Button variant="outlined" color="primary" size="large" onClick={onClick(0==question['correct'], 0)}>
            {question['answers'][0]}
            </Button>
            </div>
            <div>
            <Button variant="outlined" color="primary" size="large" onClick={onClick(1==question['correct'], 1)}>
            {question['answers'][1]}
            </Button>
            </div>
            <div>
            <Button variant="outlined" color="primary" size="large" onClick={onClick(2==question['correct'], 2)}>
            {question['answers'][2]}
            </Button>
            </div>
            <div>
            <Button variant="outlined" color="primary" size="large" onClick={onClick(3==question['correct'],)}>
            {question['answers'][3]}
            </Button>
            </div>
            </div>
        );
}