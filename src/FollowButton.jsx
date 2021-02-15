import React, {useEffect, useState} from "react";
import {httpPost, httpDelete} from "./functions/http";

const FollowButtonComponent = (props) => {
  const userId = props.userId;
  const user = props.user;
  const currentUserId = localStorage.getItem("user_id");
  const [followStatus, setFollowStatus] = useState(false);
  const followersLength = props.followersLength;
  const setFollowersLength = props.setFollowersLength;

  useEffect(() => {
    console.log(user);
    setFollowStatus(isFollow());
  } , [])

  const follow = async () => {
    await httpPost(`users/follow/${currentUserId}/${userId}`);
    console.log("follow");
    setFollowStatus(true);
    setFollowersLength(followersLength + 1);
  }

  const unfollow = async () => {
    await httpDelete(`users/follow/${currentUserId}/${userId}`);
    console.log("unfollow");
    setFollowStatus(false);
    setFollowersLength(followersLength - 1);
  }

  const isFollow = () => {
    let result = false;
    user.followed_user.forEach(value => {
      console.log(value['user']);
      if(value['user'] == currentUserId){
        result = true;
      }
    });
    return result;
  }



  if(followStatus){
    return(
      <div onClick={() => unfollow()} className="account-Container_FollowButton">
      <p>フォローを解除</p>
    </div>
    )
  }
  else{
    return(
      <div onClick={() => follow()} className="account-Container_FollowButton">
      <p>フォロー</p>
    </div>
)
  }
}

export default FollowButtonComponent;