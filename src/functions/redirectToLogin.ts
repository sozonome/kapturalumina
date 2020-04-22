export default function redirectToLogin(props:any, isLoggedIn: boolean) {
  if(!isLoggedIn){
    props.history.replace('/login');
  }
  console.log('jalan????')
}
