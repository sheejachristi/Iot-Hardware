import axios from 'axios';

// These lines are just to test expired tokens

// const oldToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTQyMjY4NzksImlhdCI6MTU5NDIyNTA3OSwidXNlcklkIjoiNWVkOTM5NTIwZDJhY2VlMTdkNTdlMGZhIn0._cXBLygVpVfSsscK7eOn2cas6UfR_LeezxalUVqPbG8"

// localStorage.setItem('AUTH_TOKEN', oldToken)

// const token = localStorage.getItem("AUTH_TOKEN")

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("AUTH_TOKEN")}`
axios.defaults.headers.common['x-mock-match-request-body'] = `true`

export default axios;
