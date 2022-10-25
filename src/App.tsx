import React, { useState } from "react";
import Layout from "./components/Layout/Layout";
import AppProvider from "./providers/AppProvider";
import { configKeplr } from "./utils/configKeplr";

const App: React.FC = () => {
  return (
    <AppProvider>
      <Layout>
        <div className="text-white">Welcome to your TODO-LIST</div>
      </Layout>
    </AppProvider>
  );
};

export default App;
