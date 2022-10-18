import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Fill } from "react-icons/ri";

const Task = () => {
  const [TaskList, setTaskList] = useState([]);
  const [singleTask, setSingleTask] = useState(null);
  const [id, setId] = useState();
  const [status, setStatus] = useState();
  const [click, setClick] = useState(null);

  // add notes
  const [Title, setTitle] = useState();
  const [Note, setNote] = useState();
  const [StartDate, setStartDate] = useState();
  const [EndDate, setEndDate] = useState();
  const [StartTime, setStartTime] = useState();
  const [EndTime, setEndTime] = useState();

  //get notes for update

  const url = "http://task.atiar.info/api/todo";

  // get all tasks
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    // axios
    //   .get(url)
    //   .then(function (response) {
    //     setTaskList(response.data.data);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    let res = await axios.get(url);
    console.log(res);
    if (res.status) {
      setTaskList(res?.data?.data);
    } else {
      console.log(res?.message);
    }
  };

  //

  //add todo list
  const handleAddTodo = () => {
    axios
      .post("http://task.atiar.info/api/todo/create", {
        title: Title,
        note: Note,
        start_date: StartDate,
        end_date: EndDate,
        start_time: StartTime,
        end_time: EndTime,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //update
  const handleUpdateTask = (id) => {
    setId(id);
    let updateTask = TaskList.find((item) => item.id == id);
    setSingleTask(updateTask);
    //console.log(updateTask);
  };
  //console.log(singleTask);

  // updated task
  const taskUpdated = () => {
    //console.log(id);
    axios
      .post("http://task.atiar.info/api/todo/update", {
        id: id,
        title: Title,
        note: Note,
        start_date: StartDate,
        end_date: EndDate,
        start_time: StartTime,
        end_time: EndTime,
      })
      .then((res) => {
        console.log(res);
      });
  };

  //delete todo list
  const handleDeleteTodo = (id) => {
    axios
      .post(`http://task.atiar.info/api/todo/delete`, {
        id: id,
      })
      .then((res) => {
        console.log(res);
      });
  };

  //complete a task
  const handleCompleteTask = (id) => {
    //element.classList.toggle("crossline");
    axios
      .post(`http://task.atiar.info/api/todo/complete`, {
        id: id,
      })
      .then((res) => {
        setStatus(res.status);
        console.log(res);
      });
  };

  return (
    <div>
      <div className="container">
        <div className="row  mt-5">
          <div className="col-md-10"></div>
          <div className="col-md-2 d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              Add ToDo
            </button>
            <div
              className="modal fade"
              id="exampleModal"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Add Todo
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <input
                        className="form-control mb-2"
                        type="text"
                        placeholder="Write Task Title"
                        onChange={(e) => setTitle(e.target.value)}
                      ></input>
                      <textarea
                        className="form-control mb-2"
                        placeholder="Write Task Note"
                        onChange={(e) => setNote(e.target.value)}
                      ></textarea>
                      <div className="d-flex">
                        <div className="w-50">
                          <label>Start Date</label>
                          <br />
                          <input
                            className="form-control"
                            onChange={(e) => setStartDate(e.target.value)}
                            type="date"
                          ></input>
                        </div>
                        <div className="w-50">
                          <label>Start Time</label>
                          <br />
                          <input
                            className="form-control"
                            onChange={(e) => setStartTime(e.target.value)}
                            type="time"
                          ></input>
                        </div>
                      </div>
                      <div className="d-flex">
                        <div className="w-50">
                          <label>End Date</label>
                          <br />
                          <input
                            className="form-control"
                            onChange={(e) => setEndDate(e.target.value)}
                            type="date"
                          ></input>
                        </div>
                        <div className="w-50">
                          <label>End Time</label>
                          <br />
                          <input
                            className="form-control"
                            onChange={(e) => setEndTime(e.target.value)}
                            type="time"
                          ></input>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      onClick={handleAddTodo}
                      className="btn btn-primary"
                    >
                      Add Notes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-3">
        {TaskList.map((item) => {
          return (
            <div key={item.id} className="card mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-10">
                    {/* {status ? <hr></hr> : ""} */}
                    <h2 className={item.is_completed == 1 ? "crossline" : ""}>
                      {item.title}
                    </h2>
                    <p>{item.note}</p>
                    <span>
                      Start Date: {item.start_date} at {item.start_time} -{" "}
                      {item.end_date} at {item.end_time}
                    </span>
                  </div>
                  <div className="col-md-2 d-flex justify-content-between align-items-center">
                    <input
                      onClick={() => handleCompleteTask(item.id)}
                      type="checkbox"
                      id=""
                      name=""
                      value=""
                    />
                    <FiEdit
                      onClick={() => handleUpdateTask(item.id)}
                      data-toggle="modal"
                      data-target="#exampleModal1"
                    />
                    <div
                      className="modal fade"
                      id="exampleModal1"
                      role="dialog"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              Update Todo Notes
                            </h5>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <form>
                              <input
                                className="form-control mb-2"
                                type="text"
                                placeholder="Write Task Title"
                                onChange={(e) => setTitle(e.target.value)}
                                value={singleTask?.title}
                              ></input>
                              <textarea
                                className="form-control mb-2"
                                placeholder="Write Task Note"
                                onChange={(e) => setNote(e.target.value)}
                                value={singleTask?.note}
                              ></textarea>
                              <div className="d-flex">
                                <div className="w-50">
                                  <label>Start Date</label>
                                  <br />
                                  <input
                                    className="form-control"
                                    value={singleTask?.start_date}
                                    onChange={(e) =>
                                      setStartDate(e.target.value)
                                    }
                                    type="date"
                                  ></input>
                                </div>
                                <div className="w-50">
                                  <label>Start Time</label>
                                  <br />
                                  <input
                                    className="form-control"
                                    value={singleTask?.start_time}
                                    onChange={(e) =>
                                      setStartTime(e.target.value)
                                    }
                                    type="time"
                                  ></input>
                                </div>
                              </div>
                              <div className="d-flex">
                                <div className="w-50">
                                  <label>End Date</label>
                                  <br />
                                  <input
                                    className="form-control"
                                    onChange={(e) => setEndDate(e.target.value)}
                                    value={singleTask?.end_date}
                                    type="date"
                                  ></input>
                                </div>
                                <div className="w-50">
                                  <label>End Time</label>
                                  <br />
                                  <input
                                    className="form-control"
                                    onChange={(e) => setEndTime(e.target.value)}
                                    value={singleTask?.end_time}
                                    type="time"
                                  ></input>
                                </div>
                              </div>
                            </form>
                          </div>

                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              type="button"
                              onClick={taskUpdated}
                              className="btn btn-primary"
                            >
                              Update Notes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <RiDeleteBin6Fill
                      onClick={() => handleDeleteTodo(item.id)}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Task;
