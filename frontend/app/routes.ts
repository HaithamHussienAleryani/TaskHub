import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/auth/AuthLayout.tsx", [
    index("routes/root/home.tsx"),
    route("sign-in", "routes/auth/SignIn.tsx"),
    route("sign-up", "routes/auth/SignUp.tsx"),
    route("forgot-password", "routes/auth/ForgotPassword.tsx"),
    route("reset-password", "routes/auth/ResetPassword.tsx"),
    route("verify-email", "routes/auth/VerifyEmail.tsx"),
  ]),
  layout('routes/dashboard/dashboard-layout.tsx', [
    route('dashboard', 'routes/dashboard/index.tsx',)
  ])
] satisfies RouteConfig;
