import { useState,useEffect } from 'react'
import noteService from './services/notes'

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

const PersonForm = ({newName,newPhone,setNewName,setNewPhone,persons,setPersons, message, setMessage}) => {
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }
  const addPerson = (event) => {
    event.preventDefault()
    const personObject={
      name: newName,
      number: newPhone
    }
    const foundPerson = persons.find((person)=>person.name===newName);

    if(foundPerson){
        console.log(foundPerson)
        if(window.confirm('Person already exists. Update phone number?')) {
            noteService.update(foundPerson.id, personObject)
                .then((updatedPerson) => {
                    setPersons(updatedPerson);
                    setNewName('');
                    setNewPhone('');
                    setMessage(`Updated ${foundPerson.name} with old Phone number ${foundPerson.number} to ${personObject.number}`);
                    setTimeout(() => {          setMessage(null)        }, 5000)
                })
        }
    }
    else{
        noteService.create(personObject).then((returnedPerson)=>{
            setPersons(persons.concat(returnedPerson));setNewName('');setNewPhone('');
            setMessage(`Added ${personObject.name} with Phone number ${personObject.number}`)
            setTimeout(() => {          setMessage(null)        }, 5000)
        })
    }
  }

  return(
  <form onSubmit={addPerson}>
    <div>Name: <input value={newName} onChange={handleNameChange}/> </div>
    <div>number: <input value={newPhone} onChange={handlePhoneChange} /></div>
    <button type="submit">add</button>
  </form>

  )

}
const handleDelete = (id,name,setPersons,setMessage) => {
    if(window.confirm(`Are you sure you want to delete ${name}?`)){
  noteService.deletion(id)
      .then(updatedPersons => {
        console.log(updatedPersons);
        setPersons(updatedPersons);
          setMessage(`Deleted ${name}`);
          setTimeout(() => {          setMessage(null)        }, 5000)
      })
}};


const Footer = () => {
    const footerStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16
    }
    return (
        <div style={footerStyle}>
            <br />
            <em>Note app, Department of Computer Science, University of Helsinki 2024</em>
        </div>
    )
}

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className='success'>
            {message}
        </div>
    )
}

const Persons = ({persons,Filter,setPersons,setMessage}) =>{
  return (
    <ul>
    {persons.map(person => person.name.toLowerCase().includes(Filter) ?
    <li key={person.id} className={'persons'}>
      {person.name} {person.number} - <button onClick={() => handleDelete(person.id, person.name,setPersons,setMessage)}>Delete</button>
    </li> :
        null)}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [message, setMessage] = useState(null)
  useEffect(() => {
    noteService
        .getAll()
        .then(initialNotes => {
          setPersons(initialNotes)})
  }, [])

  console.log('render', persons.length, 'persons')
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [Filter, setFilter] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <FilterForm Filter={Filter} setFilter={setFilter}/>
      <h3>Add a new</h3>
      <PersonForm newName={newName} newPhone={newPhone} setNewName={setNewName} setNewPhone={setNewPhone}
                  persons={persons} setPersons={setPersons} setMessage={setMessage} message={message} />
      <h2>Numbers</h2>
      <Persons persons={persons} Filter={Filter} setPersons={setPersons}  setMessage={setMessage}/>
        <Footer />
      </div>
  )
}

export default App