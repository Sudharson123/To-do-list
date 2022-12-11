import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { todo, del, strike, nostrike, edit, editborder } from "./state/todostate";

function App() {
  const dispatch = useDispatch();
  const taskArray = useSelector((state) => state.todolist.todo);
  const [on, setOn] = useState(false);
  let [taskdes, setTask] = useState("");
  const [redalert, setRAlert] = useState(false);
  const [greenalert, setGAlert] = useState(false);
  const [border, setBorder] = useState("");
  const [object, setObj] = useState({});
  const [date, setDate] = useState("");
  const [hide, setHide] = useState(true)
  const [editt, setEdit] = useState(false)
  const [editvalue, setEditvalue] = useState("")
  const [editindex, setEditindex] = useState("")


const check = () => {
    if (!taskdes || !date) {
      return
    }
    dispatch(todo(object));
    setTask("");
    setGAlert("");
    setDate("");
    setRAlert("");
    setBorder("");
  }



const remove = (index) => {
    dispatch(del(index));
  };
  
  const taskadd = (e) => {
    setTask(e.target.value);
  };
  
const cross = (e, ind) => {
    const see = e.target.checked;
    if (see) {
      dispatch(strike(ind));
    } else {
      dispatch(nostrike(ind));
    }
  };
  
  
function dateadd(e) {
    let dat = e.target.value;
    setDate(e.target.value);
    const today = new Date();
    if (new Date(dat) < today) {
      setObj({
        task: taskdes,
        date: dat,
        text: "OverDue",
        textcolor: "red",
        line: "",
        bcolor: "black",
      });
      setRAlert("red");
      setBorder("red");
      setGAlert("");
    } else if (new Date(dat) >= today) {
      setBorder("blue");
      setRAlert("");
      setObj({
        task: taskdes,
        date: dat,
        text: "Task added",
        textcolor: "green",
        line: "",
        bcolor: "black",
      });
      setGAlert("green");
    }
  };
  
  
  return (
  <div className="App">
      <header>
        <h1>ToDoList</h1>
      </header>
      { /* -----------------------------ADD button----------------------------------------*/}

      {hide && <div>

        <button style={{ margin: "20px" }}
          onClick={() => {
            setOn(true);
            setHide(false);
          }}
        >

          ADD
        </button>
      </div>}
      { /* -----------------------------Edit function----------------------------------------*/}

      {editt && <>
        <input style={{ fontSize: 'x-large', textAlign: 'center', backgroundColor: 'rgb(231, 255, 228)' }} value={editvalue} onChange={(e) => setEditvalue(e.target.value)}></input>
        <button className="tick" onClick={
          () => {
            if (!editvalue) {
              return
            }
            dispatch(edit({ index: editindex, value: editvalue }))
            setEditvalue("")
            setEditindex("")
            dispatch(editborder({ index: editindex, color: "black" }))
            setEdit(false)
          }
        }>&#x2714;</button>
        <button style={{backgroundColor:"red",color:"white"}} onClick={
          ()=>{setEdit(false);
            dispatch(editborder({ index: editindex, color: "black" }))
          }}>&#10060;</button>
        </>
      }
      { /* -----------------------------task menus----------------------------------------*/}

      <div className="flex">
        {taskArray.map((item, index) => {
          return (
            <div style={{ borderColor: item.bcolor }} className="task">
              <h3>Task {index + 1}</h3>

              <input onClick={(e) => cross(e, index)} type="checkbox" ></input>
              <label >
                <span style={{ textDecoration: item.line }}>Task Name : {item.task}
                  <button className="edit" onClick={() => {
                    setEdit(true)
                    setEditvalue(item.task)
                    setEditindex(index)
                    dispatch(editborder({ index: index, color: "rgb(255, 0, 221)" }))
                  }}>&#x270E;</button>
                </span>

              </label>
              <h5>
                Date : <span>{item.date}</span>
              </h5>
              <h5 style={{ color: item.textcolor }}>
                Status : <span>{item.text}</span>
              </h5>
              <button
                className="del"
                style={{ backgroundColor: item.textcolor }}
                onClick={() => remove(index)}
              >
                X
              </button>
            </div>
          );
        })}
        { /* -----------------------------task input----------------------------------------*/}

        {on && (
          <div style={{ borderColor: border }} className="task box">
            <h3>TASK</h3>
            <input value={taskdes} onChange={(e) => taskadd(e)} placeholder="Task Description"></input>
            <input type="date" value={date} onChange={(e) => dateadd(e)}></input>
            {redalert && <h4 style={{ color: "red" }}>Over Due</h4>}
            {greenalert && (
              <h4 style={{ color: "green" }}>Due day is passed</h4>
            )}

            <button onClick={() => check()}>Submit</button>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
