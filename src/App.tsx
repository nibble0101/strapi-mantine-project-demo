import React from "react";

import { Refine } from "@pankod/refine-core";
import {
  NotificationsProvider,
  notificationProvider,
  MantineProvider,
  Global,
  Layout,
  LightTheme,
  ReadyPage,
  ErrorComponent,
} from "@pankod/refine-mantine";

import { DataProvider } from "@pankod/refine-strapi-v4";
import routerProvider from "@pankod/refine-react-router-v6";

import { authProvider, axiosInstance } from "./authProvider";
import { API_URL } from "./constants";

function App() {
  return (
    <MantineProvider theme={LightTheme} withNormalizeCSS withGlobalStyles>
      <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
      <NotificationsProvider position="top-right">
        <Refine
          authProvider={authProvider}
          dataProvider={DataProvider(API_URL + `/api`, axiosInstance)}
          notificationProvider={notificationProvider}
          Layout={Layout}
          ReadyPage={ReadyPage}
          catchAll={<ErrorComponent />}
          routerProvider={routerProvider}
        />
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default App;
