import  { useEffect, useState, useRef } from 'react'
import "./style.css";
import Trash from "../../assets/trash.svg";
import api from '../../services/api'


function Home() {
     const [users, setUsers] = useState([])

     const inputName = useRef()
     const inputAge = useRef()
     const inputEmail =useRef()
     const inputPassword = useRef()
     const inputPhone = useRef()

     async function getUsers() {
      try {
        const usersFromAPI = await api.get('/api/users');
        setUsers(usersFromAPI.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    }

    async function createUsers() {
      try {
        const response = await api.post('/api/users', { 
          name: inputName.current.value,
          phone: inputPhone.current.value,
          age: parseInt(inputAge.current.value),
          email: inputEmail.current.value,
          password: inputPassword.current.value
        });
  
        if (response.status === 201 || response.status === 200) {
          getUsers(); 
        } else {
          console.error('Failed to create user:', response);
        }
      } catch (error) {
        console.error('Error creating user:', error);
      }
    }

    async function deleteUsers(id) {
      try {
        await api.delete(`/api/users/${id}`);
        getUsers();
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }

      useEffect(() => {
          getUsers()
      }, [])

  return (
    <>
      <div className="container">
        <form action="">
          <h1>Cadastro de Usuários</h1>
          <input type="text" name="name" placeholder="Nome" ref={inputName} />
          <input type="text" name="phone" placeholder="(48) 99999-9999" ref={inputPhone} />
          <input type="number" name="age" placeholder="Idade" ref={inputAge} />
          <input type="email" name="email" placeholder="Email" ref={inputEmail} />
          <input type="password" name="password" placeholder="Senha" ref={inputPassword} />
          <button type="button" onClick={createUsers}>Cadastrar</button>
        </form>

        {users.map((user) => (
          <div key={user.id} className="card">
            <div>
              <p>Nome: <span>{user.name}</span></p>
              <p>Telefone: <span>{user.phone}</span></p>
              <p>Idade: <span>{user.age}</span></p>
              <p>E-mail: <span>{user.email}</span></p>
            </div>
            <button onClick={() => deleteUsers(user.id)}>
              <img src={Trash} alt="Imagem para excluir" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
