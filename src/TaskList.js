
import {getUser} from './service/auth';
import React, { useEffect, useState } from "react";
import axios from 'axios';
const apiUrl = 'https://j2b30glms2.execute-api.us-east-1.amazonaws.com/prod/gettasks';
const apiDeleteUrl = 'https://j2b30glms2.execute-api.us-east-1.amazonaws.com/prod/deletetask';
   
const TaskList = () => {
    const [getResult, setGetResult] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [message, setMessage] = useState(null);
    const [tName, setTname] = useState('');
    const [tTxt, setTtxt] = useState('');
    
    const userName = getUser(); 
    const username= userName.username;

    const deleteTask = (event)=>{
      event.preventDefault();
      
      const requestConfig = {
        //store as envirnment variable later
        headers: {
          'x-api-key': secrets.API_KEY,
        }
      }
     
      const requestBody = {
        username: username,
        tName: tName,
        tTxt: tTxt
      }
      console.log(requestBody);
        const response = axios.post(apiDeleteUrl, requestBody, requestConfig);
        window.location.reload(false);
        if(!response){
          setErrorMessage('There was an error retrieving tasks')
      }
      setMessage('')
     
    }
    useEffect(() => {
      fetchData();
   
      }, []);


       useEffect(() => {
        console.log(getResult);
     
        }, [getResult]);

        const fetchData = async () => {
          const requestConfig = {
              //store as envirnment variable later
              headers: {
                'x-api-key': secrets.API_KEY,
              }
            }
            
            const requestBody = {
              username: username
            };
          const response = await axios.post(apiUrl,requestBody,requestConfig);
          if(!response){
              setErrorMessage('There was an error retrieving tasks')
          }
          setGetResult(response.data.getResponse.Items[0])
         }
    console.log(getResult);
  let taskArray = Object.entries(getResult)
  console.log(taskArray);

        return(
          
          <div className="TaskList">
          {
      <ul class="grid gap-10 grid-cols-4 m-10">
        {
       taskArray && taskArray.map(taskArrays =>{ if (taskArrays[0] !== 'username' && taskArrays[0] !== 'Username'){
         return(
           <form onSubmit={deleteTask}>
            
             <div key={taskArrays[0]}>
          
            
            <li>
            <div class="card w-97 h-90 bg-primary text-primary-content shadow-xl">
              <div class="card-body">
              <h2 class="card-title">{taskArrays[0]}</h2>
              <p>{taskArrays[1]}</p>
              <div class="card-actions justify-end">
              <button class="btn btn-sm bg-black-500" type="submit" value="submit" onClick={event=> {setTname(taskArrays[0].toString()); setTtxt(taskArrays[1].toString())}}>Complete Task</button>
              </div>
              </div>
              </div>
              </li>

         </div>
         </form> 
          
         )
        }})}

        </ul>
              
}

      </div>
       );
}
                

export default TaskList;