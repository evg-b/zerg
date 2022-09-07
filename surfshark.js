import axios from 'axios'

const baseUrl = "https://api.surfshark.com"

const username = 'seber.bobilev@gmail.com'
const password = '130215240891'

async function loginSurfshark() {
  const axiosClient = axios.create()
  const url = `${baseUrl}/v1/auth/login`;
  const res = await axiosClient.post(url, {
    password,
    username,
  });

  const data = res.data;

  console.log('login response data')
  console.log(data)

  // this.token = data.token;
  // this.renewToken = data.renewToken;

  // this.updateAxiosToken();
  // this.isLoggedIn = true;

  // return res.data;
}

export {loginSurfshark}