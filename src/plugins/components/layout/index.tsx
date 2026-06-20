import { Suspense, useEffect, type CSSProperties } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { sdk } from '@/core';

const styles: Record<string, CSSProperties> = {
  layout: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: '#f5f7fb',
  },

  header: {
    height: 64,
    padding: '0 24px',
    background: '#fff',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    zIndex: 10,
  },

  logo: {
    fontSize: 20,
    fontWeight: 700,
    color: '#1677ff',
    cursor: 'pointer',
    userSelect: 'none',
  },

  logoutBtn: {
    height: 36,
    padding: '0 16px',
    border: 'none',
    borderRadius: 8,
    background: '#ff4d4f',
    color: '#fff',
    cursor: 'pointer',
    transition: '0.2s',
  },

  main: {
    flex: 1,
    display: 'flex',
    overflow: 'hidden',
  },

  sidebar: {
    width: 240,
    padding: 16,
    background: '#fff',
    borderRight: '1px solid #e5e7eb',
    overflowY: 'auto',
  },

  content: {
    flex: 1,
    padding: 20,
    overflowY: 'auto',
  },

  contentCard: {
    minHeight: '100%',
    padding: 24,
    background: '#fff',
    borderRadius: 16,
    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
  },

  menuItem: {
    marginBottom: 4,
  },

  menuTitle: {
    height: 42,
    padding: '0 14px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 10,
    color: '#1f2937',
    cursor: 'pointer',
    transition: '0.2s',
  },

  menuChildren: {
    marginLeft: 12,
    paddingLeft: 12,
    borderLeft: '1px solid #e5e7eb',
  },
};

/** 菜单组件 */
const Menu: React.FC<{ items: any[] }> = ({ items = [] }) => {
  const location = useLocation();
  const navigate = useNavigate();

  if (!items?.length) return null;

  return items.map((item) => {
    const { key, name, path, children, hideInMenu = false } = item;

    if (hideInMenu) return null;

    const hasChildren =
      children && children.filter((_: any) => !_.hideInMenu).length > 0;

    const active = location.pathname === path;

    /** 鼠标移入事件 */
    const handleMouseEnter = (e) => {
      if (active) return;
      e.currentTarget.style.background = '#f3f4f6';
    };

    /** 鼠标移出事件 */
    const handleMouseLeave = (e) => {
      if (active) return;
      e.currentTarget.style.background = 'transparent';
    };

    /** 点击事件 */
    const handleClick = () => {
      if (hasChildren) return;
      navigate(path);
    };

    return (
      <div key={key} style={styles.menuItem}>
        <div
          style={{
            ...styles.menuTitle,

            ...(active ? { background: '#e8f3ff', color: '#1677ff' } : {}),

            ...(hasChildren ? { cursor: 'not-allowed' } : {}),
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        >
          {name}
        </div>

        {hasChildren && (
          <div style={styles.menuChildren}>
            <Menu items={children} />
          </div>
        )}
      </div>
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

  /** 鼠标移入事件 */
  const handleMouseEnter = (e) => {
    e.currentTarget.style.opacity = '0.75';
  };

  /** 鼠标移出事件 */
  const handleMouseLeave = (e) => {
    e.currentTarget.style.opacity = '1';
  };

  useEffect(() => {
    // 是否有用户信息
    if (!sdk.app.user || Object.keys(sdk.app.user).length === 0)
      return handleLogoutClick();

    navigate(location.pathname);
  }, [location.pathname]);

  return (
    <div style={styles.layout}>
      <header style={styles.header}>
        <div style={styles.logo} onClick={handleHeaderClick}>
          Logo
        </div>

        <button
          style={styles.logoutBtn}
          onClick={handleLogoutClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          退出登录
        </button>
      </header>

      <div style={styles.main}>
        <aside style={styles.sidebar}>
          <Menu items={sdk.app.menus || []} />
        </aside>

        <main style={styles.content}>
          <div style={styles.contentCard}>
            <Suspense
              fallback={sdk.components.renderComponent('Loading', {
                isSuspense: true,
              })}
            >
              <Outlet />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
