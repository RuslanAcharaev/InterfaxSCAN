import {create} from 'zustand';
import {searchService} from "../services/searchService.js";
import {prepareSearchData} from "../utils/prepareSearchData.js";
import {prepareRequest} from "../utils/prepareRequest.js";

const documentsToLoad = 10;

const initialState = {
    searchParams: null,
    histogramData: null,
    documentIds: [],
    documents: [],
    isLoading: false,
    isDocumentsLoading: false,
    error: null,
    currentPage: 1,
    moreToLoad: false
};

const useSearchStore = create((set, get) => ({
        ...initialState,

        setSearchParams: (params) => set({searchParams: params}),
        setHistogramData: (data) => set({histogramData: data}),
        setDocumentIds: (items) => set({documentIds: items}),
        setLoading: (isLoading) => set({isLoading}),
        setError: (error) => set({error}),
        setDocuments: (docs) => set({documents: docs}),
        setDocsLoading: (isDocumentsLoading) => set({isDocumentsLoading}),

        objectSearch: async (formData) => {
            set({isLoading: true, error: null});

            try {
                console.log('1.1 Начало objectSearch');
                const searchParams = prepareSearchData(formData);
                set({searchParams});

                const histogramData = await searchService.search(searchParams);
                const rawDocumentIds = await searchService.getIds(searchParams);

                console.log('1.2 Получены сырые Ids', rawDocumentIds);

                const processedIds = rawDocumentIds.items?.filter(item => item && item.encodedId)
                    .map(item => item.encodedId) || []

                console.log('1.3 Преобразованные Ids', {
                    total: processedIds.length,
                    sample: processedIds.slice(0, 3)
                });

                set({
                    histogramData,
                    documentIds: processedIds,
                    currentPage: 1,
                    documents: [],
                    moreToLoad: processedIds.length > documentsToLoad,
                    isLoading: false
                });

                console.log('1.4 Состояние после установки:', get());

                if (processedIds.length > 0) {
                    await get().getDocuments();
                }

                return true;
            } catch (error) {
                console.log('!Ошибка в objectSearch:', error)
                set({error: error.message, isLoading: false});
                return false;
            }
        },

        getDocuments: async () => {
            const state = get();
            console.log('2.1 getDocuments вызван, текущее состояние:', {
                isDocumentsLoading: state.isDocumentsLoading,
                moreToLoad: state.moreToLoad,
                currentPage: state.currentPage,
                totalIds: state.documentIds?.length
            });

            if (!state.documentIds?.length) {
                console.log('2.! Выход из getDocuments: нет ID документов')
                return;
            }

            if (state.isDocumentsLoading) {
                console.log('2.! Выход из getDocuments: загрузка уже идет');
                return;
            }

            set({isDocumentsLoading: true});
            console.log('2.2 Установлен флаг загрузки');

            try {
                const startIndex = (state.currentPage - 1) * documentsToLoad;
                const endIndex = startIndex + documentsToLoad;

                console.log('2.3 Подготовка запроса:', {
                    startIndex,
                    endIndex,
                    pageSize: documentsToLoad
                });

                const requestData = prepareRequest(
                    state.documentIds,
                    startIndex,
                    endIndex
                );
                console.log('2.4 Подготовлен запрос:', {
                    idsCount: requestData.ids.length,
                    ids: requestData.ids
                });

                const documentsData = await searchService.getDocuments(requestData);

                set(state => ({
                    documents: [...(state.documents || []), ...documentsData],
                    currentPage: state.currentPage + 1,
                    moreToLoad: endIndex < state.documentIds.length,
                }));
                console.log('2.5 Документы загружены:', {
                    newCount: documentsData.length,
                    totalLoaded: get().documents.length,
                    moreToLoad: get().moreToLoad
                })

                return true;
            } catch (error) {
                console.log('!Ошибка в getDocuments:', error)
                set({error: error.message});
                return false;
            } finally {
                set({isDocumentsLoading: false})
            }
        },

        clearAll: () => set(initialState),
    }),
);

export {useSearchStore}