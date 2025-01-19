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
        <div className="md:w-[100%] w-full min-h-[100vh]  ps-12 py-8 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {posts.map((post, index) => {
              return (
                <>
                  <div className="col-span-1 relative mt-28">
                    <div className="absolute top-2 left-2 text-3xl text-red-800 hover:text-red-400 cursor-pointer">
                      <i class="fa-regular fa-heart"></i>
                      {/* <i class="fa-solid fa-heart"></i> */}
                    </div>
                    <div className="absolute bottom-2 left-2">
                      <Button
                        variant="contained"
                        onClick={() => handlefetchPostId(post._id)}
                      >
                        Read More
                      </Button>
                    </div>
                    <div className="h-60 w-[80%] mr-auto shadow-lg ">
                      <img
                        src={`${post.img}`}
                        className="object-cover h-full w-full"
                      />
                    </div>

                    <div className="absolute top-0 right-32 translate-x-1/3 -translate-y-1/3  flex h-24 w-44 bg-slate-950 items-center p-4 shadow-lg z-10">
                      <div className="h-16 w-16 rounded-full">
                        <img
                          src={`${post.author.profileImg}`}
                          className="object-cover rounded-full outline outline-red-400"
                        />
                      </div>
                      <span className="text-white font-semibold ms-2 h-auto">
                        {post.author.name}
                      </span>
                    </div>
                    <div className="absolute bottom-0 right-32 h-32 w-[60%] translate-x-[15%]  rounded-lg shadow-lg z-10 bg-white p-4">
                      <h3 className="text-lg font-semibold ">{post.title}</h3>
                      <p className="text-sm h-[50%] w-full overflow-clip inline-block">
                        {post.content}
                      </p>
                      {/* <span className="text-sm">...</span> */}
                      <h4 className="text-sm text-purple-700 overflow-clip flex justify-between">
                        {post.tag.map((e) => (
                          <span>{`#${e} `}</span>
                        ))}
                      </h4>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Content;
