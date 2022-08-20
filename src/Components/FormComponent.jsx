import { useState, Fragment } from "react";

const FormComponent = (props) => {
  const { userInfo, setUserInfo } = props;
  const { current, prevHistory } = userInfo;
  const [title, setTitle] = useState("");
  const [dateTime, setDateTime] = useState("");

  const startBtnHandler = (event) => {
    event.preventDefault();
    if (title === "" || dateTime === "") return;
    const obj = {
      startTime: dateTime,
      title: title,
    };
    console.log(obj);
    setUserInfo({ ...userInfo, current: obj });
  };

  const onResetBtnHandler = (event) => {
    event.preventDefault();
    const now = new Date();
    const formattedTime = `${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()}T${now.getHours()}:${now.getMinutes()}`;
    const obj = {
      startTime: current.startTime,
      endTime: formattedTime,
      title: current.title,
      streaks: calculateStreak(current.startTime, formattedTime),
    };
    setUserInfo({
      ...userInfo,
      current: null,
      prevHistory: [...prevHistory, obj],
    });
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    if (name === "title") setTitle(value);
    else if (name === "dateTime") setDateTime(value);
  };

  const calculateStreak = (startTime, endTime = null) => {
    let now;
    if (endTime === null) {
      now = new Date();
      endTime = `${now.getFullYear()}-${
        now.getMonth() + 1
      }-${now.getDate()}T${now.getHours()}:${now.getMinutes()}`;
    }

    const date1 = new Date(
      `${startTime.split("-")[1]}/${startTime.split("-")[2].split("T")[0]}/${
        startTime.split("-")[0]
      }`
    );
    const date2 = new Date(
      `${endTime.split("-")[1]}/${endTime.split("-")[2].split("T")[0]}/${
        endTime.split("-")[0]
      }`
    );
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <form>
      {current === null && (
        <Fragment>
          <label htmlFor="challenge-title">Challenge Title</label>
          <input
            type="text"
            id="challenge-title"
            name="title"
            value={title}
            onChange={onChangeHandler}
            required
          />
          <input
            type="datetime-local"
            value={dateTime}
            id="challenge-time"
            name="dateTime"
            onChange={onChangeHandler}
            required
          />
          <button type="submit" onClick={startBtnHandler}>
            Start
          </button>
        </Fragment>
      )}
      {current !== null && (
        <Fragment>
          <span>{current.title}</span>
          <span>Streaks🔥🔥🔥</span>
          <span>{calculateStreak(current.startTime)}</span>
          <button onClick={onResetBtnHandler}>Reset</button>
        </Fragment>
      )}
    </form>
  );
};

export default FormComponent;
