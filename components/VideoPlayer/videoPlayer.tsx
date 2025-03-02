"use client"
import React from 'react';

import ReactPlayer from "react-player/lazy";
 const PostVideoPlayer=({src}:{src:string})=>  {
    return (
      <><div className="sm:flex w-8/12 h-[60vh] hidden">
      <ReactPlayer
      controls
        width="100%"
        height="100%"
        url={src}
      />
    </div>
    <div className="flex justify-center items sm:hidden">
      <ReactPlayer
      controls
        width="100%"
        height="100%"
        url={src}
      />
    </div></>
       
    );
}
export default PostVideoPlayer