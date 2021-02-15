import React, { useEffect, useState } from 'react';
import {Link, useParams} from "react-router-dom";
import './Account.scss';
import {httpGet} from "./functions/http";
import FollowButtonComponent from './FollowButton';
import PostComponent from "./Post";

const AccountComponent = () => {
  let {id} = useParams();
  const userId = id;
  const currentUserId = localStorage.getItem("user_id");
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState([]);
  const [followersLength, setFollowersLength] = useState(0);
  const [followsLength, setFollowsLength] = useState(0);
  const [postsLength, setPostsLength] = useState(0);


  useEffect(() => {
    httpGet(`users/${userId}`)
    .then((result) => {
      console.log(result);
      setUser(result);
      setFollowersLength(result.followed_user.length);
      setFollowsLength(result.follow_user.length);
      setPostsLength(result.posts.length);
      setIsLoaded(true);
    });
  }, [id])


  const isSameUser = () => {
    return currentUserId == userId;
  }

  if(!isLoaded){
    return <div>Loading...</div>
  }else{
    return (
      <div className="account-Container">
        <div className="account-Container_MainInfo card">
          <div className="account-Container_TopInfo">
            <div className="account-Container_Name">
              <p>{user.username}</p>
            </div>
            {
              isSameUser()
              ? <Link to={'/account/edit/' + user.id} className="account-Container_Edit"></Link>
              : null
            }
          </div>
          <div className="account-Container_MiddleInfo">
            <div className="account-Container_PostCount">
              <div className="account-Container_PostNumber">
                <p>{postsLength}</p>
              </div>
              <div className="account-Container_PostText">
                <p>投稿</p>
              </div>
            </div>
            <div className="account-Container_FollowCount">
              <div className="account-Container_FollowNumber">
                <p>{followsLength}</p>
              </div>
              <div className="account-Container_FollowText">
                <p>フォロー</p>
              </div>
            </div>
            <div className="account-Container_FollowerCount">
              <div className="account-Container_FollowerNumber">
                <p>{followersLength}</p>
              </div>
              <div className="account-Container_FollowerText">
                <p>フォロワー</p>
              </div>
            </div>
            {!isSameUser()
              ? <FollowButtonComponent
                  userId={userId}
                  user={user}
                  followersLength={followersLength}
                  setFollowersLength={setFollowersLength}
                />
              : null
            }
          </div>
          <div className="account-Container_BottomInfo">
            <div className="account-Container_UserDetail">
              <p>{user.introduction}</p>
            </div>
          </div>
        </div>
        <div className="account-Container_Posts">
          {
            user.posts.map((post) => (
              <PostComponent post={post} key={post.id} />
            ))
          }
        </div>
      </div>
    )
  }
}

export default AccountComponent;
