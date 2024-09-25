const Header = (props) =>{
  return(
    <h1><div>Welcome to {props.course.name} course by University of Helsinki</div></h1>
  )
}

const Content  = (props) => {
  let array=props.parts
  const broken=array.map(value=> (<li key={value.name}>{value.name} contains {value.exercises} exercises. </li>))
  return (
    <ul>{broken}</ul>
    )
}

const Total = (props)=>{
  var x=0
  props.total.forEach(element => {
    x+=element.exercises
  });
  return(
    <p>The course will have a total of {x} exercises</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course}/>
      <Content parts={course.parts} />
      <Total total={course.parts} /> 
    </div>
  )
}

export default App