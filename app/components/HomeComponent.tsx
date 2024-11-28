import { keyframes, Global, css } from '@emotion/react';

export default async function Home() {

  return (
    <Global
        styles={css`
            html, body {
                margin: 0;
                padding: 0;
                overflow: hidden; /* Prevents scrolling */
                height: 100%; /* Ensure it covers the full height */
            }
        `}  
    /> 
  );
}
