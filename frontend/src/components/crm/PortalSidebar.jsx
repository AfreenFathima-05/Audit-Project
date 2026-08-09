import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, FolderOpen, FileText, Settings } from 'lucide-react';

const PortalSidebar = ({ role }) => {
  const getNavItems = () => {
    switch (role) {
      case 'admin':
        return [
          { name: 'Dashboard', icon: LayoutDashboard, path: '/crm/admin/dashboard' },
          { name: 'Clients', icon: Users, path: '/crm/admin/clients' },
          { name: 'Projects', icon: FolderOpen, path: '/crm/admin/projects' },
          { name: 'Reports', icon: FileText, path: '/crm/admin/reports' },
          { name: 'Documents', icon: FolderOpen, path: '/crm/admin/documents' },
          { name: 'Settings', icon: Settings, path: '/crm/admin/settings' },
        ];
      case 'junior':
        return [
          { name: 'My Dashboard', icon: LayoutDashboard, path: '/crm/junior/dashboard' },
          { name: 'My Tasks', icon: FolderOpen, path: '/crm/junior/tasks' },
          { name: 'Documents', icon: FileText, path: '/crm/junior/documents' },
        ];
      case 'client':
        return [
          { name: 'Dashboard', icon: LayoutDashboard, path: '/crm/client/dashboard' },
          { name: 'My Projects', icon: FolderOpen, path: '/crm/client/projects' },
          { name: 'Vault', icon: FileText, path: '/crm/client/vault' },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="w-64 bg-portal-card border-r border-portal-line min-h-[calc(100vh-73px)] hidden lg:block sticky top-[73px]">
      <div className="py-8 px-4 flex flex-col gap-2">
        <p className="px-4 text-xs font-semibold uppercase tracking-wider text-portal-muted mb-2">Menu</p>
        {navItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-semibold text-sm ${
                isActive && item.path !== '#'
                  ? 'bg-theme-charcoal text-white shadow-md'
                  : 'text-portal-muted hover:bg-portal-bg hover:text-portal-ink'
              }`
            }
          >
            <item.icon size={18} />
            {item.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default PortalSidebar;
