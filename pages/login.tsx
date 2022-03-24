import { SpeechmaticsLogo } from '../components/icons-library';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../utils/auth-config';
import { Box, Button, Spinner } from '@chakra-ui/react';

export default function Login() {
  const router = useRouter();

  const { instance, accounts, inProgress } = useMsal();

  const loginRequest = {
    scopes: [],
    authority:
      'https://speechmaticsb2c.b2clogin.com/speechmaticsb2c.onmicrosoft.com/B2C_1A_SIGNIN_WITH_EMAIL',
  };

  useEffect(() => {
    let st: number;
    if (inProgress == 'none' && accounts.length > 0) {
      st = window.setTimeout(() => router.push('/home/'), 1000);
    }

    return () => window.clearTimeout(st);
  }, [inProgress, accounts, accounts?.length]);

  const loginHandler = () => {
    instance.loginRedirect(loginRequest).catch((error) => {
      console.log(error);
    });
  };

  const x = new URLSearchParams(global.window?.location.search)
  const loggedOutInfo = x.get('inactive') == 'true' ? <div>You were logged out due to an expired session.</div> : null;


  const LoginSub = () => {
    if (inProgress == 'startup' || inProgress == 'handleRedirect' || (accounts.length > 0 && inProgress === 'none')) {
      return <div className="login_text"><Spinner /></div>;
    } else if (inProgress == 'login') {
      return <div className="login_text"><Spinner /></div>;
    } else if (inProgress == 'none' && accounts.length == 0) {
      return (
        <div className="login_form">
          {loggedOutInfo}
          <Button variant="speechmatics" onClick={loginHandler}>
            Log in / Sign up ➔
          </Button>
        </div>
      );
    } else return <></>;
  };


  return (
    <div className="login_container">
      <SpeechmaticsLogo />
      <LoginSub />
    </div>
  );
}
