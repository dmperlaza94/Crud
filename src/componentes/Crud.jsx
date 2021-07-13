import React, { useState } from "react";
import uuid from "react-uuid";
import Swal from 'sweetalert2'

export const Crud = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [edit, setEdit] = useState(false);

  const addTask = () => {
    const task = { id:uuid(), title, description };
    setTasks([...tasks, task]);
    clear()
  };

const updateTask =()=>{
  const id = localStorage.getItem("id")
  const newTask ={ id,title,description}
  const newTasks = tasks.map(item=>item.id===id?newTask:item)
  setTasks(newTasks)
  clear();
}

  const actions = (e) => {
    e.preventDefault();
    edit ? updateTask(): addTask();
  };

  const deleteTask = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "deleted!",
          text:"Your file has been deleted.",
          icon:"success",
          showConfirmButton: false,
          timer:1500
        });
      }
    });
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const getData=(data)=>{
    // const task=tasks.find((item)=> item.id === id)
    localStorage.setItem("id",data.id)
    setTitle(data.title)
    setDescription(data.description)
    setEdit(true);
  }

  const clear = ()=>{
    setTitle("");
    setDescription("")
    setEdit(false)
    localStorage.removeItem("");
  }

  return (
    <div className="container ">
      <div className="mt-5 justify-content-center d-flex align-items-center ">
        <div className="col-6 ">
          <div className="card bg-danger">
            <h3 className="card-title text-center text-primary">CRUD</h3>
            <div className="card-body">
              <form onSubmit={actions}>
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="title"
                    value={title}
                    required
                    autoFocus
                    className="form-control"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="description"
                    value={description}
                    required
                    className="form-control"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <button className="btn btn-primary form-control" type="submit">
                  {" "}
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ul className="list-group list-group-numbered">
        {tasks.map((task) => (
          <li
            className="list-group-item d-flex justify-content-between align-items-start"
            key={task.id}
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold"> {task.title}</div>
              {task.description}
            </div>
            <button className="btn btn-danger me-2">
              <i
                className="fas fa-trash"
                onClick={() => deleteTask(task.id)}
              ></i>
            </button>
            <button className="btn btn-warning" onClick={() => getData(task)}>
              <i className="fas fa-edit"></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
