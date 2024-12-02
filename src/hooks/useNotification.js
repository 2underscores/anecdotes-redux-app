import { useDispatch } from "react-redux";
import { addNotif, removeNotif } from "../reducers/notificationReducer";

export const useNotification = () => {
    const dispatch = useDispatch()
    
    return (content) => {
        const addAction = addNotif(content)
        dispatch(addAction)
        setTimeout(()=>{
            dispatch(removeNotif(addAction.payload.id))
        }, 2000)
    }
}