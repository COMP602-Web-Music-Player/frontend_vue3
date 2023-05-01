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