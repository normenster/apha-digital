import type { Schema, Attribute } from '@strapi/strapi';

export interface ComponentsSubkategorie extends Schema.Component {
  collectionName: 'components_components_subkategories';
  info: {
    displayName: 'Subkategorie';
  };
  attributes: {
    name: Attribute.String;
  };
}

export interface ComponentsKategorie extends Schema.Component {
  collectionName: 'components_components_kategories';
  info: {
    displayName: 'Schwierigkeit';
    description: '';
  };
  attributes: {
    name: Attribute.Enumeration<['Hoch bis Niedrig', 'Hoch ', 'Niedrig']>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'components.subkategorie': ComponentsSubkategorie;
      'components.kategorie': ComponentsKategorie;
    }
  }
}
