export const updateObject = (oldObject, updatedProperties) => {
    return{
        ...oldObject,
        ...updatedProperties
    }
}


export const isLogin = () => {
    if (localStorage.token) {
        return true;
    }

    return false;
}