import { userConstants } from '../constants';
import { userService } from '../../services';
//import { alertActions } from './';
import { history } from '../../helpers';
export const userActions = {
    login,
    logout,
    getAll,
    showForm,
    userCreate,
    userUpdate,
    userUpdatePass,
    userRemove,
    userGet,
    pass,
    formUpload,
    submitted
};

function login(usuario) {
    const { login, senha } = usuario
    return dispatch => {

        userService.login(login, senha)
            .then(
                user => {
                    if (user.name) {
                        dispatch({
                            type: userConstants.USER_LOGIN,
                            user: null,
                            loggedIn: false
                        })
                    } else {
                        dispatch({
                            type: userConstants.USER_LOGIN,
                            user,
                            loggedIn: true
                        })
                        localStorage.setItem('user', JSON.stringify(user));
                        history.push('/')
                        history.go()
                    }


                },
                error => {
                    dispatch({
                        type: userConstants.USER_LOGIN,
                        user: null,
                        loggedIn: false

                    })
                }
            ).catch(() => {
                dispatch({
                    type: userConstants.USER_LOGIN,
                    user: null,
                    loggedIn: false

                })
            })
    }
}

function showForm() {
    return dispatch => {
        dispatch({ type: userConstants.USER_FORM_SHOW })
    }
}
function submitted() {
    return dispatch => {
        dispatch({ type: userConstants.USER_SUBMIT })
    }
}
function pass() {
    return dispatch => {
        dispatch({ type: userConstants.USER_PASS })
    }
}
function formUpload() {
    return dispatch => {
        dispatch({ type: userConstants.USER_FORM_UPLOAD })
    }
}
function userGet(user) {
    return dispatch => userService.userGetOne(user)
        .then(user => {
            dispatch(
                { type: userConstants.USER_LOADING, loading: true }
            )
            dispatch({ type: userConstants.USER_GET, user })
        },
            error => console.log(error)
        )
}
function logout() {
    return dispatch => {
        userService.logout();
        dispatch({ type: userConstants.USER_LOGOUT, user: null, loggedIn: false })
        history.push('/login')
        history.go()
    }

}//36110874

function getAll() {
    return dispatch => userService.userGetAll()
        .then(
            users => {
                dispatch(
                    { type: userConstants.USER_LOADING, loading: true }
                )
                dispatch({
                    type: userConstants.USER_GETALL,
                    users
                })

            },
            error => console.log(error)
        )

}


function userCreate(user) {
    return dispatch => {
        dispatch({ type: userConstants.USER_FORM_SHOW })
        userService.userCreate(user)
            .then(
                user => {
                    dispatch({
                        type: userConstants.USER_CREATE,
                        user
                    })
                    history.push('/usuarios')
                    history.go()
                },
                error => console.log(error)
            )
    }
}

function userUpdate(user) {
    return dispatch => {

        userService.userUpdate(user)
            .then(
                user => {
                    dispatch({
                        type: userConstants.USER_UPDATE,
                        user
                    })
                    history.push('/usuarios')
                    history.go()

                },
                error => console.log(error)
            )
    }


}
function userUpdatePass(user) {
    return dispatch => {

        userService.userUpdatePass(user)
            .then(
                user => {
                    dispatch({
                        type: userConstants.USER_UPDATE,
                        user
                    })
                    history.push('/usuarios')

                    history.go()
                },
                error => console.log(error)
            )
    }


}

function userRemove(user) {
    return dispatch => {

        userService.userRemove(user.id)
            .then(
                success => {
                    dispatch({
                        type: userConstants.USER_REMOVE,
                        user
                    })

                },
                error => console.log(error)
            )

    }
}

