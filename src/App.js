import "./App.css";
import { useState } from "react";
import { useFormik } from "formik";
import { userSchema } from "./schemas/Validate";
import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";

function App() {
  const [input, setInput] = useState([]); 
  const [edit, setEdit] = useState();
  const [check,setCheck]=useState([]);

  const formik = useFormik({
    initialValues: { text: "" },
    validationSchema: userSchema(input), 
    onSubmit: (values, { resetForm }) => {
      // setInput([...input])
      console.log(formik)
      setInput([...input, values.text.trim()]); 
      resetForm(); 
    },
  });

  const handleCheck=(id)=>{
    setCheck((prevCheck)=>prevCheck.includes(id)?prevCheck
    .filter((input)=>input!==id):[...prevCheck,id]
    );
  };

  const handleDelete=(id)=>{
    setInput(input.filter((_, index) => index !== id));
  }
  const handleEdit = (index) => {
    setEdit(index);
  };

  const handleEditSave = (event, index) => {
    if (event.key === "Enter" || event.type === "blur") {
      setEdit(null);
    }
  };

  return (
    <>
      <div className="main">
        <div className="center">
          <form onSubmit={formik.handleSubmit}> 
            <h1 className="h1">Todo App</h1>
            <input
              className="input"
              type="text"
              name="text"
              placeholder="Enter your task"
              onChange={formik.handleChange} 
              value={formik.values.text} 
              onBlur={formik.handleBlur} 
            />
            {formik.errors.text && formik.touched.text && (
              <p className="error">{formik.errors.text}</p> 
            )}
            <button type="submit" className="button">+</button>
          </form>

          <ol className="ol">
            {input.map((itemValue, index) => (
             <li
             key={index}
             className={"todo-item " + (check.includes(index) ? "checked" : "")}
            >
             <FaCheck
               className="icon check-icon"
               onClick={() => handleCheck(index)}/>
                {edit === index ? (
                  <input
                    className="edit-input"
                    type="text"
                    value={input[index]}
                    onChange={(e) => {
                      const newItem = [...input];
                      newItem[index] = e.target.value;
                      setInput(newItem);
                    }}
                    onBlur={(e) => handleEditSave(e, index)}
                    onKeyDown={(e) => handleEditSave(e, index)}

                  />
                ) : (
                  <span onClick={() => handleEdit(index)}>
                    {itemValue}
                  </span>
                )}
                
                <FaEdit className="icon edit" onClick={() => handleEdit(index)} />
                <FaTrash className="icon trash" onClick={()=>handleDelete(index)}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}

export default App;
