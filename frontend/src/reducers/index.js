export default function (state={},action){
    if(action.type=="LOGGED_IN"){
        state.loggedIn=action.payload
    }
    return {...state}
}