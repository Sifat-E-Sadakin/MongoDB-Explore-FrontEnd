import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link } from 'react-router-dom'

function App() {

  let [user, setUser] = useState([])

  let submit = event => {
    event.preventDefault();
    let name = event.target.name.value;
    let email = event.target.email.value;

    let newUser = { name, email }

    // console.log(user);
    fetch('http://localhost:3000/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        event.target.reset();

      })

  }

  let remove = _id => {
    console.log('delete', _id);



    fetch(`http://localhost:3000/user/${_id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => console.log(data))

  }
  useEffect(() => {
    fetch('http://localhost:3000/user')
      .then(res => res.json())
      .then(data => setUser(data))
  }, [user])

  let update = id => {
    console.log(id, "updating ");
    

  }




  return (
    <>
      <form onSubmit={submit} >
        <input type="text" name='name' />
        <input type="email" name="email" />
        <input type="submit" />
      </form>

      {user &&
        user.map(person => <p key={person._id}>name: {person.name} || Email: {person.email}
          <Link to={`/update/${person._id}`}><button onClick={() => update(person._id)}>Update</button></Link>
          <button onClick={() => (remove(person._id))}>X</button>
        </p>)
      }



      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Mongo DB explore</h1>

    </>
  )
}

export default App
