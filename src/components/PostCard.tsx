import { IPost } from "@/types"
import { IUser } from "@/types"
import { Link } from "react-router-dom"
import PostStats from "./PostStats"
import { useEffect, useState } from "react"
import axios from "axios"
import { baseUrl } from "@/constants/baseUrl"
import { useGetUser } from "@/hooks/useGetUser"
import edit from "@/assets/icons/edit.svg"

type PostCardProps = {
  post: IPost
}

const PostCard = ({post} : PostCardProps) => {

  const [user, setUser] = useState<IUser>()

  const currentUser = useGetUser()

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${baseUrl}/users/${post.userId}`)
      setUser(res.data)
    }
    fetchUser()
  }, [post.userId])

  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.userId}`}>
            <img
              src={
                `http://localhost:5000/${user?.profilePicture}` ||
                "/assets/icons/profile-placeholder.svg"
              }
              alt="creator"
              className="w-12 lg:h-12 rounded-full"
            />
          </Link>

          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">
              {user?.username}
            </p>
            <div className="flex-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular ">
                {new Date(post.timestamp).toLocaleDateString()}
              </p>
              •
              <p className="subtle-semibold lg:small-regular">
                {post.category}
              </p>
            </div>
          </div>
        </div>

       {
        currentUser.userID === post.userId && (
          <Link
          to={`/update-post/${post._id}`}
          className={`${user?._id !== post.userId && "hidden"}`}>
          <img
            src={edit}
            alt="edit"
            width={20}
            height={20}
          />
        </Link>
        )
       }
      </div>

      <Link to={`/posts/${post._id}`}>
        <div className="small-medium lg:base-medium py-5">
          <p>{post.content}</p>
          <ul className="flex gap-1 mt-2">
           {
            post.tags.map((tag, index) => (
              <li key={`${tag}${index}`} className="text-light-3 small-regular">
              #{tag}
            </li>
            ))
           }
          </ul>
        </div>

        <img
          src={`http://localhost:5000/${post.imageUrl}` || "/assets/icons/profile-placeholder.svg"}
          alt="post image"
          className="post-card_img"
        />
      </Link>

      <PostStats post={post}  />
    </div>
  )
}

export default PostCard