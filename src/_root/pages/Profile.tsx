import { useGetUser } from "@/hooks/useGetUser"
import { useParams } from "react-router"
import { Link } from "react-router-dom"


const Profile = () => {
  const {id} = useParams<{id: string}>()
  return (
    <div className="flex flex-col gap-2">
      User profile page
      <Link to={`/update-profile/${id}`}>Edit Profile</Link>
    </div>
    
  )
}

export default Profile