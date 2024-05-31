import  { useEffect, useState } from 'react'
import "./style.css";
import Trash from "../../assets/trash.svg";
import api from '../../services/api'

function Home() {
     const [users, setUsers] = useState([])

     async function getUsers () {
        const usersFromAPI  = await api.get('/api/users')

        setUsers(usersFromAPI.data)
        console.log(users)
     }

      useEffect(() => {
          getUsers()
      }, [])

  return (
    <>
      <div className="container">
        <form action="">
          <h1>Cadastro de Usuários</h1>
          <input type="text" name="name" placeholder="Nome" />
          <input type="number" name="age" placeholder="Idade" />
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="email" placeholder="Senha" />
          <button type="button">Cadastrar</button>
        </form>

        {users.map((user) => (
          <div key={user.id} className="card">
            <div>
              <p>Nome: <span>{user.name}</span></p>
              <p>Idade: <span>{user.age}</span></p>
              <p>E-mail: <span>{user.email}</span></p>
              <p>Senha:  <span>{user.password}</span></p>
            </div>
            <button>
              <img src={Trash} alt="Imagem para excluir" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
