import { useState,useEffect } from 'react'
import axios from 'axios'

const FilterForm = ({Filter,setFilter}) => {
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }
  return(
    <div>
      Filter
      <input value={Filter} onChange={handleFilterChange} ></input>
    </div>
  )
}

const PersonForm = ({newName,newPhone,setNewName,setNewPhone,persons,setPersons}) => {
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handlePhoneChange = (event) => {
    console.log(event.target.value)
    setNewPhone(event.target.value)
  }
  
  const addPerson = (event) => {
    event.preventDefault()
    const personObject={
      id: persons.length+1,
      name: newName,
      number: newPhone
    }
    persons.find((person)=>person.name===newName)?alert(`${newName} is already added to phonebook`):setPersons(persons.concat(personObject))
  }
  return(      
  <form onSubmit={addPerson}>
    <div>Name: <input value={newName} onChange={handleNameChange}/> </div>
    
    <div>number: <input value={newPhone} onChange={handlePhoneChange} /></div>

    <button type="submit">add</button>
  </form>   
  )

}

const Persons = ({persons,Filter}) =>{
  return (
    <ul>
    {persons.map(person => person.name.toLowerCase().includes(Filter)?<li key={person.id}>{person.name} {person.number}</li>:null)}
  </ul>    
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')
  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas', number: '040-123456', id: 1 },
  //   { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  //   { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  // ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [Filter, setFilter] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm Filter={Filter} setFilter={setFilter}/>
      <h3>Add a new</h3>
      <PersonForm newName={newName} newPhone={newPhone} setNewName={setNewName} setNewPhone={setNewPhone} persons={persons} setPersons={setPersons}/>
      <h2>Numbers</h2>
      <Persons persons={persons} Filter={Filter}/>
      </div>
  )
}

export default App