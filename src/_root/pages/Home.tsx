import Loader from "@/components/Loader";
import PostCard from "@/components/PostCard";
import UserCard from "@/components/UserCard";
import { baseUrl } from "@/constants/baseUrl";
import { useGetUser } from "@/hooks/useGetUser";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState<any>(null);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [allUsers, setAllUsers] = useState<any>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  const fetchData = async () => {
    const res = await axios.get(`${baseUrl}/posts`);
    setData(res.data);
    if(res.data) setIsDataLoading(false)
  };

  const fetchAllUsers = async () => {
    const res = await axios.get(`${baseUrl}/users`);
    if(!res.data) return;
    setAllUsers(res.data);
    setIsUserLoading(false)
  };
  useEffect(() => {
    fetchData();
    fetchAllUsers();
  }, []); 


  const handleFollow = async(id: string) => {
    const user = useGetUser();
    const res = await axios.put(`${baseUrl}/users/${id}/follow`, {
      userId: user.userID
    });
    if(!res) return;
    console.log(res.data)
  }
 

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {isDataLoading && !data ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full ">
              {data &&
                data.map((post: any) => (
                  <li key={post._id} className="flex justify-center w-full">
                    <PostCard post={post} />
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
      <div className="home-creators">
        <h3 className="h3-bold text-light-1">Top Creators</h3>
        {isUserLoading && !allUsers ? (
          <Loader />
        ) : (
          <ul className="grid 2xl:grid-cols-2 gap-6">
            {allUsers &&
              allUsers.map((user: any) => (
                <li className="h-[220px]" key={user._id}>
                  <UserCard user={user} handleFollow={() => handleFollow(user._id)} />
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
