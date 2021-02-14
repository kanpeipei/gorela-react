import React, {useEffect, useState} from "react";
import {httpPut} from "./functions/http";

const TaskComponent = (props) => {
  const postUserId = props.postUserId;
  const task = props.task;
  const currentUserId = localStorage.getItem("user_id");
  const [isDone, setIsDone] = useState(task.is_done);

  const switchIsDone = () => {
    task.is_done = !task.is_done;
    httpPut(`posts/tasks/${task.id}`, task)
    .then((res) => {
      setIsDone(!isDone);
    });
  }

  if(currentUserId==postUserId){
    return(
      <div className="detail-Container_Task is-currentuser">
        <p
          className={isDone ? "checked opacity" : "not-checked"}
          onClick={() => switchIsDone()}>
            { task.content }
        </p>
      </div>
    )
  }
  else{
    return(
      <div className="detail-Container_Task">
        <p className={isDone ? "checked" : "not-checked"}>
          { task.content }
        </p>
      </div>
    )
  }
}

export default TaskComponent;