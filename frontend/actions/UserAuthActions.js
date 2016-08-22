export function setAuthUser(serverUID,userRole){
    return {
        type: 'SET_AUTH_USER',
        user:{
            userEmail: serverUID,
            userRole: userRole
        }
    }
}