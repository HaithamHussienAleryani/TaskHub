import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"),
...prefix("about", [
    layout("routes/about.tsx", [
        index("screens/about/About.tsx")
    ]),


]),
route('hani/:id', 'routes/hani.tsx')

] satisfies RouteConfig;
