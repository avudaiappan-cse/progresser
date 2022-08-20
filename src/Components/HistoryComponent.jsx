const HistoryComponent = (props) => {
  const { userInfo } = props;
  return (
    <div>
      {userInfo.prevHistory.map((history, idx) => {
        return (
          <div key={idx}>
            <span>{history.streaks}</span>
            <span>{history.title}</span>
            <span>{history.startTime}</span>
            <span>{history.endTime}</span>
          </div>
        );
      })}
    </div>
  );
};

export default HistoryComponent;
