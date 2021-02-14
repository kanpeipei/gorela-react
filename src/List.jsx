import React, { useEffect, useState } from 'react';
import './List.scss';
import {httpGet} from "./functions/http";
import PostComponent from "./Post";

const ListComponent = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    httpGet('posts')
      .then(
        (result) => {
          setIsLoaded(true);
          setPosts(result);
        }
      );
  }, [])

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
