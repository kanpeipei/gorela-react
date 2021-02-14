import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import './Comment.scss';
import {httpPost, httpDelete} from "./functions/http";
import InputTextComponent from './InputText';

const CommentComponent = (props) => {
  const [newComment, setNewComment] = useState('')
  let comments = props.comments;
  let postId = props.postId;
  let currentUserId = localStorage.getItem("user_id");

  const createComment = () => {
    httpPost(`posts/${postId}/comment`, {content: newComment, user_id: currentUserId});
  }

  return (
    <div className="comments-Container">
      <div className="comments-Container_Create card">
        <form autoComplete="off" >
          <InputTextComponent placeholder="コメントを書く" value={newComment} onChange={setNewComment} />
          <button onClick={() => createComment()} className="far fa-paper-plane"></button>
        </form>
      </div>
      <div className="comments-Container_Items">
        {comments.map((comment) => (
          <div className="comments-Container_Item card" key={comment.id}>
            <div className="comments-Container_Content">
              <p>{ comment.content }</p>
            </div>
            <div className="comments-Container_ItemBottom">
              <Link className="comments-Container_Account" to={"/account/" + comment.user.id}>
                <p>{comment.user.username}</p>
              </Link>
              <div className="comments-Container_Date">
                <p>{ comment.created_at}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommentComponent;
