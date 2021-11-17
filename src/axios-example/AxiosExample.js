import React, { useState } from 'react';
import axios from 'axios';

const baseURL = "http://localhost:8080/api/v1/person/";

const AxiosExample = () => {

    const [persons, setPersons] = useState([]);
    const [message, setMessage] = useState();
    const [error, setError] = useState();

    const [id, setId] = useState(0);
    const [person, setPerson] = useState({id: 0, email: '', firstName: '',lastName: '', title: ''});

    //FIND ALL
    const sendGetRequest = async () => {
        console.log("start sendGetRequest");
        await axios.get(baseURL).then (res => {
            console.log("Data: " + res.data);
            console.log("Status: " + res.status);
            if(res.status === 200){
                setPersons(res.data);
                setMessage("Operation successfully completed");
            } else {
                setMessage("API ERROR: " + res.status);
            }
            setError();
        }).catch(err => {
            console.log("ERROR: " + err);
            if(err.message){
                setError(err.message);
            } else {
                setError(err);
            }
            setMessage();
        }); 
        console.log("end sendGetRequest");
    };



    //FIND BY ID
    const sendGetRequestById = async () => {
        let validation = true;
        if(id === 0){
            setError("Param not valid");
            validation = false;
        } 
        if (validation) {
            await axios.get(`${baseURL}${id}`).then(res => {
                console.log("RESPONSE" + res);
                if(res.status === 200){
                    setPersons(res.data);
                    setMessage("Operation successfully completed");
                }else {
                    setMessage("API ERROR: " + res.status);
                }
                setError();
            }).catch(err => {
                console.log("ERROR: " + err);
                if(err.response){
                    console.log("ERROR RESPONSE: " + err.response);
                    setError(err.response.data.statusText);
                } else {
                    setError(err.message);
                }
                setMessage();
            })      
    }};


    const sendPostRequest = async () => {

        const data = {email: person.email, firstName: person.firstName, lastName: person.lastName, title: person.title};
        console.log("start sendPostRequest");
        await axios.post(baseURL, data).then(res => {
            console.log("RESPONSE" + res);
            if(res.status === 201){
                setPersons(res.data);
                setMessage("Operation successfully completed");
            } else {
                setMessage("API ERROR: " + res.status);
            }
            setError();
        }).catch(err => {
            console.log("ERROR: " + err);
            if(err.response){
                console.log("ERROR RESPONSE: " + err.response);
                setError(err.response.data.statusText);
            } else {
                setError(err.message);
            }
            setMessage();
        })     
        console.log("end sendPostRequest"); 
};


const sendPutRequest = async () => {

    const data = {email: person.email, firstName: person.firstName, lastName: person.lastName, title: person.title};

await axios.put(baseURL, data).then(res => {
    console.log("RESPONSE" + res);
    if(res.status === 204){
        setPersons(res.data);
        setMessage("Operation successfully completed");
    }else {
        setMessage("API ERROR: " + res.status);
    }
    setError();
}).catch(err => {
    console.log("ERROR: " + err);
    if(err.response){
        console.log("ERROR RESPONSE: " + err.response);
        setError(err.response.data.statusText);
    } else {
        setError(err.message);
    }
    setMessage();
})      
};
    






    return (
        <div className="container">
          <h3>Axios Example</h3>

          {message && <div className="alert alert-success">{message}</div>}  
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="row">
              <div className="col-3 m-2">
                <button type="button" className="btn btn-info" onClick={sendGetRequest}>See all Data</button>
              </div>
          </div>

          <div className="row">
            <div className="col-3 m-2">
                <button type="button" className="btn btn-primary" onClick={sendGetRequestById}>See Data by Id</button>
                <div className="col m-2">
                <input type="text" className="form-control" placeholder="Enter Id Number" onChange={(e)=>setId(e.target.value)}/>
                </div>
            </div>
          </div>

          <div className="row">
              <div className="col-3 m-2">
                <button type="button" className="btn btn-success" onClick={sendPostRequest}>Save Data</button>
                <div className="col m-2">
                <input type="text" className="form-control" placeholder="Enter E-mail Address" onChange={(e)=>person.email = e.target.value}/>
                <input type="text" className="form-control" placeholder="Enter First Name" onChange={(e)=>person.firstName = e.target.value}/>
                <input type="text" className="form-control" placeholder="Enter Last Name" onChange={(e)=>person.lastName = e.target.value}/>
                <input type="text" className="form-control" placeholder="Enter Title" onChange={(e)=>person.title = e.target.value}/>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col m-2">
                <button type="button" className="btn btn-warning" onClick={sendPutRequest}>Update Data</button>
                <div className="col-3 m-2">
                <input type="text" className="form-control" placeholder="Enter Id Number" onChange={(e)=>setId(e.target.value)}/>
                <input type="text" className="form-control" placeholder="Enter E-mail Address" onChange={(e)=>person.email = e.target.value}/>
                <input type="text" className="form-control" placeholder="Enter First Name" onChange={(e)=>person.firstName = e.target.value}/>
                <input type="text" className="form-control" placeholder="Enter Last Name" onChange={(e)=>person.lastName = e.target.value}/>
                <input type="text" className="form-control" placeholder="Enter Title" onChange={(e)=>person.title = e.target.value}/>
                </div>
              </div>
            </div>


          </div>
          

    );
};

export default AxiosExample;