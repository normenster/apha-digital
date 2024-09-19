import type { Schema, Attribute } from '@strapi/strapi';

export interface ComponentsWortAudioErklaerung extends Schema.Component {
  collectionName: 'components_components_wort_audio_erklaerungs';
  info: {
    displayName: 'Wort + Audio Erkl\u00E4rung';
  };
  attributes: {
    title: Attribute.String;
    media: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface ComponentsSelectAudio extends Schema.Component {
  collectionName: 'components_components_select_audios';
  info: {
    displayName: 'Select + Audio';
    description: '';
  };
  attributes: {
    title: Attribute.Enumeration<['ein', 'eine']>;
    media: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'components.wort-audio-erklaerung': ComponentsWortAudioErklaerung;
      'components.select-audio': ComponentsSelectAudio;
    }
  }
}
