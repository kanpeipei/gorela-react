import React, { useState } from 'react';
import {Redirect} from "react-router-dom";
import './Create.scss';
import InputTextComponent from './InputText';
import TextareaComponent from "./Textarea";
import SubmitButtonComponent from "./SubmitButton";
import {httpPost} from "./functions/http";

const CreateComponent = (props) => {
  
  const [postTitle, setPostTitle] = useState('');
  const [postLimit, setPostLimit] = useState('');
  const [postDetail, setPostDetail] = useState('');
  const [postTask, setPostTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [redirectToList, setRedirectToList] = useState(false);
  let currentUserId = localStorage.getItem("user_id");

  
  const addTask = () => {
    if(postTask!==""){
      let tasksCopy = tasks.slice();
      tasksCopy.push(postTask);
      setTasks(tasksCopy);
      setPostTask('');
    }
  }
  
  const deleteTask = (i) => {
    let tasksCopy = tasks.slice();
    tasksCopy.splice(i, 1);
    setTasks(tasksCopy);
  }
  
  const create = () => {
    const inputData = {
      title: postTitle,
      detail: postDetail,
      limit: postLimit,
      user_id: currentUserId,
      tasks: tasks.map((task) => {
        return {content: task};
      })
    };

    httpPost('posts/create', inputData)
    .then((_) => {
      setRedirectToList(true);
    });
  }

  if(redirectToList){
    return <Redirect to="/" />;
  }
  else{
    return (
      <div className="create-Container">
        <div className="create-Container_Inner">
          <form autoComplete="off">
            <div className="create-Container_Box card">
              <div className="create-Container_Title">
                <InputTextComponent placeholder="タイトル" value={postTitle} onChange={setPostTitle} />
              </div>
              <div className="create-Container_Content">
                <div className="create-Container_Limit">
                  <label>
                    期限：
                    <input
                      type="date"
                      value={postLimit}
                      onChange={event => setPostLimit(event.target.value)}
                      />
                  </label>
                </div>
                <div className="create-Container_InputTask">
                  <InputTextComponent value={postTask} placeholder='タスクを入力' onChange={setPostTask} />
                  <button type="button" onClick={() => addTask()} className="far fa-paper-plane"></button>
                </div>
                <div className="create-Container_Tasks">
                  {tasks.map((task, i) => (
                    <div className="create-Container_Task" key={i}>
                      <div className="create-Container_Checkbox"></div>
                      <p>{task}</p>
                      <button type="button" onClick={() => deleteTask(i)} className="fas fa-trash"></button>
                    </div>
                  ))}
                </div>
                <div className="create-Container_Detail">
                  <TextareaComponent value={postDetail} placeholder="詳細" onChange={setPostDetail} />
                </div>
              </div>
            </div>
            <div className="create-Container_Button">
              <SubmitButtonComponent text="タスクを投稿" onClick={create} />
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default CreateComponent;
