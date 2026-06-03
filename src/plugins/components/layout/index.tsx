import { Suspense, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { sdk } from '@/core';

import './index.css';

/** 菜单组件 */
const Menu: React.FC<{ items: any[] }> = ({ items = [] }) => {
  const location = useLocation();
  const navigate = useNavigate();

  if (!items || items.length === 0) return null;

  return items.map((item) => {
    const { key, name, path, locale, children, hideInMenu = false } = item;

    let isAllowClick = true;
    if (
      children &&
      children.length > 0 &&
      children.filter((_) => !_.hideInMenu).length > 0
    ) {
      isAllowClick = false;
    }

    return (
      <li key={key} className='sdk-layout-menu-item'>
        <div
          className='sdk-layout-menu-item-title'
          style={{
            ...(location.pathname === path
              ? { background: '#e6f4ff', color: '#1677ff' }
              : {}),
            ...(hideInMenu ? { display: 'none' } : {}),
            cursor: isAllowClick ? 'pointer' : 'not-allowed',
          }}
          onClick={() => (isAllowClick ? navigate(path) : {})}
        >
          {name}
        </div>
        <ul className='sdk-layout-menu-sub'>
          <Menu items={children} />
        </ul>
      </li>
    );
  });
};

/** 布局组件 */
const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /** 菜单头点击事件 */
  const handleHeaderClick = () => {
    navigate('/');
  };

  /** 退出登录 */
  const handleLogoutClick = () => {
    sdk.app.pageToLogin();
  };

  useEffect(() => {
    // 是否有用户信息
    if (!sdk.app.user || Object.keys(sdk.app.user).length === 0)
      return handleLogoutClick();

    navigate(location.pathname);
  }, [location.pathname]);

  return (
    <div className='sdk-layout'>
      <div className='sdk-layout-header'>
        <div onClick={handleHeaderClick}>Logo</div>
        <button onClick={handleLogoutClick}>退出登录</button>
      </div>

      <div className='sdk-layout-content'>
        <ul className='sdk-layout-menu'>
          <Menu items={sdk.app.menuData || []} />
        </ul>

        <div className='sdk-layout-outlet'>
          <Suspense
            fallback={sdk.components.renderComponent('Loading', {
              isSuspense: true,
            })}
          >
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Layout;
