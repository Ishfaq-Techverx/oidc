import { OidcProvider } from '@axa-fr/react-oidc';
import { useRouter } from 'next/router';

const configuration = {
  client_id: 'Product_Swagger',
  redirect_uri: 'http://localhost:3000/home',
  silent_redirect_uri: 'http://localhost:3000/home', // Optional activate silent-signin that use cookies between OIDC server and client javascript to restore the session
  scope: 'Product',
  // state:
  // 'V2VkIE1hciAyOSAyMDIzIDAzOjIxOjI0IEdNVCswNTAwIChQYWtpc3RhbiBTdGFuZGFyZCBUaW1lKQ',
  authority: 'https://sso.preview.fridaypos.com',
  // 'https://sso.preview.fridaypos.com/Account/Login?ReturnUrl=%2Fconnect%2Fauthorize%3Fresponse_type%3Dcode%26client_id%3DProduct_Swagger%26redirect_uri%3Dhttps%253A%252F%252Fproduct.preview.fridaypos.com%252Fswagger%252Foauth2-redirect.html%26scope%3DProduct%26state%3DV2VkIE1hciAyOSAyMDIzIDAzOjIxOjI0IEdNVCswNTAwIChQYWtpc3RhbiBTdGFuZGFyZCBUaW1lKQ%253D%253D',

  // 'https://sso.preview.fridaypos.com/Account/Login?ReturnUrl=%2Fconnect%2Fauthorize%3Fresponse_type%3Dcode%26client_id%3DProduct_Swagger%26redirect_uri%3Dhttps%253A%252F%252Fproduct.preview.fridaypos.com%252Fswagger%252Foauth2-redirect.html%26scope%3DProduct%26state%3DV2VkIE1hciAyOSAyMDIzIDAzOjIxOjI0IEdNVCswNTAwIChQYWtpc3RhbiBTdGFuZGFyZCBUaW1lKQ%253D%253D',
  // authority: 'https://sso.preview.fridaypos.com',
};

// const configuration = {
//   client_id: 'interactive.public.short',
//   redirect_uri: 'http://localhost:3001/#authentication/callback',
//   silent_redirect_uri: 'http://localhost:3001/#authentication/silent-callback', // Optional activate silent-signin that use cookies between OIDC server and client javascript to restore the session
//   scope: 'openid profile email api offline_access',
//   authority: 'https://demo.duendesoftware.com',
// };

// const configuration = {
//   client_id: 'Product_Swagger',
//   redirect_uri: 'http://localhost:3011/#authentication/callback',
//   silent_redirect_uri: 'http://localhost:3011/#authentication/silent-callback', // Optional activate silent-signin that use cookies between OIDC server and client javascript to restore the session
//   scope: 'openid profile email api offline_access',
//   authority: 'https://sso.preview.fridaypos.com',
// };

const onEvent = (configurationName, eventName, data) => {
  console.log(`oidc:${configurationName}:${eventName}`, data);
};

export default function Layout({ children }) {
  const router = useRouter();
  const withCustomHistory = () => {
    return {
      replaceState: (url) => {
        router
          .replace({
            pathname: url,
          })
          .then(() => {
            window.dispatchEvent(new Event('popstate'));
          });
      },
    };
  };
  return (
    <>
      <OidcProvider
        configuration={configuration}
        onEvent={onEvent}
        withCustomHistory={withCustomHistory}
      >
        <main>{children}</main>
      </OidcProvider>
    </>
  );
}
