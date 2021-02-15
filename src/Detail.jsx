import React, { useEffect, useState } from 'react';
import {Link, useParams} from "react-router-dom";
import './Detail.scss';
import {httpGet, httpPost, httpDelete} from "./functions/http";
import CommentComponent from "./Comment";
import TaskComponent from "./Task";


const DetailComponent = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [post, setPost] = useState([]);
  const [favoStatus, setFavoStatus] = useState(false);
  const [favoLength, setFavoLength] = useState(0);
  const currentUserId = localStorage.getItem("user_id");
  let {id} = useParams();


  useEffect(() => {
    httpGet(`posts/${id}`)
    .then((result) => {
      if(result.favorites){
        setFavoStatus(isFavo(result.favorites));
        setFavoLength(result.favorites.length);
      }
      setPost(result);
      console.log(result);
      setIsLoaded(true);
    });

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

  const deletePost = () => {
    console.log("deleete");
    httpDelete(`posts/${post.id}`);
    
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
    let className = "detail-Container_Item card";
    if(isReach(post)){
      className += " is-reach";
    }
    else if(isAchievement(post)) {
      className += " is-achievement";
    }

    return className
  }

  if(!isLoaded){
    return <div>Loading...</div>
  }else{
    return (
      <div className="detail-Container">
          <div className={ItemClassName(post)}>
            <div className="detail-Container_Title">
              <h1>{ post.title }</h1>
            </div>
            <div className="detail-Container_Detail">
              <p>{ post.detail }</p>
            </div>
            <div className="detail-Container_Limit">
              <p>
                期限&nbsp;:
                  <span>{ post.limit }</span>
              </p>
            </div>
            {
              isReach(post)
                ? <div className="detail-Container_Last">
                    <p>Last One</p>
                  </div>
                : null
            }
            <div className="detail-Container_Tasks">
              {
                post.tasks.map((task) => (
                  <TaskComponent postUserId={post.user.id} task={task} key={task.id} />
                ))
              }

            </div>
            <div className="detail-Container_ItemBottom">
              <div className="detail-Container_Favorite">
                {
                  favoStatus
                  ? <p onClick={() => deleteFavo(post)} className="favorite">いいね&nbsp;{favoLength}</p>
                  : <p onClick={() => addFavo(post)}>いいね&nbsp;{favoLength}</p>
                }
              </div>
              <div className="detail-Container_Comment">
                <p className="far fa-comment-dots"></p>
                <span>&nbsp;{post.comments.length}</span>
              </div>
              <Link to={"/account/ + post.user.id"} className="detail-Container_Account">
                <p>{post.user.username}</p>
              </Link>
              <Link to={"/detail/" + post.id} className="detail-Container_Date">
                <p>{ post.created_at }</p>
              </Link>
              {
                currentUserId==post.user.id
                ? <div onClick={() => deletePost()} className="detail-Container_Delete"></div>
                : null
              }
            </div>
          </div>
          <CommentComponent comments={post.comments} postId={post.id} />
      </div>
    )
  }

}


export default DetailComponent;
