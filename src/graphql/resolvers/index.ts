import UserResolvers from './user.resolver';
import RoleResolvers from './role.resolver';
import FournisseurResolvers from './fournisseur.resolver';
import CatalogueResolvers from './catalogue.resolver';
import CatalogueGroupeResolvers from './catalogue-groupe.resolver';
import CatalogueSettingsResolvers from './catalogue-settings.resolver';
import CatalogueImportResolvers from './catalogue-import.resolver';
import HistoryResolvers from './history.resolver';
import SearchResolvers from './search.resolver';
import ClientResolvers from './client.resolver';
import FactureResolvers from './facture.resolver';
import CustomScalar from '../scalar';
import ArchiveResolvers from './archive.resolver';
import RefsMapResolver from './refs-map.resolver';
import ProductRefsResolver from './product-refs.resolver';
import BonDeCommandeResolver from './bon-de-commande.resolver';

export default [
    CustomScalar,
    UserResolvers,
    RoleResolvers,
    FournisseurResolvers,
    CatalogueResolvers,
    CatalogueGroupeResolvers,
    CatalogueSettingsResolvers,
    CatalogueImportResolvers,
    HistoryResolvers,
    SearchResolvers,
    ClientResolvers,
    FactureResolvers,
    ArchiveResolvers,
    RefsMapResolver,
    ProductRefsResolver,
    BonDeCommandeResolver

]
