import axios from "axios";

 export const getColorList = () => {
    axios
    .get("http://localhost:5000/api/colors")
    .then(res => {
      console.log("testing getColorList component to fetch colors data from server when component mounts : ", res);
      setColorList(res.data);
    })
    .catch(err => {
      console.log("testing getColorList component to fetch colors data from server when component mounts failed ! Try again : ", err);
    });
  };