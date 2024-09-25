import { useState } from 'react'

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {

  if (props.good === 0 && props.bad === 0 && props.neutral === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={props.good + props.neutral + props.bad} />
        <StatisticLine text="average" value={(props.good + props.neutral + props.bad) / (3)} />  
        <StatisticLine text="positive" value={((props.good / (props.good + props.neutral + props.bad)) * 100) + ' %'} /> 
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={() => setGood(good + 1)}> good </button>
      <button onClick={() => setNeutral(neutral + 1)}> neutral  </button>
      <button onClick={() => setBad(bad + 1)}> bad </button>

      <h1>statistacs</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App