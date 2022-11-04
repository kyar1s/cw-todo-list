import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import { useLocalStorage } from "react-use";
import { ITodo } from "../interfaces/ITodo";
import { TodoStatus } from "../interfaces/TodoStatus";
import { createSignClient } from "../services/cosmwasm";
import { junoConfig, malagaConfig } from "../utils/chainsConfig";
import { configKeplr } from "../utils/configKeplr";

const WASM_TODO_CODE_ID = 1804;
const JUNO_TODO_CODE_ID = 1760;

interface AppContextValue {
  clientAddr: string | null;
  setClientAddr: Dispatch<SetStateAction<string | null>>;
  connectWallet: () => void;
  todos: ITodo[];
  addTodo: (description: string) => void;
  contractAddr: string | undefined;
  instantiateTodoContract: () => void;
  queryTodos: () => void;
  deleteTodo: (id: number) => void;
  updateTodoDescription: (id: number, description: string) => void;
  updateTodoStatus: (id: number, status: TodoStatus) => void;
  chain?: string;
  changeChain: (chain: string) => void;
}

export const AppContext = React.createContext<AppContextValue | null>(null);

const AppProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [clientAddr, setClientAddr] = useState<string | null>(null);
  const [client, setClient] = useState<SigningCosmWasmClient | null>(null);
  const [allowPermission, setAllowPermission] =
    useLocalStorage<boolean>("allowPermission");
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [chain, setChain] = useLocalStorage("chain", "malaga-420");
  const [contractAddr, setContractAddr] = useLocalStorage<string>(
    `${chain}_contractAddr`
  );

  const instantiateTodoContract = async () => {
    if (!clientAddr || !client) return;
    const codeID =
      chain === "malaga-420" ? WASM_TODO_CODE_ID : JUNO_TODO_CODE_ID;
    const inst = await client.instantiate(
      clientAddr,
      codeID,
      { owner: clientAddr },
      "Todo-List",
      "auto"
    );
    const { contractAddress } = inst;
    setContractAddr(contractAddress);
  };

  const connectWallet = async () => {
    if (!chain) return;
    const config = chain === "malaga-420" ? malagaConfig : junoConfig;
    try {
      await window.keplr?.enable(chain);
    } catch (err) {
      await window.keplr?.experimentalSuggestChain(configKeplr(config));
      await window.keplr?.enable(chain);
    }
    const signer = window.keplr?.getOfflineSigner(chain);
    if (!signer) return;
    const client = await createSignClient(signer, config);
    const [{ address }] = await signer.getAccounts();
    setClient(client);
    setClientAddr(address);
    setAllowPermission(true);
  };

  useEffect(() => {
    connectWallet();
  }, [chain]);

  const queryTodos = async () => {
    if (!contractAddr || !client) return;
    const { todos } = await client.queryContractSmart(contractAddr, {
      get_todo_list: { addr: clientAddr, limit: 30 },
    });
    setTodos(todos);
  };

  const execute = async (msg: any) => {
    if (!clientAddr || !contractAddr || !client) return;
    // RPC Client doesn't support subscribe to events
    // const tmClient = await Tendermint34Client.connect(malagaConfig.rpc);
    // const stream = tmClient.subscribeTx(
    //   `tm.event = 'Tx' AND message.action = '/cosmwasm.wasm.v1.MsgExecuteContract' AND execute._contract_address CONTAINS '${contractAddr}'`
    // );
    // const sub = stream.subscribe({
    //   next: (event: any) => {
    //     console.log(Buffer.from(event.tx, "base64").toString("utf8"));
    //     console.log(event.result);
    //     console.log(event);
    //     sub.unsubscribe();
    //   },
    // });
    await toast.promise(
      client.execute(clientAddr, contractAddr, msg, "auto"),
      {
        loading: "Loading...",
        success: "Successfully executed!",
        error: "Error when executed",
      },
      {
        success: {
          icon: "🔥",
        },
      }
    );
    await queryTodos();
  };

  const addTodo = async (description: string) => {
    await execute({ add_todo: { description } });
  };

  const deleteTodo = async (id: number) => {
    await execute({ delete_todo: { id } });
  };

  const updateTodoDescription = async (id: number, description: string) => {
    await execute({ update_todo: { id, description } });
  };

  const updateTodoStatus = async (id: number, status: TodoStatus) => {
    await execute({ update_todo: { id, status } });
  };

  const changeChain = (chain: string) => {
    if (!chain) return;
    setChain(chain);
  };

  useEffect(() => {
    if (!allowPermission) return;
    connectWallet();
  }, []);

  useEffect(() => {
    if (!contractAddr || !client) return;
    queryTodos();
  }, [client]);

  return (
    <AppContext.Provider
      value={{
        clientAddr,
        setClientAddr,
        connectWallet,
        todos,
        addTodo,
        contractAddr,
        instantiateTodoContract,
        queryTodos,
        deleteTodo,
        updateTodoDescription,
        updateTodoStatus,
        chain,
        changeChain,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (!context) throw new Error("App Context Provider is not instanced");
  return context;
};

export default AppProvider;
