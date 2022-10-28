import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout/Layout";
import TodosContainer from "./components/TodosContainer";
import AppProvider from "./providers/AppProvider";
import { configKeplr } from "./utils/configKeplr";

const App: React.FC = () => {
  return (
    <AppProvider>
      <Layout>
        <TodosContainer />
      </Layout>
      <Toaster />
    </AppProvider>
  );
};

export default App;
