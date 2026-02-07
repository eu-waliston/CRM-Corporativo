import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
// import { usetheme } from '../../context/ThemeContext';

import NotificationsDropdown from '../../pages/NotificationsDropdown';

import './MainLayout.css';
import {
  HomeIcon,
  UsersIcon,
  BriefcaseIcon,
  CogIcon,
  // BellIcon,
  ChevronDownIcon,
  // MoonIcon,
  // SunIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
  ChartPieIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  CalendarIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
// import { useTheme } from '@mui/material';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('dashboard');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  // const { isDark, toggleTheme } = useTheme();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const navigation = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      href: '/',
      icon: HomeIcon,
      badge: null,
    },
    {
      id: 'leads',
      name: 'Leads',
      href: '/leads',
      icon: UsersIcon,
      badge: '5',
    },
    {
      id: 'contacts',
      name: 'Contatos',
      href: '/contacts',
      icon: UserCircleIcon,
      badge: '12',
    },
    {
      id: 'deals',
      name: 'Negócios',
      href: '/deals',
      icon: BriefcaseIcon,
      badge: '8',
    },
    {
      id: 'reports',
      name: 'Relatórios',
      href: '/reports',
      icon: ChartPieIcon,
      badge: null,
    },
    {
      id: 'communications',
      name: 'Comunicações',
      href: '/communications',
      icon: EnvelopeIcon,
      badge: '3',
    },
    {
      id: 'calendar',
      name: 'Calendário',
      href: '/calendar',
      icon: CalendarIcon,
      badge: null,
    },
  ];

  const secondaryNavigation = [
    {
      id: 'settings',
      name: 'Configurações',
      href: '/settings',
      icon: CogIcon,
      badge: null,
    },
    {
      id: 'documents',
      name: 'Documentos',
      href: '/documents',
      icon: DocumentTextIcon,
      badge: null,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-xl border-r border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:inset-0 bbb`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-md">
                <SparklesIcon className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-400 dark:to-primary-600 bg-clip-text text-transparent">
                CRM Pro
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">v1.0.0</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="px-3 py-4">
          <div className="mb-6">
            <nav className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setActiveNav(item.id)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 group
                    ${
                      activeNav === item.id
                        ? 'bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/20 text-primary-700 dark:text-primary-300 shadow-sm'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                    }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`p-1.5 rounded-md mr-3 transition-colors
                      ${
                        activeNav === item.id
                          ? 'bg-white dark:bg-gray-800 shadow-sm'
                          : 'bg-gray-100 dark:bg-gray-800'
                      }`}
                    >
                      <item.icon
                        className={`w-4 h-4 transition-colors
                        ${
                          activeNav === item.id
                            ? 'text-primary-600 dark:text-primary-400'
                            : 'text-gray-500 dark:text-gray-400'
                        }`}
                      />
                    </div>
                    <span className="font-medium text-sm">{item.name}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`px-1.5 py-0.5 text-xs font-semibold rounded-full transition-colors
                      ${
                        activeNav === item.id
                          ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          </div>

          <div className="mb-4">
            <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              Sistema
            </h3>
            <nav className="space-y-1">
              {secondaryNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setActiveNav(item.id)}
                  className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200
                    ${
                      activeNav === item.id
                        ? 'bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/20 text-primary-700 dark:text-primary-300 shadow-sm'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                    }`}
                >
                  <item.icon
                    className={`w-4 h-4 mr-3 transition-colors
                    ${
                      activeNav === item.id
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  />
                  <span className="font-medium text-sm">{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* User Profile Card in Sidebar */}
          <div className="mt-4 px-3">
            <div className="p-3 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900/50 rounded-lg border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center space-x-3 mb-2">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                    {user?.name || 'Usuário'}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                    {user?.role || 'Administrador'}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-md transition-colors"
              >
                <ArrowRightOnRectangleIcon className="w-3.5 h-3.5 mr-1.5" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="lg:pl-64 relative teste ">
        {/* Header - Fixo no topo */}
        <header className="header-top-menu fixed top-0 right-0 left-0 z-40 h-14 flex items-center justify-between px-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-b border-gray-200/30 dark:border-gray-700/30 shadow-sm">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <div className="hidden md:flex items-center space-x-2">
              <div className="w-1 h-4 bg-gradient-to-b from-primary-500 to-primary-600 rounded-full"></div>
              <h1 className="text-base font-semibold text-gray-800 dark:text-white">
                {navigation.find((nav) => nav.id === activeNav)?.name ||
                  'Dashboard'}
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Search Bar */}
            <div className="hidden md:block relative">
              <input
                type="search"
                placeholder="Pesquisar..."
                className="w-48 pl-8 pr-3 py-1.5 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent text-sm transition-all"
              />
              <svg
                className="absolute left-2.5 top-2 w-3.5 h-3.5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Theme Toggle */}
            {/* <button
              onClick={toggleTheme}
              className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              title={
                isDark
                  ? 'Alternar para Modo Claro'
                  : 'Alternar para Modo Escuro'
              }
            >
              {isDark ? (
                <SunIcon className="w-4 h-4" />
              ) : (
                <MoonIcon className="w-4 h-4" />
              )}
            </button>*/}

            {/* Notifications */}
            <NotificationsDropdown />

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-2 p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-xs shadow">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 border border-white dark:border-gray-800 rounded-full"></div>
                </div>
                <ChevronDownIcon
                  className={`w-3.5 h-3.5 text-gray-400 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 w-48 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-fade-in">
                  <div className="p-1.5">
                    <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-700">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {user?.name || 'Usuário'}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                        {user?.email || 'usuario@email.com'}
                      </p>
                    </div>

                    <div className="py-0.5">
                      <Link
                        to="/profile"
                        className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <UserCircleIcon className="w-3.5 h-3.5 mr-2" />
                        Meu Perfil
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <CogIcon className="w-3.5 h-3.5 mr-2" />
                        Configurações
                      </Link>
                    </div>

                    <div className="pt-0.5 border-t border-gray-100 dark:border-gray-700">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-md transition-colors"
                      >
                        <ArrowRightOnRectangleIcon className="w-3.5 h-3.5 mr-2" />
                        Sair
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Conteúdo principal - Inicia depois do header fixo */}
        <div className="mt-14">
          <main className="p-4">
            <Outlet />
          </main>

          {/* Footer */}
          <footer className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-2 md:mb-0">
                © {new Date().getFullYear()} CRM Pro
              </div>
              <div className="flex items-center space-x-4">
                <a
                  href="#"
                  className="text-xs text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Termos
                </a>
                <a
                  href="#"
                  className="text-xs text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Privacidade
                </a>
                <a
                  href="#"
                  className="text-xs text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Suporte
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default MainLayout;
