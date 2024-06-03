import { IUser } from "@/types";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useGetUser } from "@/hooks/useGetUser";
import profilePlacerholder from "@/assets/icons/profile-placeholder.svg";
import { useEffect, useState } from "react";

type UserCardProps = {
  user: IUser;
  handleFollow: () => void;
};

const UserCard = ({ user, handleFollow }: UserCardProps) => {
  const currentUser = useGetUser();
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (user.followers?.includes(currentUser.userID)) {
      setIsFollowing(true);
    }
  }, [ user.followers]);


  return (
    <div className="user-card">
      <Link
        to={`/profile/${user._id}`}
        className="flex flex-col gap-4 items-center"
      >
        <img
          src={
            user.profilePicture === ""
              ? profilePlacerholder
              : `http://localhost:5000/${user.profilePicture}`
          }
          alt="creator"
          className="rounded-full w-14 h-14"
        />

        <div className="flex-center flex-col gap-1">
          <p className="base-medium text-light-1 text-center line-clamp-1">
            {user.username}
          </p>
        </div>
      </Link>
      {currentUser.userID !== user._id && (
        <Button
          onClick={handleFollow}
          type="button"
          size="sm"
          className={`${isFollowing ? "text-light-1 flex gap-2 bg-rose-500" : "shad-button_primary"}`}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      )}
    </div>
  );
};

export default UserCard;
