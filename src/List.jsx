import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import './List.scss';
import {httpGet, httpPost} from "./functions/http";
import PostComponent from "./Post";

const ListComponent = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [posts, setPosts] = useState([]);
  let currentUserId = localStorage.getItem("user_id");

  useEffect(() => {
    console.log(currentUserId);

    httpGet('posts')
      .then(
        (result) => {
          setIsLoaded(true);
          result.forEach((post) => {
            if(post.favorites){
              post['favo_status'] = isFavo(post.favorites);
              post['favorites_length'] = post.favorites.length;
            }
            else{
              post['favo_status'] = false;
              post['favorites_length'] = 0;
            }
          })
          setPosts(result);
        }
      );
  }, [])

  const addFavo = (post) => {
    console.log("addFavo!");
    httpPost(`posts/${post.id}/favorite/${currentUserId}`, {})
      .then(
        (_) => {
          post['favo_status'] = !post['favo_status'];
          post['favorites_length']++;
          console.log(post['favorites_length'])
          console.log(`add=favo_status:${post.favo_status}`);
        }
      );
  }

  const deleteFavo = (post) => {
    console.log("deleteFavo!");
    // if(!currentUserId){
    //   this.router.navigate(['register']);
    // }
    // else{
    //   this.favoriteService.deleteFavo(post.id, Number(currentUserId)).subscribe(
    //     (res) => {
    //       post['favo_status'] = !post['favo_status'];
    //       post['favorites_length']--;
    //       console.log(post['favorites_length'])
    //       console.log(`delete=favo_status:${post.favo_status}`);
    //     }
    //   );
    // }
  }

  const isFavo = (post_favorites) => {
    let result = false;
    post_favorites.forEach(value => {
      if(value['user']['id'] === currentUserId){
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

  if(!isLoaded){
    return <div>Loading...</div>
  }else{
    return (
      <div className="list-Container">
        <div className="list-Container_Items">
          {posts.map((post) => (
            <PostComponent post={post} key={post.id} />
          ))}
        </div>
      </div>
    )
  }
}

export default ListComponent;
