import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { hotelInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";

const NewHotel = () => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);

  const { data, loading, error } = useFetch("/rooms");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    // console.log(e.target.selectedOptions);
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };

  console.log(rooms);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", files);
    data.append("upload_preset", "lamadev");
    try {
      console.log("cloudinary");

      // const uploadRes = await axios.post(
      //   "http://api.cloudinary.com/v1_1/lamadev/demo/image/upload",
      //   data
      // );
      // console.log(uploadRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(files);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        // files is an Object
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "lamadev");
          const uploadRes = await axios.post(
            "http://api.cloudinary.com/v1_1/dd8oumad8/image/upload",
            data
          );
          const { url } = uploadRes.data;
          return url;
        })
      );
      const newHotel = {
        ...info,
        rooms,
        photos: list,
      };
      await axios.post("/hotels", newHotel);
    } catch (err) {}
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Hotel</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {hotelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    id={input.id}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}
              {/* Featured  */}
              <div className="formInput">
                <label>Featured</label>
                <select onChange={handleChange} id="featured">
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              {/* Rooms  */}
              <div className="selectRooms">
                <label>Rooms (hold Shift, CTRL to select multiple)</label>
                <select onChange={handleSelect} id="rooms" multiple>
                  {loading
                    ? "loading..."
                    : data &&
                      data.map((room) => (
                        <option key={room._id} value={room._id}>
                          {room.title}
                        </option>
                      ))}
                </select>
              </div>
              <button type="submit" onClick={handleClick}>
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;
