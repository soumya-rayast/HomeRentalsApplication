import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Register.scss";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        profileImage: null,
    });
    const [passwordMatch, setPasswordMatch] = useState(true);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: name === "profileImage" ? files[0] : value
        }));
    };

    useEffect(() => {
        setPasswordMatch(
            formData.password === formData.confirmPassword ||
            formData.confirmPassword === ""
        );
    }, [formData.password, formData.confirmPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const register_form = new FormData();
            for (const key in formData) {
                register_form.append(key, formData[key]);
            }

            const response = await fetch("http://localhost:3001/auth/register", {
                method: "POST",
                body: register_form,
            });

            if (!response.ok) {
                throw new Error(`Failed to register. Status: ${response.status}`);
            }

            navigate("/login");
        } catch (error) {
            console.error("Error registering user:", error.message);
        }
    };

    return (
        <div className="register">
            <div className="register_content">
                <form className="register_content_form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    {!passwordMatch && (
                        <p style={{ color: "red" }}>Passwords do not match</p>
                    )}
                    <input
                        id="image"
                        type="file"
                        name="profileImage"
                        onChange={handleChange}
                        accept="image/*"
                        style={{ display: "none" }}
                    />
                    <label htmlFor="image">
                        <p> + Upload Your Photo </p>
                    </label>
                    {formData.profileImage && (
                        <img
                            src={URL.createObjectURL(formData.profileImage)}
                            alt="Profile photo"
                            style={{ maxWidth: "80px" }}
                        />
                    )}
                    <button type="submit" disabled={!passwordMatch}>
                        Register
                    </button>
                </form>
                <a href="/login">Already have an account? Log In here</a>
            </div>
        </div>
    );
};

export default RegisterPage;
