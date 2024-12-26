import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../constant";
import { Button } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { CircularProgress, Box } from "@mui/material";
import { useNavigate } from "react-router";
const Content = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [alter, setAlter] = useState(true);
  const [profileImg, setProfileImg] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchPost = () => {
      axios
        .get(`${api}posts`)
        .then(async (res) => {
          try {
            if (res.status === 200) {
              const posts = res.data;
              const updatedPosts = await Promise.all(
                posts.map(async (post) => {
                  const authorId = post.author;

                  const authorRes = await axios.get(
                    `${api}user/author/${authorId}`
                  );
                  if (authorRes.status === 200) {
                    const authName = authorRes.data.name;
                    const profileImg = authorRes.data.profileImg;
                    return {
                      ...post,
                      author: {
                        name: authName,
                        profileImg: profileImg,
                      },
                    };
                  }
                })
              );
              setPosts(updatedPosts);
            }
          } catch (e) {
            console.error(e);
          }
        })
        .catch((e) => console.log(e))
        .finally(() => {
          console.log("promise settled");
          // setIsLoading(false);
          setTimeout(() => setIsLoading(false), 500);
        });
    };
    fetchPost();
  }, []);
  useEffect(() => {
    console.log(posts);
  }, [posts]);
  const handlefetchPostId = (id) => {
    console.log(id);
    navigate(`/post/${id}`);
  };
  return (
    <>
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
        <div className="md:w-[85%] w-[94%]  mx-auto my-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {posts.map((post, index) => {
              if (alter) {
                return (
                  <>
                    <div
                      className="md:col-span-3 border border-slate-400 mt-4   rounded-lg text-white"
                      onClick={() => handlefetchPostId(post._id)}
                    >
                      <div className="h-70 min-w-[70%] bg-slate-50 rouded-xl relative inline-block ">
                        <span className="z-50 h-[50px] w-[50px] rounded-full bg-white absolute p-1 top-4 left-4 border border-yellow-900">
                          <img
                            src={`${post.author.profileImg}`}
                            className="w-full h-full rounded-full object-contain"
                          />
                        </span>
                        <FavoriteBorderIcon className="hover:text-red-800 cursor-pointer mx-auto mt-2 absolute right-2 bottom-2" />

                        <img
                          src={`${post.img[0]}`}
                          className="h-full w-full object-cover  z-10"
                        />
                      </div>
                      <div className="w-auto h-40 flex flex-col px-3  justify-evenly">
                        <h3 className="text-center text-blue-800 font-semibold ">
                          {post.title}
                        </h3>
                        <p className="text-sm text-center overflow-clip text-slate-700 h-5 w-full leading-tight">
                          {post.content}
                        </p>
                        {/* <CommentIcon className="hover:text-blue-300 cursor-pointer mx-auto mt-2" /> */}
                        <div className="flex justify-between text-blue-600">
                          <div className="flex flex-col">
                            <div>
                              by &nbsp;
                              <span>{post.author.name}</span>
                            </div>
                            <div>
                              <span className="text-sm text-slate-700">
                                {new Date(post.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="self-start">
                            <Button variant="outlined" size="small">
                              Read
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              }
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Content;
