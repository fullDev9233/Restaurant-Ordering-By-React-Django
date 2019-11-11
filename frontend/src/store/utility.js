export const updateObject = (oldObject, updatedProperties) => {
    return{
        ...oldObject,
        ...updatedProperties
    }
}


export const isLogin = () => {
    console.log(localStorage.token)
    if (localStorage.token) {
        return true;
    }

    return false;
}