import { type RouteConfig, layout, route } from "@react-router/dev/routes";

export default [
  layout("routes/auth/AuthLayout.tsx", [
    route("sign-in", "routes/auth/SignIn.tsx"),
    route("sign-up", "routes/auth/SignUp.tsx"),
    route("forgot-password", "routes/auth/ForgotPassword.tsx"),
    route("reset-password", "routes/auth/ResetPassword.tsx"),
    route("verify-email", "routes/auth/VerifyEmail.tsx"),
  ]),
] satisfies RouteConfig;
