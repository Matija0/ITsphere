import PostForm from "@/components/PostForm"
import addPostIcon from "@/assets/icons/add-post.svg"


const CreatePost = () => {
  return (
    <div  className="flex flex-1 no-scroll">
    <div className="common-container">
      <div className="max-w-5xl flex-start gap-3 justify-start w-full">
        <img
          src={addPostIcon}
          width={36}
          height={36}
          alt="add"
        />
        <h2 className="h3-bold md:h2-bold text-left w-full">Create Post</h2>
      </div>

      <PostForm />
    </div>
  </div>
  )
}

export default CreatePost