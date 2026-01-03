import { useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import css from "./LoginForm.module.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useAuth } from "../../context/useAuth";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required field"),
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Required field"),
});

export default function LoginForm({ onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      onClose();
    } catch (error) {
      console.error("Login error:", error.message);
      alert(error.message);
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={css.title}>Log In</h1>
      <p className={css.text}>
        Welcome back! Enter your credentials to access your account and continue
        your search for a teacher.
      </p>

      <div className={css.inputWrapper}>
        <input
          type="email"
          {...register("email")}
          placeholder=" "
          className={css.input}
        />
        <label className={css.label}>Email</label>
        {errors.email && (
          <span className={css.error}>{errors.email.message}</span>
        )}
      </div>

      <div className={css.inputWrapper}>
        <input
          type={showPassword ? "text" : "password"}
          {...register("password")}
          placeholder=" "
          className={css.input}
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
          {showPassword ? (
            <AiOutlineEye size={20} />
          ) : (
            <AiOutlineEyeInvisible size={20} />
          )}
        </button>

        {errors.password && (
          <span className={css.error}>{errors.password.message}</span>
        )}
      </div>

      <button className={css.btnLogin} type="submit">
        Log in
      </button>
    </form>
  );
}
