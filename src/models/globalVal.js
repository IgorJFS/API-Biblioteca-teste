import mongoose from "mongoose";

mongoose.Schema.Types.String.set("validate", {
  validator: (v) => v.trim() !== "",
  message: ({path}) => `O campo ${path} foi fornecido vazio.`,
});