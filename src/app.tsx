import { Meta, MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./styles/base.css";
import "./styles/forms.css";
import "./styles/layout.css";
import "./styles/normalize.css";
import "./styles/transitions.css";
import "./styles/typography.css";
import GlobalLoader from "./components/GlobalLoader";

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>Solid Movies</Title>
          <Meta charset="utf-8" />
          <Meta name="viewport" content="width=device-width,initial-scale=1" />
          <Suspense>{props.children}</Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
