export default {
    i18n: {
        getTranslation(key) {
            return `${key}_translated`;
        },
    },

    models: {
        dataElementOperand: {
            list() {
                return Promise.resolve({
                    pager: {},
                    toArray() {
                        return [{
                            "id": "umC9U5YGDq4.HllvX50cXC0",
                            "displayName": "BS_COLL (N, DSD) TARGET: Blood Units Donated"
                        }, {
                            "id": "NYXJu5vwbhN.HllvX50cXC0",
                            "displayName": "BS_COLL (N, DSD): Blood Units Donated"
                        }, {
                            "id": "f2a9eOzfpR7.HllvX50cXC0",
                            "displayName": "BS_COLL (N, DSD_NARRATIVE) TARGET: Blood Units Donated"
                        }, {
                            "id": "Zh08CCOJSBD.HllvX50cXC0",
                            "displayName": "BS_COLL (N, DSD_NARRATIVE): Blood Units Donated"
                        }, {
                            "id": "BZhXcbNa5ST.HllvX50cXC0",
                            "displayName": "BS_COLL (N, TA) TARGET: Blood Units Donated"
                        }, {
                            "id": "ASaP3A4Y416.HllvX50cXC0",
                            "displayName": "BS_COLL (N, TA): Blood Units Donated"
                        }, {
                            "id": "ZRWQKII8MGE.HllvX50cXC0",
                            "displayName": "BS_COLL (N, TA_NARRATIVE) TARGET: Blood Units Donated"
                        }, {
                            "id": "i8tWnlUNx8Y.HllvX50cXC0",
                            "displayName": "BS_COLL (N, TA_NARRATIVE): Blood Units Donated"
                        }, {
                            "id": "QeOG3WUzmA6.HllvX50cXC0",
                            "displayName": "BS_SCREEN (N, DSD) TARGET: Blood Units Screened"
                        }, {
                            "id": "PxOshPbqvcS.HllvX50cXC0",
                            "displayName": "BS_SCREEN (N, DSD): Blood Units Screened"
                        }, {
                            "id": "Ug1EwSHROqq.XkqnsV4slkA",
                            "displayName": "BS_SCREEN (N, DSD, Result) TARGET: Blood Units Screened (Positive)"
                        }, {
                            "id": "Ug1EwSHROqq.ZZgjEm5kvv3",
                            "displayName": "BS_SCREEN (N, DSD, Result) TARGET: Blood Units Screened (Negative)"
                        }, {
                            "id": "K6s8m8peXb1.XkqnsV4slkA",
                            "displayName": "BS_SCREEN (N, DSD, Result): Blood Units Screened (Positive)"
                        }, {
                            "id": "K6s8m8peXb1.ZZgjEm5kvv3",
                            "displayName": "BS_SCREEN (N, DSD, Result): Blood Units Screened (Negative)"
                        }, {
                            "id": "q6U3AGvSwXg.HllvX50cXC0",
                            "displayName": "BS_SCREEN (N, TA) TARGET: Blood Units Screened"
                        }, {
                            "id": "jKmPaNuQHk8.HllvX50cXC0",
                            "displayName": "BS_SCREEN (N, TA): Blood Units Screened"
                        }, {
                            "id": "wZQY0el8aFh.XkqnsV4slkA",
                            "displayName": "BS_SCREEN (N, TA, Result) TARGET: Blood Units Screened (Positive)"
                        }, {
                            "id": "wZQY0el8aFh.ZZgjEm5kvv3",
                            "displayName": "BS_SCREEN (N, TA, Result) TARGET: Blood Units Screened (Negative)"
                        }, {
                            "id": "wDWEsNyP9Cx.XkqnsV4slkA",
                            "displayName": "BS_SCREEN (N, TA, Result): Blood Units Screened (Positive)"
                        }, {
                            "id": "wDWEsNyP9Cx.ZZgjEm5kvv3",
                            "displayName": "BS_SCREEN (N, TA, Result): Blood Units Screened (Negative)"
                        }, {
                            "id": "u7wdsUKFAzP.HllvX50cXC0",
                            "displayName": "C2.1.D (N, DSD) TARGET: PLHIV Min One Service"
                        }, {
                            "id": "mW3o9nJ7s9N.HllvX50cXC0",
                            "displayName": "C2.1.D (N, DSD): PLHIV Min One Service"
                        }, {
                            "id": "mNp9nSSstni.jhbMLCdnlj4",
                            "displayName": "C2.1.D (N, DSD, Age) TARGET: PLHIV Min One Service (<15)"
                        }, {
                            "id": "mNp9nSSstni.InPoG7SKDpr",
                            "displayName": "C2.1.D (N, DSD, Age) TARGET: PLHIV Min One Service (15+)"
                        }, {
                            "id": "nLLEMkklQHX.jhbMLCdnlj4",
                            "displayName": "C2.1.D (N, DSD, Age): PLHIV Min One Service (<15)"
                        }, {
                            "id": "nLLEMkklQHX.InPoG7SKDpr",
                            "displayName": "C2.1.D (N, DSD, Age): PLHIV Min One Service (15+)"
                        }, {
                            "id": "BCWxGCJr3DQ.Pv51tDz8wHc",
                            "displayName": "C2.1.D (N, DSD, Age/Sex) TARGET: PLHIV Min One Service (<15, Female)"
                        }, {
                            "id": "BCWxGCJr3DQ.sGE1IjFYNjF",
                            "displayName": "C2.1.D (N, DSD, Age/Sex) TARGET: PLHIV Min One Service (<15, Male)"
                        }, {
                            "id": "BCWxGCJr3DQ.NxWS31FH6DC",
                            "displayName": "C2.1.D (N, DSD, Age/Sex) TARGET: PLHIV Min One Service (15+, Female)"
                        }, {
                            "id": "BCWxGCJr3DQ.aXiCuDLkhT1",
                            "displayName": "C2.1.D (N, DSD, Age/Sex) TARGET: PLHIV Min One Service (15+, Male)"
                        }, {
                            "id": "btp56uGIcWp.Pv51tDz8wHc",
                            "displayName": "C2.1.D (N, DSD, Age/Sex): PLHIV Min One Service (<15, Female)"
                        }, {
                            "id": "btp56uGIcWp.sGE1IjFYNjF",
                            "displayName": "C2.1.D (N, DSD, Age/Sex): PLHIV Min One Service (<15, Male)"
                        }, {
                            "id": "btp56uGIcWp.NxWS31FH6DC",
                            "displayName": "C2.1.D (N, DSD, Age/Sex): PLHIV Min One Service (15+, Female)"
                        }, {
                            "id": "btp56uGIcWp.aXiCuDLkhT1",
                            "displayName": "C2.1.D (N, DSD, Age/Sex): PLHIV Min One Service (15+, Male)"
                        }, {
                            "id": "ZdUyMCgZaPE.bHhcxwpICvc",
                            "displayName": "C2.1.D (N, DSD, Sex) TARGET: PLHIV Min One Service (Female)"
                        }, {
                            "id": "ZdUyMCgZaPE.pKlxpSVb56h",
                            "displayName": "C2.1.D (N, DSD, Sex) TARGET: PLHIV Min One Service (Male)"
                        }, {
                            "id": "VkqivwxEmsn.bHhcxwpICvc",
                            "displayName": "C2.1.D (N, DSD, Sex): PLHIV Min One Service (Female)"
                        }, {
                            "id": "VkqivwxEmsn.pKlxpSVb56h",
                            "displayName": "C2.1.D (N, DSD, Sex): PLHIV Min One Service (Male)"
                        }, {
                            "id": "gUjAqkNDGRO.HllvX50cXC0",
                            "displayName": "C2.1.D (N, DSD_NARRATIVE) TARGET: PLHIV Min One Service"
                        }, {
                            "id": "yyWFOaerDl6.HllvX50cXC0",
                            "displayName": "C2.1.D (N, DSD_NARRATIVE): PLHIV Min One Service"
                        }, {
                            "id": "AQn4efLIUVY.HllvX50cXC0",
                            "displayName": "C2.1.D (N, NA) TARGET: PLHIV Min One Service"
                        }, {
                            "id": "Un33yMOksdx.HllvX50cXC0",
                            "displayName": "C2.1.D (N, NA): PLHIV Min One Service"
                        }, {
                            "id": "zpqufwVtmXW.jhbMLCdnlj4",
                            "displayName": "C2.1.D (N, NA, Age) TARGET: PLHIV Min One Service (<15)"
                        }, {
                            "id": "zpqufwVtmXW.InPoG7SKDpr",
                            "displayName": "C2.1.D (N, NA, Age) TARGET: PLHIV Min One Service (15+)"
                        }, {
                            "id": "KAQiPuFs21i.jhbMLCdnlj4",
                            "displayName": "C2.1.D (N, NA, Age): PLHIV Min One Service (<15)"
                        }, {
                            "id": "KAQiPuFs21i.InPoG7SKDpr",
                            "displayName": "C2.1.D (N, NA, Age): PLHIV Min One Service (15+)"
                        }, {
                            "id": "QWAUZtcQgjj.Pv51tDz8wHc",
                            "displayName": "C2.1.D (N, NA, Age/Sex) TARGET: PLHIV Min One Service (<15, Female)"
                        }, {
                            "id": "QWAUZtcQgjj.sGE1IjFYNjF",
                            "displayName": "C2.1.D (N, NA, Age/Sex) TARGET: PLHIV Min One Service (<15, Male)"
                        }, {
                            "id": "QWAUZtcQgjj.NxWS31FH6DC",
                            "displayName": "C2.1.D (N, NA, Age/Sex) TARGET: PLHIV Min One Service (15+, Female)"
                        }, {
                            "id": "QWAUZtcQgjj.aXiCuDLkhT1",
                            "displayName": "C2.1.D (N, NA, Age/Sex) TARGET: PLHIV Min One Service (15+, Male)"
                        }];
                    },
                });
            },
        },
    },
};
