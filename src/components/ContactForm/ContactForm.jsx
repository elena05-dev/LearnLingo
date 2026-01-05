import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import css from "./ContactForm.module.css";

export default function ContactForm({ teacher }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { reason: "Work" },
  });

  const sendFormData = async () => {
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const handleFormSubmit = async (data) => {
    console.log("Form data:", data);
    try {
      await sendFormData(data);
      toast.success("Form submitted successfully!");
    } catch {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className={css.containerContactForm}>
      <Toaster />
      <h1 className={css.title}>Book trial lesson</h1>
      <p className={css.text}>
        Our experienced tutor will assess your current language level, discuss
        your learning goals, and tailor the lesson to your specific needs.
      </p>
      <div className={css.imgAvatar}>
        <img
          src={teacher.avatar_url}
          alt={`${teacher.name} ${teacher.surname}`}
          className={css.avatar}
        />
        <ul className={css.Name}>
          <li className={css.infoName}>Your teacher</li>
          <li className={css.name}>
            {teacher.name} {teacher.surname}
          </li>
        </ul>
      </div>
      <h2 className={css.item}>
        What is your main reason for learning English?
      </h2>
      <form onSubmit={handleSubmit(handleFormSubmit)} className={css.form}>
        <div className={css.radioGroup}>
          <label>
            <input
              type="radio"
              value="Work"
              defaultChecked
              {...register("reason", { required: true })}
            />
            Career and business
          </label>
          <label>
            <input
              type="radio"
              value="Study"
              {...register("reason", { required: true })}
            />
            Lesson for kids
          </label>
          <label>
            <input
              type="radio"
              value="Living"
              {...register("reason", { required: true })}
            />
            Living abroad
          </label>
          <label>
            <input
              type="radio"
              value="Exams"
              {...register("reason", { required: true })}
            />
            Exams and coursework
          </label>
          <label>
            <input
              type="radio"
              value="Travel"
              {...register("reason", { required: true })}
            />
            Culture, travel or hobby
          </label>
        </div>

        <div className={css.formGpoup}>
          <div className={css.inputGroup}>
            <input
              type="text"
              placeholder="Full name"
              {...register("name", { required: true })}
            />
            {errors.name && <p className={css.error}>{errors.name.message}</p>}
          </div>

          <div className={css.inputGroup}>
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            {errors.name && <p className={css.error}>{errors.name.message}</p>}
          </div>

          <div className={css.inputGroup}>
            <input
              type="Phone number"
              placeholder="Phone number"
              {...register("Phone number", { required: true })}
            />
            {errors.name && <p className={css.error}>{errors.name.message}</p>}
          </div>
        </div>

        <div className={css.button}>
          <button type="submit" className={css.submitBtn}>
            Book
          </button>
        </div>
      </form>
    </div>
  );
}
