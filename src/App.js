import logo from './logo.svg';
import './App.css';
import contacts from "./contacts.json"
import { useState } from 'react';

const Contacts = contacts.slice(0,5)
console.log(Contacts)


function App() {
  const [currentContacts, setCurrentContacts] = useState(Contacts)

  const cardStyles = {
    backgroundColor: "lightgreen",
    margin: "20px",
    padding: "40px",
    borderRadius: "10px",
    display: "flex",
    width: "20rem",
    justifyContent: "space-between"
  }
  const containerCards = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    
  }




  const addContact = () => {
    console.log("adding contact")
  
  if(currentContacts.length === contacts.length){
    return;
  }
  
  const randomIndex = Math.floor(Math.random()*contacts.length)
  const newContacts = [...currentContacts];
  let newContactId = contacts[randomIndex].id 
  let isContactRepeated = false;


  newContacts.forEach((eachContact) => {
    if(newContactId === eachContact.id){
      isContactRepeated = true;
    }

  })
    
  if(isContactRepeated===true){
    addContact()
    return;
  }

  

  newContacts.unshift(contacts[randomIndex])
  console.log(newContacts)
  setCurrentContacts(newContacts)  
  }

  const sortContactsByPopularity = () => {

    const orderedContacts = [...currentContacts]
    orderedContacts.sort((elem1, elem2) => {
      if(elem2.popularity>elem1.popularity){
        return 1;
      } else if (elem2.popularity<elem1.popularity){
        return -1;
      } else {
        return 0;
      }

    })
    setCurrentContacts(orderedContacts)

  }

  const sortContactsByName = () => {

    const orderedContacts = [...currentContacts]
    orderedContacts.sort((elem2, elem1) => {
      return elem2.name.localeCompare(elem1.name)
    })

    setCurrentContacts(orderedContacts)

  }

  const removeContacts = (contactId) => {
    console.log("removing contacts", contactId)
    const newContacts = currentContacts.filter((eachContact) => {
        if(eachContact.id === contactId){
          return false 
        } else {
          return true
        }
    })
    
    setCurrentContacts(newContacts)
  }

  return (
    <div className="App">
      <h1>Contactos</h1>
      <button onClick={addContact}>Add Contact</button>
      <button onClick={sortContactsByPopularity}>Sort by popularity</button>
      <button onClick={sortContactsByName}>Sort by name</button>

      <div style= {containerCards}>
      {currentContacts.map((eachContact) => {
      return(
        <div key={eachContact.id} style={cardStyles}>
          <img src={eachContact.pictureUrl} width ="130px" style={{borderRadius:"20px" }}/>
          <div>
            <h3>{eachContact.name}</h3>
            <p>Popularity: {eachContact.popularity}</p>
            <p>WonOscar: {eachContact.wonOscar === true ? "🏆" : null }</p>
            <p>WonEmmy: {eachContact.wonEmmy === true ? "🏆" : null}</p>
            <button onClick={() => removeContacts(eachContact.id) } style ={{padding:"10px", borderRadius:"10px", border:"none", backgroundColor: "lightblue"}}>Remove</button>
          </div>
          
          
        </div>
      )
    })}
      </div>
  

    
    </div>
  );
}

export default App;
