import { LovelaceConfig } from "../../data/lovelace";

export const aisAudioLovelace: LovelaceConfig = {
  title: "Asystent domowy",
  views: [
    {
      badges: [],
      cards: [
        {
          cards: [
            {
              artwork: "full-cover",
              entity: "media_player.wbudowany_glosnik",
              hide: {
                power: true,
                runtime: false,
                shuffle: false,
                source: true,
              },
              icon: "mdi:monitor-speaker",
              more_info: false,
              name: " ",
              shortcuts: {
                buttons: [
                  {
                    icon: "mdi:bookmark-music",
                    id: "script.ais_add_item_to_bookmarks",
                    type: "script",
                  },
                  {
                    icon: "mdi:thumb-up",
                    id: "script.ais_add_item_to_favorites",
                    type: "script",
                  },
                ],
                columns: 2,
                list: [],
              },
              show_progress: true,
              speaker_group: {
                platform: "ais",
                show_group_count: true,
              },
              tts: {
                platform: "ais",
              },
              type: "ais-mini-media-player",
            },
            {
              cards: [
                {
                  cards: [
                    {
                      color: "#727272",
                      color_type: "icon",
                      entity: "sensor.ais_player_mode",
                      icon: "mdi:heart",
                      name: " ",
                      show_state: false,
                      size: "30%",
                      state: [
                        {
                          color: "var(--primary-color)",
                          value: "ais_favorites",
                        },
                      ],
                      tap_action: {
                        action: "call-service",
                        service: "ais_ai_service.set_context",
                        service_data: {
                          text: "ulubione",
                        },
                      },
                      type: "ais-button",
                    },
                    {
                      color: "#727272",
                      color_type: "icon",
                      entity: "sensor.ais_player_mode",
                      icon: "mdi:bookmark",
                      name: " ",
                      show_state: false,
                      size: "30%",
                      state: [
                        {
                          color: "var(--primary-color)",
                          value: "ais_bookmarks",
                        },
                      ],
                      tap_action: {
                        action: "call-service",
                        service: "ais_ai_service.set_context",
                        service_data: {
                          text: "zak\u0142adki",
                        },
                      },
                      type: "ais-button",
                    },
                    {
                      color: "#727272",
                      color_type: "icon",
                      entity: "sensor.ais_player_mode",
                      icon: "mdi:monitor-speaker",
                      name: " ",
                      show_state: false,
                      size: "30%",
                      state: [
                        {
                          color: "var(--primary-color)",
                          value: "ais_tv",
                        },
                      ],
                      tap_action: {
                        action: "call-service",
                        service: "ais_ai_service.set_context",
                        service_data: {
                          text: "ais_tv",
                        },
                      },
                      type: "ais-button",
                    },
                    {
                      color: "#727272",
                      color_type: "icon",
                      entity: "sensor.ais_player_mode",
                      icon: "mdi:folder",
                      name: " ",
                      show_state: false,
                      size: "30%",
                      state: [
                        {
                          color: "var(--primary-color)",
                          value: "local_audio",
                        },
                      ],
                      tap_action: {
                        action: "call-service",
                        service: "ais_ai_service.set_context",
                        service_data: {
                          text: "dyski",
                        },
                      },
                      type: "ais-button",
                    },
                  ],
                  type: "horizontal-stack",
                },
                {
                  cards: [
                    {
                      color: "#727272",
                      color_type: "icon",
                      entity: "sensor.ais_player_mode",
                      icon: "mdi:radio",
                      name: " ",
                      show_state: false,
                      size: "30%",
                      state: [
                        {
                          color: "var(--primary-color)",
                          value: "radio_player",
                        },
                      ],
                      tap_action: {
                        action: "call-service",
                        service: "ais_ai_service.set_context",
                        service_data: {
                          text: "radio",
                        },
                      },
                      type: "ais-button",
                    },
                    {
                      color: "#727272",
                      color_type: "icon",
                      entity: "sensor.ais_player_mode",
                      icon: "mdi:podcast",
                      name: " ",
                      show_state: false,
                      size: "30%",
                      state: [
                        {
                          color: "var(--primary-color)",
                          value: "podcast_player",
                        },
                      ],
                      tap_action: {
                        action: "call-service",
                        service: "ais_ai_service.set_context",
                        service_data: {
                          text: "podcast",
                        },
                      },
                      type: "ais-button",
                    },
                    {
                      color: "#727272",
                      color_type: "icon",
                      entity: "sensor.ais_player_mode",
                      icon: "mdi:book-music",
                      name: " ",
                      show_state: false,
                      size: "30%",
                      state: [
                        {
                          color: "var(--primary-color)",
                          value: "audiobooks_player",
                        },
                      ],
                      tap_action: {
                        action: "call-service",
                        service: "ais_ai_service.set_context",
                        service_data: {
                          text: "audiobook",
                        },
                      },
                      type: "ais-button",
                    },
                    {
                      color: "#727272",
                      color_type: "icon",
                      entity: "sensor.ais_player_mode",
                      icon: "mdi:music",
                      name: " ",
                      show_state: false,
                      size: "30%",
                      state: [
                        {
                          color: "var(--primary-color)",
                          value: "music_player",
                        },
                      ],
                      tap_action: {
                        action: "call-service",
                        service: "ais_ai_service.set_context",
                        service_data: {
                          text: "muzyka",
                        },
                      },
                      type: "ais-button",
                    },
                  ],
                  type: "horizontal-stack",
                },
              ],
              type: "vertical-stack",
            },
            {
              content:
                "{{ states.sensor.aisknowledgeanswer.attributes.text }}\n",
              type: "markdown",
            },
            {
              card: {
                cards: [
                  {
                    cards: [
                      {
                        color: "#727272",
                        color_type: "icon",
                        entity: "sensor.ais_tv_mode",
                        icon: "mdi:monitor-dashboard",
                        name: " ",
                        show_state: false,
                        size: "12%",
                        state: [
                          {
                            color: "var(--primary-color)",
                            value: "tv_on",
                          },
                        ],
                        tap_action: {
                          action: "call-service",
                          service: "ais_ai_service.set_context",
                          service_data: {
                            text: "ais_tv_on",
                          },
                        },
                        type: "ais-button",
                      },
                      {
                        color: "#727272",
                        color_type: "icon",
                        entity: "sensor.ais_tv_mode",
                        icon: "mdi:television-off",
                        name: " ",
                        show_state: false,
                        size: "12%",
                        state: [
                          {
                            color: "var(--primary-color)",
                            value: "tv_off",
                          },
                        ],
                        tap_action: {
                          action: "call-service",
                          service: "ais_ai_service.set_context",
                          service_data: {
                            text: "ais_tv_off",
                          },
                        },
                        type: "ais-button",
                      },
                    ],
                    type: "horizontal-stack",
                  },
                  {
                    card: {
                      cards: [
                        {
                          color: "#727272",
                          color_type: "icon",
                          entity: "sensor.ais_tv_activity",
                          icon: "mdi:youtube-tv",
                          name: " ",
                          show_state: false,
                          size: "12%",
                          state: [
                            {
                              color: "var(--primary-color)",
                              value: "youtube",
                            },
                          ],
                          tap_action: {
                            action: "call-service",
                            service: "ais_ai_service.set_context",
                            service_data: {
                              text: "ais_tv_youtube",
                            },
                          },
                          type: "ais-button",
                        },
                        {
                          color: "#727272",
                          color_type: "icon",
                          entity: "sensor.ais_tv_activity",
                          icon: "mdi:spotify",
                          name: " ",
                          show_state: false,
                          size: "12%",
                          state: [
                            {
                              color: "var(--primary-color)",
                              value: "spotify",
                            },
                          ],
                          tap_action: {
                            action: "call-service",
                            service: "ais_ai_service.set_context",
                            service_data: {
                              text: "ais_tv_spotify",
                            },
                          },
                          type: "ais-button",
                        },
                        {
                          color: "#727272",
                          color_type: "icon",
                          entity: "sensor.ais_tv_activity",
                          icon: "mdi:cctv",
                          name: " ",
                          show_state: false,
                          size: "12%",
                          state: [
                            {
                              color: "var(--primary-color)",
                              value: "camera",
                            },
                          ],
                          tap_action: {
                            action: "call-service",
                            service: "ais_ai_service.set_context",
                            service_data: {
                              text: "ais_tv_cameras",
                            },
                          },
                          type: "ais-button",
                        },
                        {
                          color: "#727272",
                          color_type: "icon",
                          entity: "sensor.ais_tv_activity",
                          icon: "mdi:tune-variant",
                          name: " ",
                          show_state: false,
                          size: "12%",
                          state: [
                            {
                              color: "var(--primary-color)",
                              value: "settings",
                            },
                          ],
                          tap_action: {
                            action: "call-service",
                            service: "ais_ai_service.set_context",
                            service_data: {
                              text: "ais_tv_settings",
                            },
                          },
                          type: "ais-button",
                        },
                      ],
                      type: "horizontal-stack",
                    },
                    conditions: [
                      {
                        entity: "sensor.ais_tv_mode",
                        state: "tv_on",
                      },
                    ],
                    type: "conditional",
                  },
                  {
                    card: {
                      cards: [
                        {
                          card: {
                            type: "glance",
                            columns: 3,
                            show_state: false,
                          },
                          filter: {
                            include: [
                              {
                                domain: "camera",
                                options: {
                                  tap_action: {
                                    action: "call-service",
                                    service: "ais_ai_service.set_context",
                                    service_data: {
                                      text: "ais_tv_show_camera",
                                      entity_id: "this.entity_id",
                                    },
                                  },
                                },
                              },
                            ],
                          },
                          type: "ais-auto-entities",
                        },
                      ],
                      type: "horizontal-stack",
                    },
                    conditions: [
                      {
                        entity: "sensor.ais_tv_activity",
                        state: "camera",
                      },
                    ],
                    type: "conditional",
                  },
                ],
                type: "vertical-stack",
              },
              conditions: [
                {
                  entity: "sensor.ais_player_mode",
                  state: "ais_tv",
                },
              ],
              type: "conditional",
            },

            {
              card: {
                cards: [
                  {
                    cards: [
                      {
                        color: "#727272",
                        color_type: "icon",
                        entity: "input_select.ais_music_service",
                        icon: "mdi:youtube",
                        name: " ",
                        show_state: false,
                        size: "12%",
                        state: [
                          {
                            color: "var(--primary-color)",
                            value: "YouTube",
                          },
                        ],
                        tap_action: {
                          action: "call-service",
                          service: "ais_cloud.change_audio_service",
                        },
                        type: "ais-button",
                      },
                      {
                        color: "#727272",
                        color_type: "icon",
                        entity: "input_select.ais_music_service",
                        icon: "mdi:spotify",
                        name: " ",
                        show_state: false,
                        size: "12%",
                        state: [
                          {
                            color: "var(--primary-color)",
                            value: "Spotify",
                          },
                        ],
                        tap_action: {
                          action: "call-service",
                          service: "ais_cloud.change_audio_service",
                        },
                        type: "ais-button",
                      },
                    ],
                    type: "horizontal-stack",
                  },
                  {
                    card: {
                      cards: [
                        {
                          entities: [
                            {
                              entity: "input_text.ais_music_query",
                            },
                          ],
                          show_header_toggle: false,
                          title: "Wyszukiwanie Muzyki",
                          type: "entities",
                        },
                      ],
                      type: "vertical-stack",
                    },
                    conditions: [
                      {
                        entity: "sensor.ais_player_mode",
                        state: "music_player",
                      },
                      {
                        entity: "input_select.ais_music_service",
                        state: "YouTube",
                      },
                    ],
                    type: "conditional",
                  },
                  {
                    card: {
                      cards: [
                        {
                          entities: [
                            {
                              entity: "input_text.ais_spotify_query",
                            },
                          ],
                          show_header_toggle: false,
                          title: "Wyszukiwanie Muzyki",
                          type: "entities",
                        },
                        {
                          cards: [
                            {
                              icon: "mdi:folder-music",
                              tap_action: {
                                action: "call-service",
                                service: "ais_spotify_service.get_favorites",
                                service_data: {
                                  type: "featured-playlists",
                                },
                              },
                              type: "button",
                            },
                            {
                              icon: "mdi:playlist-music",
                              tap_action: {
                                action: "call-service",
                                service: "ais_spotify_service.get_favorites",
                                service_data: {
                                  type: "playlists",
                                },
                              },
                              type: "button",
                            },
                            {
                              icon: "mdi:account",
                              tap_action: {
                                action: "call-service",
                                service: "ais_spotify_service.get_favorites",
                                service_data: {
                                  type: "artists",
                                },
                              },
                              type: "button",
                            },
                            {
                              icon: "mdi:album",
                              tap_action: {
                                action: "call-service",
                                service: "ais_spotify_service.get_favorites",
                                service_data: {
                                  type: "albums",
                                },
                              },
                              type: "button",
                            },
                            {
                              icon: "mdi:music-note",
                              tap_action: {
                                action: "call-service",
                                service: "ais_spotify_service.get_favorites",
                                service_data: {
                                  type: "tracks",
                                },
                              },
                              type: "button",
                            },
                          ],
                          type: "horizontal-stack",
                        },
                      ],
                      type: "vertical-stack",
                    },
                    conditions: [
                      {
                        entity: "sensor.ais_player_mode",
                        state: "music_player",
                      },
                      {
                        entity: "input_select.ais_music_service",
                        state: "Spotify",
                      },
                    ],
                    type: "conditional",
                  },
                ],
                type: "vertical-stack",
              },
              conditions: [
                {
                  entity: "sensor.ais_player_mode",
                  state: "music_player",
                },
              ],
              type: "conditional",
            },
            {
              cards: [
                {
                  entities: [
                    {
                      entity: "input_boolean.ais_audio_mono",
                    },
                  ],
                  show_header_toggle: false,
                  title: "Equalizer",
                  type: "entities",
                },
                {
                  card: {
                    show_header_toggle: false,
                    title: "Odtwarzacze",
                    type: "entities",
                  },
                  filter: {
                    include: [
                      {
                        domain: "media_player",
                      },
                    ],
                  },
                  type: "ais-auto-entities",
                },
              ],
              show_header_toggle: false,
              type: "vertical-stack",
            },
            {
              card: {
                cards: [
                  {
                    entity: "input_select.book_autor",
                    type: "ais-easy-picker",
                  },
                ],
                type: "vertical-stack",
              },
              conditions: [
                {
                  entity: "sensor.ais_player_mode",
                  state: "audiobooks_player",
                },
              ],
              type: "conditional",
            },
          ],
          show_header_toggle: false,
          type: "vertical-stack",
        },
        {
          cards: [
            {
              card: {
                entity: "sensor.ais_drives",
                title: "Przegl\u0105danie Dysk\u00f3w",
                type: "ais-files-list",
              },
              conditions: [
                {
                  entity: "sensor.ais_player_mode",
                  state: "local_audio",
                },
              ],
              type: "conditional",
            },
            {
              card: {
                entity: ["sensor.aisbookmarkslist"],
                media_source: "Bookmark",
                show_delete_icon: true,
                type: "ais-list",
              },
              conditions: [
                {
                  entity: "sensor.ais_player_mode",
                  state: "ais_bookmarks",
                },
              ],
              type: "conditional",
            },
            {
              card: {
                entity: ["sensor.aisfavoriteslist"],
                media_source: "Favorite",
                show_delete_icon: true,
                type: "ais-list",
              },
              conditions: [
                {
                  entity: "sensor.ais_player_mode",
                  state: "ais_favorites",
                },
              ],
              type: "conditional",
            },
            {
              card: {
                entity: ["sensor.youtubelist"],
                media_source: "Music",
                show_delete_icon: true,
                type: "ais-list",
              },
              conditions: [
                {
                  entity: "sensor.ais_player_mode",
                  state: "music_player",
                },
                {
                  entity: "input_select.ais_music_service",
                  state: "YouTube",
                },
              ],
              type: "conditional",
            },
            {
              card: {
                entity: ["sensor.spotifysearchlist"],
                media_source: "SpotifySearch",
                show_delete_icon: true,
                type: "ais-list",
              },
              conditions: [
                {
                  entity: "sensor.ais_player_mode",
                  state: "music_player",
                },
                {
                  entity: "input_select.ais_music_service",
                  state: "Spotify",
                },
              ],
              type: "conditional",
            },
            {
              card: {
                entity: "input_select.radio_type",
                type: "ais-easy-picker",
              },
              conditions: [
                {
                  entity: "sensor.ais_player_mode",
                  state: "radio_player",
                },
              ],
              type: "conditional",
            },
            {
              card: {
                entity: "input_select.podcast_type",
                type: "ais-easy-picker",
              },
              conditions: [
                {
                  entity: "sensor.ais_player_mode",
                  state: "podcast_player",
                },
              ],
              type: "conditional",
            },
            {
              card: {
                entity: ["sensor.podcastnamelist"],
                media_source: "PodcastName",
                type: "ais-list",
              },
              conditions: [
                {
                  entity: "sensor.ais_player_mode",
                  state: "podcast_player",
                },
              ],
              type: "conditional",
            },
            {
              card: {
                entity: ["sensor.audiobookslist"],
                media_source: "AudioBook",
                type: "ais-list",
              },
              conditions: [
                {
                  entity: "sensor.ais_player_mode",
                  state: "audiobooks_player",
                },
              ],
              type: "conditional",
            },
          ],
          type: "vertical-stack",
        },
        {
          cards: [
            {
              card: {
                entity: ["sensor.spotifylist"],
                media_source: "Spotify",
                show_delete_icon: true,
                type: "ais-list",
              },
              conditions: [
                {
                  entity: "sensor.ais_player_mode",
                  state: "music_player",
                },
                {
                  entity: "input_select.ais_music_service",
                  state: "Spotify",
                },
              ],
              type: "conditional",
            },
            {
              card: {
                entity: ["sensor.radiolist"],
                media_source: "Radio",
                type: "ais-list",
              },
              conditions: [
                {
                  entity: "sensor.ais_player_mode",
                  state: "radio_player",
                },
              ],
              type: "conditional",
            },
            {
              card: {
                entity: ["sensor.podcastlist"],
                media_source: "Podcast",
                type: "ais-list",
              },
              conditions: [
                {
                  entity: "sensor.ais_player_mode",
                  state: "podcast_player",
                },
              ],
              type: "conditional",
            },
            {
              card: {
                entity: ["sensor.audiobookschapterslist"],
                media_source: "AudioBookChapter",
                type: "ais-list",
              },
              conditions: [
                {
                  entity: "sensor.ais_player_mode",
                  state: "audiobooks_player",
                },
              ],
              type: "conditional",
            },
          ],
          type: "vertical-stack",
        },
      ],
      icon: "mdi:music",
      path: "aisaudio",
      title: "Audio",
      visible: false,
    },
  ],
};
