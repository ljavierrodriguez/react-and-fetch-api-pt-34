import React, { useEffect, useState } from 'react'

/* 

options = {
  method: 'GET', POST PUT DELETE,
  body: string, POST PUT,
  headers: { 'Content-Type': 'application/json'}
}

fetch(uri, options)
.then((response) => {})
.then((data) => {})
.catch((error) => {})

*/

const App = () => {

  const [users, setUsers] = useState(null);
  const [posts, setPosts] = useState(null);

  useEffect(() => {

    //getUsers();

    //getAsyncUsers();

    getData();

  }, [])

  const getUsers = () => { // asincrona 
    console.log("Antes del fetch...");
    fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'GET', // GET
      //body: "", // POST PUT,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        console.log(response)
        if (response.status === 404) throw Error("Error la pagina no existe...");
        return response.json()
      })
      .then((info) => {
        console.log(info)
        setUsers(info);
      })
      .catch((error) => {
        console.error(error.message);
      })
    console.log("Despues del fetch...")
  }

  const getAsyncUsers = async () => {
    try {


      console.log("Antes del fetch...");
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'GET', // GET
        //body: "", // POST PUT,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log(response);
      if (response.status === 404) throw Error("Pagina no existe");
      const info = await response.json()
      setUsers(info);
      console.log("Despues del fetch...")

    } catch (error) {
      console.log(error.message);
    }
  }

  const getData = async () => {
    try {
      const responses = await Promise.all([fetch("https://jsonplaceholder.typicode.com/users"), fetch("https://jsonplaceholder.typicode.com/posts")])
      console.log(responses);

      //const data = await responses.map((response) => response.json())
      const [users, posts] = await Promise.all(responses.map((response) => response.json()))

      setUsers(users);
      setPosts(posts);

    } catch (error) {
      console.log(error.message)
    }
  }


  return (
    <>
      <div>App</div>
      <ul>
        {
          !!users &&
            users.length > 0 ?
            users.map((user) => {
              return (
                <li key={user.id}>{user.name}</li>
              )
            })
            : (
              <li>Lista vacia</li>
            )
        }
      </ul>
      {/* <button onClick={getUsers}>Buscar Info</button> */}
    </>
  )
}

export default App