import React, { useState, useEffect } from 'react';
import { useHistory} from 'react-router-dom';
import { Card, Button, Image } from 'semantic-ui-react';
import axiosWithAuth  from '../utils/axiosWithAuth.js';
import userimage from './user.png'

const Users = () => {
  const [userList, setUserList] = useState([]);
  const history = useHistory()  
  useEffect(() => {
    axiosWithAuth()
      .get('/api/users')
      .then((response) => {
        // console.log(response, 'the response')
        setUserList(response.data);
      })
      .catch((err) => (err)); 
  }, []);

const deleteUser = (id) => {
   console.log(id)
    axiosWithAuth()
    .delete(`/api/users/${id}`)
    .then (res => { 
      history.push('/api/users');
        //console.log("Data returned from axios.delete", res)
    })
    .catch(err => console.error(err));
}
// const token = localStorage.getItem('token')
// console.log(token, "user's token")

  return (
    <div className="container">
      <h1>Users List</h1>
      <div className="cards-wrapper">
        <Card.Group>
          {userList.map((user) => (
               <Card key={user.id}>
               <Card.Content>
                <Image
                    floated="right"
                    size="tiny"
                    src={userimage}
                />
                 <Card.Header>Username: {user.username}</Card.Header>
                 <Card.Header>User id: {user.id}</Card.Header>
                 <Card.Header>Department: {user.department}</Card.Header>
               </Card.Content>
               <Card.Content extra>
                  {/* {(user.department !== "admin") ?(
                      <div className="ui two buttons">
                      <Button onClick={() => deleteUser(user.id)} basic color="green"> Delete user </Button>
                    </div>):(console.log("not an admin"))
                } */}
                 <div className="ui two buttons">
                   <Button onClick={() => deleteUser(user.id)} basic color="green"> Delete user </Button>
                 </div>
               </Card.Content>
             </Card>
          ))}
        </Card.Group>
      </div>
    </div>
  );
};

export default Users;