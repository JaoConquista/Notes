import { ReactNode, createContext, useState } from 'react';

type TotalNotesContextProps = {
  children: ReactNode;
};

type TotalNumberProps = {
    total: number,
    setTotal: React.Dispatch<React.SetStateAction<number>>
}

const initial_value = {
    total: 0,
    setTotal: () => {}
}

export const TotalNotesContext = createContext<TotalNumberProps>(initial_value);

export const TotalNotesContextProvider = ({ children }: TotalNotesContextProps) => {

  const [total, setTotal] = useState(initial_value.total);

  return (
    <TotalNotesContext.Provider value={{total, setTotal}}>
      {children}
    </TotalNotesContext.Provider>
  );
};