import ProLayout from '@ant-design/pro-layout';
import { Suspense } from 'react';
import { Outlet, useLocation, useMatches, useNavigate } from 'react-router-dom';
import { useStore } from 'zustand';

import { sdk } from '@/core';

/** 布局组件 */
const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const matches = useMatches();

  const locale = useStore(sdk.store, (state) => state.locale);

  const currentMatch = matches[matches.length - 1]?.handle?.crumb() || {};
  const noLayout = JSON.parse(currentMatch?.routeAttr || '{}')?.noLayout;

  /** 菜单点击事件 */
  const handleMenuClick = (item: any) => {
    navigate(item.path);
  };

  /** 菜单头点击事件 */
  const handleMenuHeaderClick = () => {
    navigate('/');
  };

  /** 页面切换事件 */
  const handlePageChange = (location: Location) => {
    // 是否有用户信息
    if (!sdk.app.user || Object.keys(sdk.app.user).length === 0)
      return sdk.app.pageToLogin();
  };

  return (
    <ProLayout
      locale={locale as any}
      formatMessage={({ id, defaultMessage }) =>
        sdk.i18n.intl.get(id).d(defaultMessage)
      }
      location={location}
      menuItemRender={(item, dom) => (
        <div onClick={() => handleMenuClick(item)}>{dom}</div>
      )}
      onMenuHeaderClick={handleMenuHeaderClick}
      onPageChange={handlePageChange}
      {...(noLayout && {
        headerRender: false,
        footerRender: false,
        menuRender: false,
      })}
      menu={{
        request: async () => sdk.app.menuData || [],
        ...sdk.config.proLayoutConfig.menu,
      }}
      {...sdk.config.proLayoutConfig}
    >
      <Suspense
        fallback={sdk.ui.renderComponent('Loading', { isSuspense: true })}
      >
        <Outlet />
      </Suspense>
    </ProLayout>
  );
};

export default Layout;
