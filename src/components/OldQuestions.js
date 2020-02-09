import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import PieChart from 'react-minimal-pie-chart';

class QuestionReviewList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {percentages: null, questionAnswers: null}
    }

    renderLabel(lp) {
        const index = lp.dataIndex
        if (lp.data[index].value != 0) {
            return lp.data[index].title + ": " + lp.data[index].value
        }
        return ""
    }

    renderPie(percents) {
        return (
            <PieChart
                animate={true}
                animationDuration={500}
                animationEasing="ease-out"
                cx={0}
                cy={50}
                data={[
                    { title: 'A', value: percents['A'], color: '#E38627' },
                    { title: 'B', value: percents['B'], color: '#C13C37' },
                    { title: 'C', value: percents['C'], color: '#6A2135' },
                    { title: 'D', value: percents['D'], color: '#000000'} 
                ]}
                label={this.renderLabel}
                labelPosition={112}
                labelStyle={{
                fontFamily: 'sans-serif',
                fontSize: '15px'
                }}
                lengthAngle={360}
                lineWidth={100}
                onClick={undefined}
                onMouseOut={undefined}
                onMouseOver={undefined}
                paddingAngle={0}
                radius={50}
                rounded={false}
                startAngle={0}
                style={{
                    height: '100px'
                }}
                viewBoxSize={[
                    150,
                    150
                ]}
            />
        )
    }

    renderQuestions() {
        const classes = styles
        console.log("renderQuestions")
        console.log(typeof(this.state.percentages))
        console.log(this.state)
        return (
            <List className={classes.root} subheader={<li />}>
            {Object.keys(this.state.percentages).map(num => (
            <li key={`Question${num}: ${this.state.percentages[num]}`} className={classes.listSection}>
                <ul className={classes.ul}>
                <ListSubheader>{`Question ${num}: ${this.state.questionAnswers[num]["Text"]}`}</ListSubheader>
                {this.renderPie(this.state.percentages[num])}
                    <div>{this.state.questionAnswers[num].Text}</div>
                    <div>Correct Answer: {this.state.questionAnswers[num].Correct}</div>
                    <div>Explanation: {this.state.questionAnswers[num].Explanation}</div>
                    <div>Total Respondants: {this.state.percentages[num].Total}</div>            
                </ul>
            </li>
            ))}
        </List>
        );
    }

    render() {
        console.log(this.state)
        return this.state.percentages && this.state.questionAnswers ? this.renderQuestions() : (
            <span>Loading previous questions...</span>
          )
    }

    componentDidMount() {
        this.fetchAnswerPercents()
        this.fetchQuestions()
    }

    fetchQuestions = () => {
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
            payload.map(q => questions[q.Position]["Explanation"] = q["Explanation"]);
            payload.map(q => questions[q.Position]["Correct"] = q["Correct"]);

            letters.forEach(letter =>
                payload.map(q => questions[q.Position][letter] = q[letter] ));
            console.log(questions);
            console.log(payload)
            this.setState({questionAnswers: questions})
        });
    };    
    
    fetchAnswerPercents = () => {
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
                payload.map(q => percents[q.Position][letter] =  q[letter]));
            payload.map(q => percents[q.Position]["Total"] = q["Total"])
            
            console.log(payload);
            this.setState({percentages : percents})
        });
    }; 
}

const styles = {
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 48,
      padding: '0 30px',
    },
  };

export default QuestionReviewList;