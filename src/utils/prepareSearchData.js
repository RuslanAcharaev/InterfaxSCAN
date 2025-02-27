export const prepareSearchData = (formData) => {
    return {
        issueDateInterval: {
            startDate: new Date(formData.startDate).toISOString(),
            endDate: new Date(formData.endDate).toISOString()
        },
        searchContext: {
            targetSearchEntitiesContext: {
                targetSearchEntities: [
                    {
                        type: "company",
                        sparkId: null,
                        entityId: null,
                        inn: formData.inn,
                        maxFullness: formData.maxFullness,
                        inBusinessNews: formData.inBusinessNews || null
                    }
                ],
                onlyMainRole: formData.onlyMainRole,
                tonality: formData.tone,
                onlyWithRiskFactors: formData.onlyWithRiskFactors,
                riskFactors: {
                    and: [],
                    or: [],
                    not: []
                },
                themes: {
                    and: [],
                    or: [],
                    not: []
                }
            },
            themesFilter: {
                and: [],
                or: [],
                not: []
            }
        },
        searchArea: {
            includedSources: [],
            excludedSources: [],
            includedSourceGroups: [],
            excludedSourceGroups: []
        },
        attributeFilters: {
            excludeTechNews: !formData.excludeTechNews,
            excludeAnnouncements: !formData.excludeAnnouncements,
            excludeDigests: !formData.excludeDigests
        },
        similarMode: "duplicates",
        limit: Number(formData.documents),
        sortType: "issueDate",
        sortDirectionType: "desc",
        intervalType: "month",
        histogramTypes: [
            "totalDocuments",
            "riskFactors"
        ]
    };
};