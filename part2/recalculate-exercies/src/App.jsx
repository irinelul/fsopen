const Header = ({ courses }) => (
  <div>
    <ul>
      {courses.map(course => (
        <li key={course.id}>
          <h3>{course.name}</h3>
          <ul>
            {course.parts.map(part => (
              <li key={part.id}>
                {part.name} {part.exercises} exercises
              </li>
            ))}
          </ul>
          <p>Total exercises for {course.name}: {course.parts.reduce((sum, part) => sum + part.exercises, 0)}</p>
        </li>
      ))}
    </ul>
  </div>
);

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  return (
    <div>
      <Header courses={courses} />
   </div>
  )
}
export default App