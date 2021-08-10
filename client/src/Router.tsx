import React, { useState, useContext, useEffect } from 'react';
import styled from '@emotion/styled';

type historyContextType = {
  curLocation: string;
  onChangeLocation?: (path: string) => void;
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
    <HistoryContext.Provider value={{ curLocation, onChangeLocation: handleSetLocation, history }}>
      {children}
    </HistoryContext.Provider>
  );
};

const Route = ({ exact, path, children }) => {
  const { curLocation } = useContext(HistoryContext);

  const isMatched = (): boolean => {
    if (exact) {
      return path === curLocation;
    } else {
      return curLocation.match(path)?.index === 0;
    }
  };

  return isMatched() ? children : null;
};

const Link = ({ to, children, ...rest }) => {
  const { onChangeLocation } = useContext(HistoryContext);

  const handleClickLink = () => {
    onChangeLocation(to);
  };

  return (
    <a {...rest} onClick={handleClickLink}>
      {children}
    </a>
  );
};

const NavLink = ({ to, children, ...rest }) => {
  const { curLocation, onChangeLocation } = useContext(HistoryContext);
  const [isActive, setActive] = useState(curLocation === to);

  useEffect(() => {
    if (curLocation !== to) {
      setActive(false);
    }
  }, [curLocation]);

  const handleClickLink = () => {
    onChangeLocation(to);
    setActive(true);
  };

  return (
    <ActiveLink {...rest} active={isActive} onClick={handleClickLink}>
      {children}
    </ActiveLink>
  );
};

interface StyledComponentProps {
  active: boolean;
}

const ActiveLink = styled.a<StyledComponentProps>`
  border-bottom: ${(props) => (props.active ? `2px solid #2AC1BC` : '')};
  color: ${(props) => (props.active ? '#2AC1BC' : 'inherit')};
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
`;

export { Router, Route, Link, NavLink };
