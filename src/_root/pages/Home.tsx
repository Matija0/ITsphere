import { baseUrl } from "@/constants/baseUrl";
import axios from "axios";
import { useEffect, useState } from "react";


const Home = () => {

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${baseUrl}/posts/6656511c5d9a229d9719ebc7`);
      console.log(res.data);
    };

    fetchData();
  }, []);

  return (
      <div>
        <h1 className="text-2xl font-bold">Welcome to the Home Page</h1>
      </div>
  );
};

export default Home;
