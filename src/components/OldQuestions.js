import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
    },
    listSection: {
      backgroundColor: 'inherit',
    },
    ul: {
      backgroundColor: 'inherit',
      padding: 0,
    },
  }));

const fetchQuestions = () => {
    const qUrl = ['https://k6w7mqldl2.execute-api.us-east-1.amazonaws.com/prod?type=Q&set-num=1']
    const questions = {}
    const letters = ["A", "B", "C", "D"]
    const qNums = [1, 2, 3, 4, 5]

    qNums.forEach(n => questions[n] = {})
    qNums.forEach(n => letters.forEach(l => questions[n][l] = {}))

    Promise.all(
        qUrl.map(url =>
        fetch(url)
            .then(response => response.json())
            .catch(error => alert("oopsie"))
        )
    ).then(data => {
        const payload = data[0]['Items'];
        // eslint-disable-next-line no-sequences
        payload.map(q => questions[q.Position]["Text"] = q["Text"]);
        letters.forEach(letter =>
            payload.map(q => questions[q.Position][letter] = q[letter] ));
        console.log(questions);
        return questions
    });
};    

const fetchAnswerPercents = () => {
    const aUrl = ['https://k6w7mqldl2.execute-api.us-east-1.amazonaws.com/prod?type=A&set-num=1']
    const percents = {}
    const letters = ["A", "B", "C", "D"]
    const qNums = [1, 2, 3, 4, 5]

    qNums.forEach(n => percents[n] = {})
    qNums.forEach(n => letters.forEach(l => percents[n][l] = {}))

    Promise.all(
        aUrl.map(url =>
        fetch(url)
            .then(response => response.json())
            .catch(error => alert("oopsie"))
        )
    ).then(data => {
        const payload = data[0]['Items'];
        // eslint-disable-next-line no-sequences
        letters.forEach(letter =>
            payload.map(q => percents[q.Position][letter] = ((q["Total"] === 0 ? 0 : q[letter]/q["Total"]) * 100) + "%" ));
        console.log(percents);
        return percents
    });
}; 

export default function QuestionReviewList() {
    const classes = useStyles();

    const percs = fetchAnswerPercents();
    const questanswr = fetchQuestions();

    return (
        <List className={classes.root} subheader={<li />}>
        {[0, 1, 2, 3, 4].map(sectionId => (
        <li key={`section-${sectionId}`} className={classes.listSection}>
            <ul className={classes.ul}>
            <ListSubheader>{`I'm sticky ${sectionId}`}</ListSubheader>
            {[0, 1, 2].map(item => (
                <ListItem key={`item-${sectionId}-${item}`}>
                <ListItemText primary={`Item ${item}`} />
                </ListItem>
            ))}
            </ul>
        </li>
        ))}
    </List>
    );
}