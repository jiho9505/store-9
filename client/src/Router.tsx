import React, { useState, useContext, useEffect } from 'react';
import styled from '@emotion/styled';

import useLocation from './hooks/customHooks/useLocation';
import { HistoryContext } from '@/hooks/context';

const history = window.history;

const Router = ({ children }) => {
  const [curLocation, setLocation] = useState(window.location.pathname);

  useEffect(() => {
    History.prototype.push = (path) => {
      history.pushState('', '', path);
      setLocation(path);
    };

    const movePage = ({ target }) => {
      const nextPath = target.location.pathname;
      setLocation(nextPath);
    };

    window.addEventListener('popstate', movePage);

    return () => {
      window.removeEventListener('popstate', movePage);
    };
  }, []);

  return (
    <HistoryContext.Provider value={{ curLocation, history }}>{children}</HistoryContext.Provider>
  );
};

const Route = ({ exact, path, children }) => {
  const curLocation = useLocation();

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
  const { history } = useContext(HistoryContext);

  const handleClickLink = () => {
    history.push(to);
  };

  return (
    <a {...rest} onClick={handleClickLink}>
      {children}
    </a>
  );
};

const NavLink = ({ to, children, ...props }) => {
  const { curLocation, history } = useContext(HistoryContext);
  const [isActive, setActive] = useState(curLocation === to);

  useEffect(() => {
    if (curLocation !== to) {
      setActive(false);
    }
  }, [curLocation]);

  const handleClickLink = () => {
    history.push(to);
    setActive(true);
  };

  return (
    <ActiveLink {...props} active={isActive} onClick={handleClickLink}>
      {children}
    </ActiveLink>
  );
};

type StyledComponentProps = {
  active: boolean;
};

const ActiveLink = styled.a<StyledComponentProps>`
  border-bottom: ${(props) => (props.active ? `2px solid #2AC1BC` : '')};
  color: ${(props) => (props.active ? '#2AC1BC' : 'inherit')};
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  margin-bottom: ${(props) => (props.active ? '-1px' : '0px')};
`;

export { Router, Route, Link, NavLink };
