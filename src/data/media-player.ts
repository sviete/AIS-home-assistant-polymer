import {
  mdiAccountMusic,
  mdiAccountMusicOutline,
  mdiAlbum,
  mdiApplication,
  mdiDramaMasks,
  mdiFileMusic,
  mdiFolder,
  mdiGamepadVariant,
  mdiImage,
  mdiMovie,
  mdiMusic,
  mdiPlaylistMusic,
  mdiPodcast,
  mdiTelevisionClassic,
  mdiVideo,
  mdiWeb,
  mdiRadio,
  mdiHeart,
  mdiBookmarkMultiple,
  mdiNas,
  mdiBookPlay,
  mdiMusicClefTreble,
  mdiUsbFlashDrive,
  mdiMicrosoftOnedrive,
  mdiHarddisk,
  mdiHumanFemaleBoy,
  mdiMovieRoll,
  mdiPillar,
  mdiNewspaper,
  mdiChurch,
  mdiApacheKafka,
  mdiMusicClefBass,
  mdiMusicBox,
  mdiRocketLaunch,
  mdiSchool,
  mdiMapMarker,
  mdiRadioTower,
  mdiRun,
  mdiFountainPenTip,
  mdiTrendingUp,
  mdiCashUsdOutline,
  mdiGamepadVariantOutline,
  mdiEmoticonExcitedOutline,
  mdiBookshelf,
  mdiCookie,
  mdiShoppingOutline,
  mdiPalette,
  mdiTelevision,
  mdiRobotIndustrial,
  mdiDoctor,
  mdiSunglasses,
  mdiSpotify,
  mdiYoutube,
} from "@mdi/js";
import type {
  HassEntityAttributeBase,
  HassEntityBase,
} from "home-assistant-js-websocket";
import type { HomeAssistant } from "../types";
import { UNAVAILABLE_STATES } from "./entity";
import { supportsFeature } from "../common/entity/supports-feature";

interface MediaPlayerEntityAttributes extends HassEntityAttributeBase {
  media_content_type?: any;
  media_artist?: string;
  media_playlist?: string;
  media_series_title?: string;
  media_season?: any;
  media_episode?: any;
  app_name?: string;
  media_position_updated_at?: string | number | Date;
  media_duration?: number;
  media_position?: number;
  media_title?: string;
  icon?: string;
  entity_picture_local?: string;
  is_volume_muted?: boolean;
  volume_level?: number;
  source?: string;
  source_list?: string[];
  sound_mode?: string;
  sound_mode_list?: string[];
}

export interface MediaPlayerEntity extends HassEntityBase {
  attributes: MediaPlayerEntityAttributes;
  state:
    | "playing"
    | "paused"
    | "idle"
    | "off"
    | "on"
    | "unavailable"
    | "unknown";
}

export const SUPPORT_PAUSE = 1;
export const SUPPORT_SEEK = 2;
export const SUPPORT_VOLUME_SET = 4;
export const SUPPORT_VOLUME_MUTE = 8;
export const SUPPORT_PREVIOUS_TRACK = 16;
export const SUPPORT_NEXT_TRACK = 32;
export const SUPPORT_TURN_ON = 128;
export const SUPPORT_TURN_OFF = 256;
export const SUPPORT_PLAY_MEDIA = 512;
export const SUPPORT_VOLUME_BUTTONS = 1024;
export const SUPPORT_SELECT_SOURCE = 2048;
export const SUPPORT_STOP = 4096;
export const SUPPORT_PLAY = 16384;
export const SUPPORT_SELECT_SOUND_MODE = 65536;
export const SUPPORT_BROWSE_MEDIA = 131072;

export type MediaPlayerBrowseAction = "pick" | "play";

export const BROWSER_PLAYER = "browser";

export type MediaClassBrowserSetting = {
  icon: string;
  thumbnail_ratio?: string;
  layout?: string;
  show_list_images?: boolean;
};

export const MediaClassBrowserSettings: {
  [type: string]: MediaClassBrowserSetting;
} = {
  album: { icon: mdiAlbum, layout: "grid" },
  app: { icon: mdiApplication, layout: "grid" },
  artist: { icon: mdiAccountMusic, layout: "grid", show_list_images: true },
  channel: {
    icon: mdiTelevisionClassic,
    thumbnail_ratio: "portrait",
    layout: "grid",
  },
  composer: {
    icon: mdiAccountMusicOutline,
    layout: "grid",
    show_list_images: true,
  },
  contributing_artist: {
    icon: mdiAccountMusic,
    layout: "grid",
    show_list_images: true,
  },
  directory: { icon: mdiFolder, layout: "grid", show_list_images: true },
  episode: {
    icon: mdiTelevisionClassic,
    layout: "grid",
    thumbnail_ratio: "portrait",
  },
  game: {
    icon: mdiGamepadVariant,
    layout: "grid",
    thumbnail_ratio: "portrait",
  },
  genre: { icon: mdiDramaMasks, layout: "grid", show_list_images: true },
  image: { icon: mdiImage, layout: "grid" },
  movie: { icon: mdiMovie, thumbnail_ratio: "portrait", layout: "grid" },
  music: { icon: mdiMusic },
  playlist: { icon: mdiPlaylistMusic, layout: "grid", show_list_images: true },
  podcast: { icon: mdiPodcast, layout: "grid" },
  season: {
    icon: mdiTelevisionClassic,
    layout: "grid",
    thumbnail_ratio: "portrait",
  },
  track: { icon: mdiFileMusic },
  tv_show: {
    icon: mdiTelevisionClassic,
    layout: "grid",
    thumbnail_ratio: "portrait",
  },
  url: { icon: mdiWeb },
  video: { icon: mdiVideo, layout: "grid" },
  radio: { icon: mdiRadio },
  book: { icon: mdiBookPlay },
  nas: { icon: mdiNas },
  heart: { icon: mdiHeart },
  bookmark: { icon: mdiBookmarkMultiple },
  classicMusic: { icon: mdiMusicClefTreble },
  flashDrive: { icon: mdiUsbFlashDrive },
  microsoftOnedrive: { icon: mdiMicrosoftOnedrive },
  harddisk: { icon: mdiHarddisk },
  radiokids: { icon: mdiHumanFemaleBoy },
  radiofils: { icon: mdiMovieRoll },
  radiohistory: { icon: mdiPillar },
  radionews: { icon: mdiNewspaper },
  radioothers: { icon: mdiApacheKafka },
  radiochurch: { icon: mdiChurch },
  radioclasic: { icon: mdiMusicClefBass },
  radiomusic: { icon: mdiMusicBox },
  radiomusicrock: { icon: mdiRocketLaunch },
  radioschool: { icon: mdiSchool },
  radiolocal: { icon: mdiMapMarker },
  radiopublic: { icon: mdiRadioTower },
  radiosport: { icon: mdiRun },
  radiopen: { icon: mdiFountainPenTip },
  radiotuneintrend: { icon: mdiTrendingUp },
  podcastbuisnes: { icon: mdiCashUsdOutline },
  podcasteducation: { icon: mdiSchool },
  podcastfamily: { icon: mdiHumanFemaleBoy },
  podcastgames: { icon: mdiGamepadVariantOutline },
  podcastsmile: { icon: mdiEmoticonExcitedOutline },
  podcastcomedy: { icon: mdiDramaMasks },
  podcastinfo: { icon: mdiNewspaper },
  podcastbooks: { icon: mdiBookshelf },
  podcastcook: { icon: mdiCookie },
  podcastmarket: { icon: mdiShoppingOutline },
  podcastsport: { icon: mdiRun },
  podcastart: { icon: mdiPalette },
  podcasttv: { icon: mdiTelevision },
  podcasttechno: { icon: mdiRobotIndustrial },
  podcastdoctor: { icon: mdiDoctor },
  podcasttyflo: { icon: mdiSunglasses },
  spotify: { icon: mdiSpotify },
  youtube: { icon: mdiYoutube },
};

export interface MediaPickedEvent {
  item: MediaPlayerItem;
}

export interface MediaPlayerThumbnail {
  content_type: string;
  content: string;
}

export interface ControlButton {
  icon: string;
  action: string;
}

export interface MediaPlayerItem {
  title: string;
  media_content_type: string;
  media_content_id: string;
  media_class: string;
  children_media_class: string;
  can_play: boolean;
  can_expand: boolean;
  thumbnail?: string;
  children?: MediaPlayerItem[];
}

export const browseMediaPlayer = (
  hass: HomeAssistant,
  entityId: string,
  mediaContentId?: string,
  mediaContentType?: string
): Promise<MediaPlayerItem> =>
  hass.callWS<MediaPlayerItem>({
    type: "media_player/browse_media",
    entity_id: entityId,
    media_content_id: mediaContentId,
    media_content_type: mediaContentType,
  });

// AIS pass mediaContentType
export const browseLocalMediaPlayer = (
  hass: HomeAssistant,
  mediaContentId?: string,
  mediaContentType?: string
): Promise<MediaPlayerItem> =>
  hass.callWS<MediaPlayerItem>({
    type: "media_source/browse_media",
    media_content_id: mediaContentId,
    media_content_type: mediaContentType,
  });

export const getCurrentProgress = (stateObj: MediaPlayerEntity): number => {
  let progress = stateObj.attributes.media_position!;

  if (stateObj.state !== "playing") {
    return progress;
  }
  progress +=
    (Date.now() -
      new Date(stateObj.attributes.media_position_updated_at!).getTime()) /
    1000.0;
  return progress;
};

export const computeMediaDescription = (
  stateObj: MediaPlayerEntity
): string => {
  let secondaryTitle: string;

  switch (stateObj.attributes.media_content_type) {
    case "music":
    case "image":
      secondaryTitle = stateObj.attributes.media_artist!;
      break;
    case "playlist":
      secondaryTitle = stateObj.attributes.media_playlist!;
      break;
    case "tvshow":
      secondaryTitle = stateObj.attributes.media_series_title!;
      if (stateObj.attributes.media_season) {
        secondaryTitle += " S" + stateObj.attributes.media_season;

        if (stateObj.attributes.media_episode) {
          secondaryTitle += "E" + stateObj.attributes.media_episode;
        }
      }
      break;
    default:
      secondaryTitle = stateObj.attributes.app_name || "";
  }

  return secondaryTitle;
};

export const computeMediaControls = (
  stateObj: MediaPlayerEntity
): ControlButton[] | undefined => {
  if (!stateObj) {
    return undefined;
  }

  const state = stateObj.state;

  if (UNAVAILABLE_STATES.includes(state)) {
    return undefined;
  }

  if (state === "off") {
    return supportsFeature(stateObj, SUPPORT_TURN_ON)
      ? [
          {
            icon: "hass:power",
            action: "turn_on",
          },
        ]
      : undefined;
  }

  const buttons: ControlButton[] = [];

  if (supportsFeature(stateObj, SUPPORT_TURN_OFF)) {
    buttons.push({
      icon: "hass:power",
      action: "turn_off",
    });
  }

  if (
    (state === "playing" || state === "paused") &&
    supportsFeature(stateObj, SUPPORT_PREVIOUS_TRACK)
  ) {
    buttons.push({
      icon: "hass:skip-previous",
      action: "media_previous_track",
    });
  }

  if (
    (state === "playing" &&
      (supportsFeature(stateObj, SUPPORT_PAUSE) ||
        supportsFeature(stateObj, SUPPORT_STOP))) ||
    ((state === "paused" || state === "idle") &&
      supportsFeature(stateObj, SUPPORT_PLAY)) ||
    (state === "on" &&
      (supportsFeature(stateObj, SUPPORT_PLAY) ||
        supportsFeature(stateObj, SUPPORT_PAUSE)))
  ) {
    buttons.push({
      icon:
        state === "on"
          ? "hass:play-pause"
          : state !== "playing"
          ? "hass:play"
          : supportsFeature(stateObj, SUPPORT_PAUSE)
          ? "hass:pause"
          : "hass:stop",
      action:
        state === "playing" && !supportsFeature(stateObj, SUPPORT_PAUSE)
          ? "media_stop"
          : "media_play_pause",
    });
  }

  if (
    (state === "playing" || state === "paused") &&
    supportsFeature(stateObj, SUPPORT_NEXT_TRACK)
  ) {
    buttons.push({
      icon: "hass:skip-next",
      action: "media_next_track",
    });
  }

  return buttons.length > 0 ? buttons : undefined;
};
