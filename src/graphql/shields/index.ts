// Contextual
import {allow, and, deny, rule, shield} from "graphql-shield";
import {ApolloError} from "apollo-server-express";
import {JWT} from "../../middlewares/json-web-token.middleware";

export const hasValidToken = rule({ cache: 'contextual' })(
    async (parent, args, ctx, info) => {
        if (!ctx.token) {
            return new ApolloError('UNAUTHORISED')
        }
        return !!(await JWT(ctx.token))
    },
)

export const isAdmin = rule({ cache: 'contextual' })(
    async (parent, args, ctx, info) => {
        const payload = await JWT(ctx.token);
        const isAdmin = payload.role.toUpperCase() === 'ADMIN';
        if (!isAdmin) {
            return new ApolloError('INSUFFICIENT_PERMISSION')
        }
        return ctx.client.isAdmin
    },
)

export const Permissions = shield({
    Query: {
        '*': deny,
        users: and(hasValidToken, allow),
        user: and(hasValidToken, allow),
        roles: and(hasValidToken, allow),
        fournisseurs: and(hasValidToken, allow),
        catalogueGroupes: and(hasValidToken, allow),
        catalogueSettings: and(hasValidToken, allow),
        catalogueSettingsByGroupeId: and(hasValidToken, allow),
        catalogueImports: and(hasValidToken, allow),
        catalogues: and(hasValidToken, allow),
        histories: and(hasValidToken, allow),
        bonDeCommandes: and(hasValidToken, allow),
        searches: and(hasValidToken, allow),
        countOccurence: and(hasValidToken, allow),
        clients: and(hasValidToken, allow),
        factures: and(hasValidToken, allow),
        archives: and(hasValidToken, allow),
        refsMap:and(hasValidToken, allow),
        productRefs: and(hasValidToken,allow),
        findLastRefsMap: and(hasValidToken,allow),
        viewFacture: allow,
       
    
    },
    Mutation: {
        '*': deny,
        logout: allow,
        login: allow,
        validateToken: allow,

        addUser: and(hasValidToken, allow),
        updateUserById: and(hasValidToken, allow),
        deleteUserById: and(hasValidToken, allow),

        addRole: and(hasValidToken, allow),
        updateRoleById: and(hasValidToken, allow),
        deleteRoleById: and(hasValidToken, allow),

        addFournisseur: and(hasValidToken, allow),
        updateFournisseurById: and(hasValidToken, allow),
        deleteFournisseurById: and(hasValidToken, allow),
        addOneFournisseur: and(hasValidToken, allow),

        addCatalogueGroupe: and(hasValidToken, allow),
        updateCatalogueGroupeById: and(hasValidToken, allow),
        deleteCatalogueGroupeById: and(hasValidToken, allow),

        addCatalogueSettings: and(hasValidToken, allow),
        updateCatalogueSettingsById: and(hasValidToken, allow),
        deleteCatalogueSettingsById: and(hasValidToken, allow),

        uploadCatalogue: and(hasValidToken, allow),
        deleteCatalogueById: and(hasValidToken, allow),
        addOccurenceByMonth: and(hasValidToken,allow),
        addHistory: allow,
        deleteHistories: and(hasValidToken, allow),

        addSearch: and(hasValidToken, allow),

        addClient: and(hasValidToken, allow),
        updateClientById: and(hasValidToken, allow),
        deleteClientById: and(hasValidToken, allow),

        addFacture: and(hasValidToken, allow),
        updateFactureById: and(hasValidToken, allow),
        deleteFactureById: and(hasValidToken, allow),

        addCatalogueImport: and(hasValidToken, allow),
        updateCatalogueImportById: and(hasValidToken, allow),
        deleteCatalogueImportById: and(hasValidToken, allow),
        addJsonCatalogue: and(hasValidToken,allow),

        addOneDesignation: and(hasValidToken,allow),
        addArchive: and(hasValidToken,allow),
        updateArchiveById: and(hasValidToken,allow),
        deleteArchiveById: and(hasValidToken,allow),

        addRefsMap: and(hasValidToken,allow),
        deleteRefsMapById: and(hasValidToken,allow),

        addProductRefs: and(hasValidToken,allow),
        addCommonName: and(hasValidToken,allow),

        addBonDeCommandeById: and(hasValidToken,allow),
        updateBonDeCommandeById: and(hasValidToken,allow),
        deleteBonDeCommandeById: and(hasValidToken,allow),

        sender:and(hasValidToken,allow),
        deleteProduct:and(hasValidToken,allow),
        
    }
})


   