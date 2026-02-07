import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    sidebarOpen: true,
    modalOpen: false,
    modalType: null,
    modalProps: {},
    notifications: [],
    loading: false,
    theme: localStorage.getItem('theme') || 'light',
    language: 'pt-BR',
    drawerOpen: false,
    toastQueue: [],
    activeTab: 'dashboard',
  },
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    openModal: (state, action) => {
      state.modalOpen = true;
      state.modalType = action.payload.type;
      state.modalProps = action.payload.props || {};
    },
    closeModal: (state) => {
      state.modalOpen = false;
      state.modalType = null;
      state.modalProps = {};
    },
    addNotification: (state, action) => {
      state.notifications.unshift({
        id: Date.now(),
        ...action.payload,
      });
      if (state.notifications.length > 5) {
        state.notifications.pop();
      }
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme);
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem('theme', state.theme);
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    toggleDrawer: (state) => {
      state.drawerOpen = !state.drawerOpen;
    },
    setDrawerOpen: (state, action) => {
      state.drawerOpen = action.payload;
    },
    addToast: (state, action) => {
      state.toastQueue.push({
        id: Date.now(),
        ...action.payload,
      });
    },
    removeToast: (state, action) => {
      state.toastQueue = state.toastQueue.filter(
        toast => toast.id !== action.payload
      );
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    // Para notificações em tempo real
    markNotificationAsRead: (state, action) => {
      const notification = state.notifications.find(
        n => n.id === action.payload
      );
      if (notification) {
        notification.read = true;
      }
    },
    markAllNotificationsAsRead: (state) => {
      state.notifications.forEach(notification => {
        notification.read = true;
      });
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  openModal,
  closeModal,
  addNotification,
  removeNotification,
  clearNotifications,
  setLoading,
  toggleTheme,
  setTheme,
  setLanguage,
  toggleDrawer,
  setDrawerOpen,
  addToast,
  removeToast,
  setActiveTab,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} = uiSlice.actions;

export default uiSlice.reducer;