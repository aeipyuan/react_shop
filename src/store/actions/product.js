import { request } from '../../utils/request'
export default params => async dispatch => {
    let res = await request.get('/admin/products', { params });
    dispatch({
        type: "GETLIST",
        data: {
            ...res.data,
            page: params.page ? params.page : 1,
            per: params.per ? params.per : 1
        }
    })
}