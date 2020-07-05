import { createStore } from 'redux'

const initalState = {
    showModal: {
        status: false,
        data: false,
    },
    isLogin: {
        status: JSON.parse(sessionStorage.getItem('authToken')) ? true : false,
        data: {
            token: sessionStorage.getItem('authToken') ? JSON.parse(sessionStorage.getItem('authToken')).token : '',
            author: sessionStorage.getItem('authToken') ? JSON.parse(sessionStorage.getItem('authToken')).author : '',
        }
        
    }
}
const reducer = (state = initalState, action) => {
    if(action.type === 'SHOWMODAL'){
        return{
            ...state,
            status: state.showModal.status = !state.showModal.status,
            data: action.payload ? state.showModal.data = action.payload : state.showModal.data = false
        }
    }
    if(action.type === 'ISLOGIN'){
        sessionStorage.setItem('authToken', JSON.stringify(action.payload))
        return {
            ...state,
            status: state.isLogin.status = true,
            token: state.isLogin.data.token = action.payload.token,
            author: state.isLogin.data.author = action.payload.author
        }
    }

    if(action.type === 'ISLOGOUT'){
        sessionStorage.removeItem('authToken')
        return{
            ...state,
            status: state.isLogin.status = false,
            token: state.isLogin.data.token = '',
            author: state.isLogin.data.author = ''
        }
    }
    return {...state}
    
}

const store = createStore(reducer);

export default store