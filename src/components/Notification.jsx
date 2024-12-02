import { useSelector } from "react-redux"

// eslint-disable-next-line react/prop-types
const Notification = ({content}) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {content}
    </div>
  )
}

const Notifications = () => {
  return (
    <div className="notificationsContainer">
      {useSelector(s=>s.notifications).map(n=><Notification key={n.id} content={n.content}/>)}
    </div>
  )
}

export default Notifications