import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import './Post.scss';
import {httpGet, httpPost, httpDelete} from "./functions/http";

const PostComponent = (props) => {
  const [favoStatus, setFavoStatus] = useState(false);
  const [favoLength, setFavoLength] = useState(0);
  let post = props.post;
  let currentUserId = localStorage.getItem("user_id");


  useEffect(() => {
    if(post.favorites){
      setFavoStatus(isFavo(post.favorites));
      setFavoLength(post.favorites.length);
    }
  }, [])

  const addFavo = (post) => {
    httpPost(`posts/${post.id}/favorite/${currentUserId}`, {})
      .then(
        (_) => {
          setFavoStatus(!favoStatus);
          setFavoLength(favoLength+1);
        }
      );
  }

  const deleteFavo = (post) => {
    httpDelete(`posts/${post.id}/favorite/${currentUserId}`)
    .then(
      (_) => {
        setFavoStatus(!favoStatus);
        setFavoLength(favoLength-1);
      }
    );
  }

  const isFavo = (post_favorites) => {
    let result = false;
    post_favorites.forEach(value => {
      if(value['user']['id'] === Number(currentUserId)){
        result = true;
      }
    });
    return result;
  }

  const checkedTasksLength = (post) => {
    let length = 0;
    post['tasks'].forEach(value => {
      if(value['is_done']) length++;
    });
    return length;
  }

  const isReach = (post) => {
    return post.tasks.length - checkedTasksLength(post) === 1;
  }

  const isAchievement = (post) => {
    return post.tasks.length - checkedTasksLength(post) === 0;
  }


  const ItemClassName = (post) => {
    let className = "list-Container_Item card";
    if(isReach(post)){
      className += " is-reach";
    }
    else if(isAchievement(post)) {
      className += " is-achievement";
    }

    return className
  }

  return (
    <div className={ItemClassName(post)} key={post.id}>
      <Link to={"/detail/" + post.id} className="list-Container_Inner">
        <div className="list-Container_Title">
          <h1>{post.title}</h1>
        </div>
        <div className="list-Container_Limit">
          <p>
            期限&nbsp;:
              <span>{ post.limit }</span>
          </p>
        </div>
        {
          isReach(post)
            ? <div className="list-Container_Last">
              <p>Last One</p>
            </div>
            : null
        }
        <div className="list-Container_Tasks">
          {
            post.tasks.map((task) => (
              <div className="list-Container_Task" key={task.id}>
                {
                  task.is_done
                  ? <p className="checked opacity">{ task.content }</p>
                  : <p className="not-checked">{ task.content }</p>
                }
              </div>
            ))
          }
        </div>
      </Link>
      <div className="list-Container_ItemBottom">
        <div className="list-Container_Favorite">
          {
            favoStatus
            ? <p onClick={() => deleteFavo(post)} className="favorite">いいね&nbsp;{favoLength}</p>
            : <p onClick={() => addFavo(post)}>いいね&nbsp;{favoLength}</p>
          }
        </div>
        <Link to={"/detail/" + post.id} className="list-Container_ItemBottomRight" >
          <div className="list-Container_Comment">
            <p className="far fa-comment-dots"></p>
            <span>&nbsp;{post.comments.length}</span>
          </div>
        </Link>
        <Link to={"/account/ + post.user.id"} className="list-Container_Account">
          <p>{post.user.username}</p>
        </Link>
        <Link to={"/detail/" + post.id} className="list-Container_Date">
          <p>{ post.created_at }</p>
        </Link>
      </div>
    </div>
  )
}


export default PostComponent;
