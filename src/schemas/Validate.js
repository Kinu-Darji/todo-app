import * as Yup from "yup";

export const userSchema = (existingTasks) =>
  Yup.object({
    text: Yup.string()
      .trim()
      .min(3, "Task must be at least 3 characters") 
      .notOneOf(existingTasks, "Task already exists") 
      .required("Please enter a valid task"), 
  });
