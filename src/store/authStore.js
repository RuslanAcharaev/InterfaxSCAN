import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {authService} from '../services/authService';

const initialState = {
    token: null,
    expireDate: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    usedCompanyCount: null,
    companyLimit: null,
    isInfoLoading: false,
};

const useAuthStore = create(
    persist(
        (set, get) => ({
            ...initialState,

            setToken: (token, expireDate) => {
                set({
                    token,
                    expireDate,
                    isAuthenticated: true,
                    error: null
                });
            },

            setError: (error) => set({error}),
            setLoading: (isLoading) => set({isLoading}),
            setCompanyCount: (usedCompanyCount) => set({usedCompanyCount}),
            setCompanyLimit: (companyLimit) => set({companyLimit}),
            setInfoLoading: (isInfoLoading) => set({isInfoLoading}),

            login: async (login, password) => {
                const {setLoading, setToken, setError} = get();

                try {
                    console.log('0.1 Начало авторизации')
                    setLoading(true);
                    setError(null);

                    const {accessToken, expire} = await authService.login({login, password});
                    setToken(accessToken, expire);
                    console.log('0.2 Авторизация пройдена:', {
                        token: accessToken,
                        expire: new Date(expire),
                    })

                } catch (error) {
                    setError(error.message);
                    return {
                        success: false,
                        error: error.message
                    };
                } finally {
                    setLoading(false);
                }

                return true;
            },

            info: async () => {
                const {setError, setCompanyCount, setCompanyLimit, setInfoLoading} = get();

                try {
                    setInfoLoading(true);

                    const {eventFiltersInfo} = await authService.info();

                    setCompanyCount(eventFiltersInfo.usedCompanyCount);
                    setCompanyLimit(eventFiltersInfo.companyLimit);
                } catch (error) {
                    setError(error.message);
                    return false;
                } finally {
                    setInfoLoading(false);
                }

                return true;
            },

            logout: async () => {
                set(initialState);
            },

            checkAuthStatus: () => {
                const state = get();
                if (!state.token || (state.expireDate && new Date(state.expireDate) <= new Date())) {
                    get().logout();
                    return false;
                }
                return true;
            },

        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                token: state.token,
                expireDate: state.expireDate,
                isAuthenticated: state.isAuthenticated,
                usedCompanyCount: state.usedCompanyCount,
                companyLimit: state.companyLimit,
            })
        }
    )
);

export {useAuthStore};
