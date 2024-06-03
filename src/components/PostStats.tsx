import { baseUrl } from "@/constants/baseUrl";
import { IPost } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import like from "@/assets/icons/like.svg";
import liked from "@/assets/icons/liked.svg";
import { useGetUser } from "@/hooks/useGetUser";


type PostStatsProps = {
  post: IPost;
};


const PostStats = ({post} : PostStatsProps) => {

  const location = useLocation();

  const likesList = post.likes

  console.log(likesList)

  const currentUser = useGetUser();

  const checkIsLiked = (likes: string[], userId: string) => {
    return likes.includes(userId);
  }
  const [isLiked, setIsLiked] = useState(false);

  const containerStyles = location.pathname.startsWith("/profile")
    ? "w-full"
    : "";

  const handleLike = async ( e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.stopPropagation();
    const res = axios.put(`${baseUrl}/posts/${post._id}/like`, {
      userId: currentUser.userID,
    });
    console.log(res);
  }

  useEffect(() => {
    setIsLiked(checkIsLiked(post.likes, currentUser.userID));
  }, [post.likes, currentUser.userID]);

  return (
    <div
    className={`flex justify-between items-center z-20 ${containerStyles}`}>
      <div className="flex gap-5 mr-5 items-center">
        <img
         src={isLiked ? liked : like}
          alt="like"
          width={20}
          height={20}
          onClick={(e) => handleLike(e)}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">{likesList.length}</p>
      </div>


    </div>
  )
}

export default PostStats