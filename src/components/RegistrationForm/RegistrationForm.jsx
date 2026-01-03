import { useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import css from "./RegistrationForm.module.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useAuth } from "../../context/useAuth";

const schema = yup.object().shape({
  name: yup.string().required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().min(6, "Min 6 characters").required("Required"),
});

export default function RegistrationForm({ onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const { registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await registerUser(data.name, data.email, data.password);
      onClose();
    } catch (error) {
      console.error("Registration error:", error.message);
      alert(error.message);
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={css.title}>Registration</h1>
      <p className={css.text}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information.
      </p>

      <div className={css.inputWrapper}>
        <input
          type="text"
          {...register("name")}
          className={css.input}
          placeholder=" "
        />
        <label className={css.label}>Name</label>
        {errors.name && (
          <span className={css.error}>{errors.name.message}</span>
        )}
      </div>

      <div className={css.inputWrapper}>
        <input
          type="email"
          {...register("email")}
          className={css.input}
          placeholder=" "
        />
        <label className={css.label}>Email</label>
        {errors.email && (
          <span className={css.error}>{errors.email.message}</span>
        )}
      </div>

      <div className={css.inputWrapper} style={{ position: "relative" }}>
        <input
          type={showPassword ? "text" : "password"}
          {...register("password")}
          className={css.input}
          placeholder=" "
        />
        <label className={css.label}>Password</label>

        <button
          className={css.btnEye}
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: "absolute",
            right: "0.5rem",
            top: "50%",
            transform: "translateY(-50%)",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          {" "}
          {showPassword ? (
            <AiOutlineEye size={20} />
          ) : (
            <AiOutlineEyeInvisible size={20} />
          )}{" "}
        </button>

        {errors.password && (
          <span className={css.error}>{errors.password.message}</span>
        )}
      </div>

      <button className={css.btnRegister} type="submit">
        Sign Up
      </button>
    </form>
  );
}
