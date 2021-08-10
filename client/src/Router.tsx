import React, { useState, useContext, useEffect } from 'react';

type historyContextType = {
  curLocation: string;
  onChangeLoc?: (path: string) => void;
  history?: History;
};

const HistoryContext = React.createContext<historyContextType>({ curLocation: '/' });

const Router = ({ children }) => {
  const [curLocation, setLocation] = useState(window.location.pathname);
  const history = window.history;

  const handleSetLocation = (path) => {
    history.pushState('', '', path);
    setLocation(path);
  };

  useEffect(() => {
    window.addEventListener('popstate', ({ target }) => {
      const nextPath = target.location.pathname;
      handleSetLocation(nextPath);
    });
  });

  return (
    <HistoryContext.Provider value={{ curLocation, onChangeLoc: handleSetLocation, history }}>
      {children}
    </HistoryContext.Provider>
  );
};

const Route = ({ exact, path, children }) => {
  const { curLocation } = useContext(HistoryContext);
  console.log(curLocation, path);

  const isMatched = (): boolean => {
    if (exact) {
      return path === curLocation;
    } else {
      return curLocation.match(path)?.index === 0;
    }
  };

  return isMatched() ? children : null;
};

const Link = ({ to, children }) => {
  const { onChangeLoc } = useContext(HistoryContext);

  const handleClickLink = () => {
    onChangeLoc(to);
  };

  return <div onClick={handleClickLink}>{children}</div>;
};

export { Router, Route, Link };
