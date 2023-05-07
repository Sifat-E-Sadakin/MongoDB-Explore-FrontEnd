import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Update = () => {

    let user = useLoaderData();
    // console.log(user);

    let updateInfo = event =>{
        event.preventDefault();
        let name = event.target.name.value;
        let email= event.target.email.value;
         console.log(name, email);
        let updateUser= {name, email}
        console.log(updateUser);
        fetch(`http://localhost:3000/update/${user._id}`,{
            method:'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateUser)
            
        })
        .then(res=> res.json())
        .then(data => console.log(data))
    }


    return (
        <div>
            <form onSubmit={updateInfo} >
                <input type="text" name='name' defaultValue={user?.name} />
                <input type="email" name='email' defaultValue={user?.email} />
                <input type="submit" value='update' />
            </form>
            
            
        </div>
    );
};

export default Update;