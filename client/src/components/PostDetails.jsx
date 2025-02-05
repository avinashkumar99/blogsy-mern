import React, { useEffect, useRef, useState } from "react";

import { useParams } from "react-router";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";
import { api } from "../../constant";
import { Button } from "@mui/material";
import axiosInstance from "../../axiosMiddleware";
import { useNavigate } from "react-router";
import Message from "./Message";
import { CircularProgress, Box } from "@mui/material";
import { AuthContext } from "../AuthContext";
import { useContext } from "react";

const PostDetails = () => {
  const { id } = useParams();
  const { isLogged, logout } = useContext(AuthContext);
  const titleRef = useRef();

  const [isOwner, setIsOwner] = useState(false);
  const [profileImg, setProfileImg] = useState("");
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [postDetails, setPostDetails] = useState({
    author: "",
    comment: [],
    content: "",
    createdAt: "",
    img: [],
    likes: 0,
    tag: [],
    title: "",
    __v: 0,
    _id: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!postDetails?.title) return;

    let idx = 0;

    if (titleRef.current) {
      titleRef.current.textContent = "";
    }

    const runningText = () => {
      if (idx < postDetails.title.length) {
        titleRef.current.textContent += postDetails.title.charAt(idx);
        idx++;
      } else {
        clearInterval(id);
      }
    };

    const id = setInterval(runningText, 100);

    return () => clearInterval(id);
  }, [postDetails.title]);
  // fetching api
  useEffect(() => {
    const fetchPost = () => {
      console.log(id);
      axios
        .get(`${api}post/${id}`)
        .then((res) => {
          console.log(res.data);
          if (res.status === 200) {
            setPostDetails(res.data);
            const authorId = res.data.author;
            axios
              .get(`${api}user/author/${authorId}`)
              .then((res) => {
                console.log(res.data);

                if (res.status === 200) {
                  const authorName = res.data.name;
                  const profileImg = res.data.profileImg;
                  setProfileImg(profileImg);
                  setPostDetails((prev) => ({
                    ...prev,
                    author: authorName,
                  }));
                }
              })
              .catch((e) => console.error(e));

            axiosInstance
              .get(`user/get-user/${res.data.author}`)
              .then((res) => {
                if (res.status === 200) {
                  console.log("Is owner ", res.data.isOwner);
                  setIsOwner(res.data.isOwner);
                }
              });
          }
        })
        .catch((e) => {
          console.error(e.message);
        })
        .finally(() => {
          console.log("Promise settled!");
          // setIsLoading(false);
          setTimeout(() => setIsLoading(false), 500);
        });
    };
    fetchPost();
  }, [id, isLogged]);

  const handleDeletePost = () => {
    axiosInstance
      .delete(`/post/delete/${postDetails._id}`)
      .then((res) => {
        if (res.status === 200) {
          // alert("post deleted");
          setOpen(true);
          setMsg("Post Deleted Successfully, Redirecting to home page ...");

          setTimeout(() => navigate("/home"), 3000);
        }
      })
      .catch((e) => {
        console.log("error: ", e);
      });
  };

  const handleEdit = () => {
    navigate(`/post/update/${id}`);
  };

  const formattedDate = new Date(postDetails.createdAt).toLocaleDateString();

  return (
    <>
      <section className="content-height">
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              minHeight: "80vh",
              minWidth: "100vw",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <div className="w-full p-4 my-4 relative flex justify-start flex-col md:flex-row">
              <div className="md:ms-14 md:w-[60%] md:mr-2 min-h-[80vh] bg-white shadow-lg rounded-lg p-6 my-2">
                <Message isOpen={open} message={msg} />
                <div className="mb-6 relative flex md:flex-nowrap flex-wrap">
                  {isOwner && isLogged && !isLoading && (
                    <div className="flex absolute right-8">
                      <Button
                        color="secondary"
                        variant="outlined"
                        sx={{ marginRight: "1rem" }}
                        onClick={handleEdit}
                      >
                        EDIT
                      </Button>
                      <Button
                        color="error"
                        variant="contained"
                        onClick={handleDeletePost}
                      >
                        DELETE
                      </Button>
                    </div>
                  )}
                  <div className="h-16 w-16 border  border-yellow-700 p-1 rounded-full">
                    <img
                      src={profileImg}
                      alt="Profile"
                      className="object-contain w-full h-full rounded-full"
                      loading="lazy"
                    />
                  </div>

                  <div className="ml-6">
                    <h1
                      ref={titleRef}
                      className="text-3xl font-semibold text-gray-800 md:w-80 sm:w-72 w-56"
                      // style={{ width: "33rem" }}
                    >
                      {/* {postDetails.title} */}
                    </h1>
                    <p className="text-sm text-gray-600 mt-2">
                      By {postDetails.author} on {formattedDate}
                    </p>
                  </div>
                </div>

                {/* Images Section */}
                <div className="mb-6">
                  {postDetails.img && postDetails.img.length > 0 && (
                    <div className="flex gap-4">
                      {postDetails.img.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Blog image ${index + 1}`}
                          className="w-full max-w-sm mx-auto h-auto rounded-lg shadow-md"
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Blog Content */}
                <div className="text-lg text-gray-700 mb-6">
                  <p>{postDetails.content}</p>
                </div>

                {/* Tags Section */}
                <div className="flex gap-2 mb-6">
                  {postDetails.tag &&
                    postDetails.tag.map((t, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                      >
                        #{t}
                      </span>
                    ))}
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-6 ">
                  <FavoriteBorderIcon className="hover:text-red-800 cursor-pointer mr-2" />

                  <span>{postDetails.likes} Likes</span>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Comments
                  </h2>
                  {postDetails.comment && postDetails.comment.length > 0 ? (
                    <ul className="space-y-4">
                      {postDetails.comment.map((com, index) => (
                        <li key={index} className="border-b pb-4">
                          <p className="font-medium text-gray-800">
                            {com.user.name}
                          </p>
                          <p className="text-gray-600">{com.content}</p>
                          <p className="text-sm text-gray-500">
                            Posted on{" "}
                            {new Date(com.createdAt).toLocaleDateString()}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600">No comments yet.</p>
                  )}
                </div>
              </div>
              <div className="md:fixed md:right-8 md:w-[30%] md:top-8 h-auto rounded-lg shadow-lg p-4">
                <div className="relative w-full h-full">
                  <p className="text-md font-semibold">
                    A little bit about author...
                  </p>
                  <div className="flex flex-wrap my-8 p-4">
                    <span className="w-20 h-20 border border-pink-700 p-1 mr-4">
                      <img
                        src={`${profileImg}`}
                        className="w-20 object-cover"
                      />
                    </span>
                    <div className="h-full flex flex-col justify-center flex-1">
                      <p className="ms-2 text-md font-semibold">The Author</p>

                      <span className="text-xl font-bold text-slate-800 ms-2 my-auto">
                        {postDetails.author}
                      </span>
                      <p className="text-end w-full">12th dec</p>
                    </div>
                  </div>
                  <div className="text-slate-700 font-semibold">
                    <span className="text-3xl font-extrabold">"</span>
                    <span>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Pariatur, harum fuga autem consectetur vel ipsam dolor
                      tempore, atque quos earum, blanditiis corrupti libero
                      voluptatibus ea quae aperiam voluptates et! Veritatis!
                    </span>
                    <span className="text-3xl font-extrabold">"</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};
export default PostDetails;
