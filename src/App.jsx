import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [todo, setTodo] = useState([]);
  const [CurrentTime, setCurrentTime] = useState("");

  // to submit the button
  const handleClick = (e) => {
    e.preventDefault();
    const currentTime = new Date();
    const timeString = currentTime.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });

    const today = new Date().setHours(0, 0, 0, 0);
    const itemDate = new Date().setHours(0, 0, 0, 0);

    let dateString;
    if (itemDate === today) {
      dateString = "today";
    } else if (itemDate === today - 86400000) {
      dateString = "yesterday";
    } else {
      // Format the date as desired if it's not today or yesterday
      const options = { weekday: "long", month: "long", day: "numeric" };
      dateString = new Date(itemDate).toLocaleDateString([], options);
    }

    if (text === "") {
      return 0;
    } else {
      setTodo([
        ...todo,
        {
          value: text,
          id: Math.random() * 1000,
          content: false,
          date: `${dateString} :${timeString}`,
        },
      ]);
      setText("");
    }
  };

  // delete todo
  const deleteTodo = (id) => {
    const updateTodo = todo.filter((item) => item.id !== id);
    setTodo(updateTodo);
  };

  // active or not active
  const activity = (index) => {
    let copy = [...todo];
    todo[index].content = !todo[index].content;
    setTodo(copy);
  };

  // time
  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date();
      const formattedTime = currentDate.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      });
      setCurrentTime(` ${formattedTime}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  console.log(todo);
  return (
    <div className="container">
      <div className="subcontainer">
        <div className="backgroundpic">
          <h1 className="date">{CurrentTime}</h1>
        </div>
        <form className="form" action="">
          <div className="inputsec">
            <input
              className="input"
              placeholder="Note"
              value={text}
              type="text"
              name=""
              id=""
              onChange={(e) => setText(e.target.value)}
            />

            <button
              className="submitbutton"
              type="submit"
              onClick={handleClick}
            >
              <img src="/Frame 9.svg" alt="" />
            </button>
          </div>
          <ul className="list">
            {todo.map((item, index) => {
              return (
                <li className="listtodo" key={index}>
                  <div>
                    {item.value}
                    <p className="time">{item.date}</p>
                  </div>
                  <div className="trashandactivity">
                    <div
                      onClick={() => activity(index)}
                      className={item.content ? "active" : "nonactive"}
                    ></div>
                    <img
                      className="trash"
                      src="/trash.svg"
                      alt=""
                      onClick={() => deleteTodo(item.id)}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </form>
      </div>
    </div>
  );
}

export default App;
