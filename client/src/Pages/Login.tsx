import React from "react";

function Login() {
  const submitLogin = () => {
    localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImVtYWlsIjoibWlja2V5QGdtYWlsLmNvbSIsImlhdCI6MTU4NzM1MDMwOX0.h4oWnzbtfiBj6qQAoQeKR6mSdJX0Sr4YmmJpWNtstrw"
    );
  };
  return (
    <div>
      <h1>LOGIN</h1>

      <button onClick={() => submitLogin()}>LOG IN (hit refresh)</button>
    </div>
  );
}

export default Login;
