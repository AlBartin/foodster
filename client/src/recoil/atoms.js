import {atom} from 'recoil'

export const currentUserState = atom({
    key: 'currentUserState',
    default: JSON.parse(localStorage.getItem('user'))
})

export const currentAuthState = atom({
    key: 'currentAuth',
    default: ''
})

export const businessesState = atom({
    key: 'businessesState',
    default: []
})

export const detailPopUpState = atom({
    key: 'detailPopUpState',
    default: false
})

export const detailBusinessState = atom({
    key: 'detailBusinessState',
    default: []
})
export const detailLocationState = atom({
    key: 'detailLocationState',
    default: {}
})