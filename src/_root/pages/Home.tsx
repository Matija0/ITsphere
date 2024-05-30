import Loader from "@/components/Loader";
import PostCard from "@/components/PostCard";
import { baseUrl } from "@/constants/baseUrl";
import { useGetUser } from "@/hooks/useGetUser";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${baseUrl}/posts`);
      setData(res.data);
      console.log(res.data)
      console.log(data)
      if(res.data) setIsDataLoading(false)
    };

    const fetchUserData = async () => {
      const user = useGetUser();
      const res = await axios.get(`${baseUrl}/users/${user.userID}`);
      setUserData(res.data);
    };

    fetchData();
    fetchUserData()
  }, []);

 

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
                    <PostCard post={post} user={userData} />
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
