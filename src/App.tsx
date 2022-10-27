import React, { useState } from "react";
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
    </AppProvider>
  );
};

export default App;
