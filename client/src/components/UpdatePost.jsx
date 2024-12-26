import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";
import axiosInstance from "../../axiosMiddleware";
import Message from "./Message";
import { api } from "../../constant";
import { useNavigate, useParams } from "react-router";
import { CircularProgress, Box } from "@mui/material";
import { Backdrop } from "@mui/material";

const UpdatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    tag: [],
    likes: 0,
    img: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");

  const [authors, setAuthors] = useState([]); // Store authors list
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(false);

  useEffect(() => {
    const fetchPost = () => {
      console.log(id);
      axios
        .get(`${api}post/${id}`)
        .then((res) => {
          console.log(res.data);
          if (res.status === 200) {
            setFormData(res.data);
            const authorId = res.data.author;
            axios
              .get(`${api}user/author/${authorId}`)
              .then((res) => {
                console.log(res.data);

                if (res.status === 200) {
                  const authorName = res.data.name;
                  const profileImg = res.data.profileImg;
                  //   setProfileImg(profileImg);
                  setFormData((prev) => ({
                    ...prev,
                    author: authorName,
                    img: [],
                  }));
                }
              })
              .catch((e) => console.error(e));

            // axiosInstance
            //   .get(`user/get-user/${res.data.author}`)
            //   .then((res) => {
            //     if (res.status === 200) {
            //       console.log("Is owner ", res.data.isOwner);
            //       //   setIsOwner(res.data.isOwner);
            //     }
            //   });
          }
        })
        .catch((e) => {
          console.error(e.message);
        })
        .finally(() => {
          console.log("Promise settled!");
          setTimeout(() => setIsLoading(false), 500);
        });
    };
    fetchPost();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter" && formData.tag.trim() !== "") {
      setTags([...tags, formData.tag.trim()]);
      setFormData({ ...formData, tag: tags });
      e.preventDefault();
    }
  };

  const handleChooseImage = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        tag: tags,
        // img: images,
      };
      console.log("form dataaaaaaaaa", formData);
      console.log("payload dataaaaaaaaa", payload);

      const res = await axiosInstance.patch(`post/update/${id}`, payload);
      if (res.status === 200) {
        setOpen(true);
        setMsg("Post is Updated Successfully! , Redirecting to Post Details");
        setTimeout(() => navigate(`/post/${id}`), 3000);
      }
      //   alert("Post created successfully!");
    } catch (error) {
      console.error(error);
      //   alert("Failed to create post.");
      setOpen(true);
      setMsg("Error while updating post, retry!");
    }
  };
  const handleUploadImage = async () => {
    try {
      setIsImageLoading(true);
      for (const image of images) {
        const formDataToUpload = new FormData();
        formDataToUpload.append("profileImg", image.file);
        const res = await axios.post(`${api}upload/image`, formDataToUpload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (res.status === 200) {
          setFormData((pre) => ({
            ...pre,
            img: [...pre.img, res.data.imageUrl],
          }));
        }
      }
      setOpen(true);
      setMsg("All Images Are Uploaded Successfully!");
      // alert("all images uploaded");
      setTimeout(() => setIsImageLoading(false), 500);

      // api call
    } catch (e) {
      console.error(e);
      alert("Caught an error!");
    }
  };
  console.log(images);
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  const handleClose = () => {
    setIsImageLoading(false);
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
        <>
          <div className="max-w-3xl mx-auto p-6 bg-gray-100 shadow-lg rounded-md my-4">
            {isImageLoading && (
              <Backdrop
                sx={(theme) => ({
                  color: "#fff",
                  zIndex: theme.zIndex.drawer + 1,
                })}
                open={isImageLoading}
                onClick={handleClose}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            )}
            <Message isOpen={open} message={msg} />
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-900">
              Update Blog Post
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                />
              </div>

              {/* Content */}
              <div>
                <TextField
                  fullWidth
                  label="Content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                  multiline
                  rows={5}
                  variant="outlined"
                />
              </div>

              {/* Author */}
              <div>
                <TextField
                  fullWidth
                  label="Author"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  required
                  multiline
                  disabled
                  rows={1}
                  variant="outlined"
                />
              </div>

              {/* Tags */}
              <div>
                <TextField
                  fullWidth
                  label="Tags"
                  name="tag"
                  value={formData.tag}
                  onChange={handleInputChange}
                  onKeyDown={handleAddTag}
                  placeholder="Press Enter to add a tag"
                  variant="outlined"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      onDelete={() => setTags(tags.filter((t) => t !== tag))}
                      color="primary"
                    />
                  ))}
                </div>
              </div>

              <div style={{ padding: "20px" }}>
                {/* Image input field */}

                <Button
                  variant="contained"
                  component="label"
                  style={{ marginTop: "1rem" }}
                >
                  Choose Images
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    multiple
                    name="img"
                    onChange={handleChooseImage}
                  />
                </Button>

                {/* Image previews */}
                <div style={{ marginTop: "1rem" }}>
                  <strong>Selected Images:</strong>
                  <div
                    className="flex flex-wrap gap-4"
                    style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
                  >
                    {images.map((image, index) => (
                      <div key={index} style={{ position: "relative" }}>
                        <img
                          src={image.url}
                          alt={`preview-${index}`}
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                        />
                        {/* <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => handleRemoveImage(index)}
                    style={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      fontSize: "10px",
                    }}
                  >
                    Remove
                  </Button> */}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upload button */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUploadImage}
                  style={{ marginTop: "1rem" }}
                  disabled={images.length === 0}
                >
                  Upload Images
                </Button>
              </div>
              {errors && <Alert severity="error">{errors}</Alert>}

              <div className="text-center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Update Post
                </Button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default UpdatePost;
