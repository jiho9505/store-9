import React, { useState, useContext, useEffect, useMemo } from 'react';
import styled from '@emotion/styled';

import useLocation from './hooks/customHooks/useLocation';
import { HistoryContext } from '@/hooks/context';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

const history = window.history;

// let success = false;
const Router = ({ children }) => {
  // console.log('start: -------------', children);
  const [curLocation, setLocation] = useState(window.location.pathname);

  useEffect(() => {
    History.prototype.push = (path) => {
      history.pushState('', '', path);
      setLocation(path);
      // success = false;
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

const haveRouterParameter = (path: string, curLocation: string): boolean => {
  if (path.includes(':')) {
    if (curLocation === '/') return false;
    const curLocationLastSlashIdx = curLocation.lastIndexOf('/');
    const pathLastSlashIdx = path.lastIndexOf('/');
    const curLocationBeforeSlash = curLocation.slice(0, curLocationLastSlashIdx);
    const pathBeforeSlash = path.slice(0, pathLastSlashIdx);

    return curLocationBeforeSlash === pathBeforeSlash;
  }
  return false;
};

type RouteType = {
  exact?: boolean;
  path: string;
  children: ReactJSXElement;
};
const Route = ({ exact = false, path, children }: RouteType) => {
  // console.log('children: ', children);
  // console.log('success: ', success);
  // console.log('path: ', path);
  // if (success) return null;
  // console.log('success-after: ', success);

  const curLocation = useLocation();
  // console.log('curLocation: ', curLocation);

  const isMatched = (): boolean => {
    if (exact) {
      const result = haveRouterParameter(path, curLocation);
      if (result) return true;
      return path === curLocation;
    } else {
      return curLocation.match(path)?.index === 0;
    }
  };
  // console.log('isMatched: ', isMatched());

  if (isMatched()) {
    // success = true;
    // console.log('success: ', success);

    return children;
  }
  return null;
};

const Link = ({ to, children, ...rest }) => {
  const { history } = useContext(HistoryContext);

  const handleClickLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
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
  const isActive = useMemo(() => curLocation === to, [curLocation]);

  const handleClickLink = () => {
    history.push(to);
  };

  return (
    <ActiveLink {...props} isActive={isActive} onClick={handleClickLink}>
      {children}
    </ActiveLink>
  );
};

type StyledComponentProps = {
  isActive: boolean;
};

const setStyle = (props) => {
  const { activeStyle, isActive } = props;
  if (activeStyle !== undefined && isActive) {
    return Object.entries(activeStyle)
      .map(([key, value]) => {
        return `${key}: ${value}`;
      })
      .join(';');
  }
  return '';
};

const ActiveLink = styled.a<StyledComponentProps>`
  border-bottom: ${(props) => (props.isActive ? `2px solid #2AC1BC` : '')};
  color: ${(props) => (props.isActive ? '#2AC1BC' : 'inherit')};
  font-weight: ${(props) => (props.isActive ? 'bold' : 'normal')};
  margin-bottom: ${(props) => (props.isActive ? '-1px' : '0px')};
  ${(props) => {
    return setStyle(props);
  }}
`;

export { Router, Route, Link, NavLink };
