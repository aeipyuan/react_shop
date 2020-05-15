/* token相关操作 */
let getToken = () => window.localStorage.getItem('token');
let setToken = (val) => window.localStorage.setItem('token', val);
let clearToken = () => window.localStorage.removeItem('token');
export { getToken, setToken, clearToken };