import React, { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
// import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosMiddleware";
import axios from "axios";
import { api } from "../../constant";
import Message from "./Message";
import { Backdrop, CircularProgress } from "@mui/material";

const NewUserComponent = () => {
  // const navigate = useNavigate();
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [msg, setMsg] = useState(false);
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    emailId: "",
    bio: "",
    password: "",
    profileImg: null,
  });
  const [imageChosen, setImageChosen] = useState("");

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChooseImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profileImg: file });
      setImageChosen(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    console.log(formData.profileImg);
    try {
      setIsImageLoading(true);

      const formDataToUpload = new FormData();
      formDataToUpload.append("profileImg", formData.profileImg);

      const res = await axios.post(`${api}upload/image`, formDataToUpload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        console.log("Image uploaded successfully:", res.data.imageUrl);
        const imageUrl = res.data.imageUrl;
        setOpen(true);
        setMsg("Image uploded successfully!");
        setFormData((prev) => ({ ...prev, profileImg: imageUrl }));
      }
    } catch (e) {
      console.error("Error uploading file:", e);
    } finally {
      setTimeout(() => {
        setIsImageLoading(false);
        setOpen(false);
      }, 500);
    }
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = "Name is required";
    if (!formData.emailId) formErrors.emailId = "Email is required";
    if (!formData.password) formErrors.password = "Password is required";
    if (!formData.gender) formErrors.gender = "Gender is required";
    if (!formData.bio) formErrors.bio = "Bio is required";
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    console.log(formData);

    try {
      const payload = {
        ...formData,
        // profileImg: formData.profileImg,
      };
      console.log(payload);
      const res = await axiosInstance.post("/user/create", payload);
      console.log(res);
      if (res.status === 200) {
        setOpen(true);
        setMsg("Account created, please login with credentials!");
      }

      //   navigate("/users");
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setTimeout(() => {
        setFormData({
          name: "",
          age: "",
          gender: "",
          emailId: "",
          bio: "",
          password: "",
          profileImg: null,
        });
        setImageChosen("");
      }, 2000);
    }
  };
  const handleClose = () => {
    setIsImageLoading(false);
  };
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md my-4">
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
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">
        Create New User
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          label="Age"
          type="number"
          variant="outlined"
          fullWidth
          name="age"
          value={formData.age}
          onChange={handleInputChange}
        />
        <FormControl fullWidth error={!!errors.gender}>
          <InputLabel>Gender</InputLabel>
          <Select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            label="Gender"
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
          <FormHelperText>{errors.gender}</FormHelperText>
        </FormControl>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          type="email"
          name="emailId"
          value={formData.emailId}
          onChange={handleInputChange}
          error={!!errors.emailId}
          helperText={errors.emailId}
        />
        <TextField
          label="Bio"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          error={!!errors.bio}
          helperText={errors.bio}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          error={!!errors.password}
          helperText={errors.password}
        />

        <div className="space-y-2">
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
          {formData.profileImg && (
            <img
              src={`${imageChosen}`}
              alt="Profile"
              className="mt-4 max-w-xs rounded-lg h-[100px]"
            />
          )}
        </div>
        {imageChosen && (
          <Button
            // type="submit"
            variant="contained"
            color="primary"
            onClick={handleUpload}
          >
            UPLOAD
          </Button>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
        >
          Create User
        </Button>
      </form>
    </div>
  );
};

export default NewUserComponent;
