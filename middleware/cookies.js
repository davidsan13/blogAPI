import Cookies from 'js-cookie';

function CookiesJwt(token) {
  Cookies.set('jwtToken', token, {
    httpOnly: true,
    secure: true,
  })
}