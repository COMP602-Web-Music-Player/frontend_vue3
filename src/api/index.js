import request from "../utils/request";

/**
 * admin login api
 */
export const adminGetLogin = (data) =>{
    return request({method: 'post', url: '/api/v1/admin/adminLogin', data})
};

/**
 * 获取user列表数据的api
 */
export const getUser = (data) =>{
    return request({method: 'get', url: '/api/v1/admin/find', data})
}

/**
 * 获取music列表数据的api
 */
export const getMusic = (data) =>{
    return request({method: 'get', url: '/api/v1/admin/search', data})
};

/**
 * 编辑music info的api
 */
export const updateMusic = (data) =>{
    return request({method: 'get', url: '/api/v1/admin/updateDetails', data})
};

/**
 * delete user api
 */
export const deleteUser = (data) =>{
    return request({method: 'get', url: '/api/v1/admin/delete', data})
}

/**
 * music upload api
 */
export const uploadMusic = (data) =>{
    return request({method: 'post', url: '/api/v1/admin/upload', data})
};

/**
 * user login api
 */
export const userLogin = (data) =>{
    return request({method: 'post', url: '/api/v1/user/userLogin', data})
};

/**
 * user register api
 */
export const userRegister = (data) =>{
    return request({method: 'post', url: '/api/v1/user/userRegister', data})
};

/**
 * delete user api
 */
export const removeMusic = (data) =>{
    return request({method: 'get', url: '/api/v1/admin/remove', data})
};

/**
 * get user info api
 */
export const getUserInfo = (data) =>{
    return request({method: 'get', url: '/api/v1/admin/getAvatar', data})
};