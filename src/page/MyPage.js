import { Modal } from 'antd';
import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { onUserPut1 } from '../service/authservice';

export default function MyPage() {


let my =useSelector((state)=>state.myInfo.myInfo)


const [user, setUser] = useState({
"name": "name-1",
"phone": "phone-1",
"company": {
    "name": "company-name-1",
    "email": "company-email-1",
    "phone": "company-phone-1",
    "address": {
        "name": null,
        "post_code": null,
        "address": null,
        "extra": null,
        "detail": null,
        "location_x": null,
        "location_y": null
    }
},
});

const [editedName, setEditedName] = useState({});
console.log(editedName)
const handleNameChange = (event) => {
const {name , value}= event.target;
setEditedName((editedName)=>({...editedName, [name] : value}))


};

const handleNameSubmit = (event) => {
event.preventDefault();

setUser((prevUser) => ({
    ...prevUser,
    company: {
    ...prevUser.company,
        
    address: {
        ...prevUser.company.address,
        name: editedName.name,
        
    },
    },
}));

onUserPut1()
console.log(user)
};
return (

<>
<div>
    <p>Name: {user.name}</p>
    <p>Email: {user.email}</p>
    <p>Phone: {user.phone}</p>
    <p>Company Name: {user.company.name}</p>
    <p>Company Email: {user.company.email}</p>
    <p>Company Phone: {user.company.phone}</p>
    <p>Company Address Name: {user.company.address.name}</p>
    <form onSubmit={handleNameSubmit}>
    <label>
        Company Address Name:
        <input type="text"  name='name' value={editedName.name ??''} onChange={handleNameChange} />
     
    </label>
    <button type="submit">Save</button>
    </form>
</div>


</>

)
}
