import "@material/mwc-button";
import "@polymer/paper-input/paper-input";
import { html } from "@polymer/polymer/lib/utils/html-tag";
import { PolymerElement } from "@polymer/polymer/polymer-element";
import { showAisgaleryDialog } from "./show-ha-aisgalery-dialog";
import "../../components/ha-card";
import "../../resources/ha-style";
import "../states/ha-panel-states";
import "../config/ha-config-section";
import "../../components/ha-fab";

class HaPanelAisgalery extends PolymerElement {
  static get template() {
    return html`
      <style include="ha-style">
        div.content {
          background-color: var(--primary-background-color);
          width: 100%;
          min-height: 100%;
        }
        .galery_content {
          overflow: hidden;
          width: 100%;
          min-height: 80%;
          position: absolute;
        }
        figcaption {
          text-align: center;
          white-space: nowrap;
        }
        img,
        video {
          width: 100%;
          max-width: 600px;
          object-fit: contain;
        }
        .image-viewer .btn {
          position: absolute;
          transform: translate(-50%, -50%);
          -ms-transform: translate(-50%, -50%);
          background-color: #555;
          color: white;
          font-size: 16px;
          padding: 12px 12px;
          border: none;
          cursor: pointer;
          border-radius: 5px;
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .image-viewer:hover .btn {
          opacity: 1;
        }
        .image-viewer .btn-left {
          left: 0%;
          margin-left: 65px;
        }
        .image-viewer .btn-right {
          right: 0%;
          margin-right: 30px;
        }
        figure.selected {
          opacity: 0.5;
        }
        .duration {
          font-style: italic;
        }
        @media all and (max-width: 600px) {
          .image-viewer {
            width: 100%;
            max-width: 400px;
            margin: auto;
          }
          .image-viewer .btn {
            top: 33%;
          }
          .image-menu {
            width: 100%;
            max-width: 300px;
            overflow-y: hidden;
            overflow-x: scroll;
            display: flex;
          }
          .image-menu figure {
            margin: 0px;
            padding: 12px;
          }
        }

        @media all and (min-width: 600px) {
          .image-viewer {
            width: 75%;
            max-width: 500px;
            position: relative;
            margin: auto;
          }
          .image-viewer .btn {
            top: 40%;
          }

          .image-menu {
            width: 25%;
            max-width: 300px;
            height: calc(100vh - 120px);
            overflow-y: scroll;
            position: absolute;
            top: 0px;
            right: 0px;
          }
        }

        @media all and (max-width: 800px) {
          img,
          video {
            width: 100%;
            max-width: 300px;
          }
          .image-viewer {
            width: 75%;
            max-width: 300px;
          }
          div.image-menu > img,
          video {
            width: 100%;
            max-width: 150px;
          }
        }

        ha-fab {
          position: fixed;
          bottom: 16px;
          right: 16px;
          z-index: 1;
        }

        ha-fab[is-wide] {
          bottom: 24px;
          right: 24px;
        }
      </style>
      <div class="content">
        <app-toolbar>
          <ha-menu-button hass="[[hass]]" narrow="[[narrow]]"></ha-menu-button>
          <div main-title>[[panel.title]]</div>
        </app-toolbar>
        <has-subpage>
          <div class="galery_content" id="content">
            <div class="image-viewer">
              <figure>
                <img
                  src="{{currentImage.path}}"
                  hidden$="[[isVideo(currentImage.extension)]]"
                />
                <video
                  controls
                  src="{{currentImage.path}}#t=0.1"
                  hidden$="[[!isVideo(currentImage.extension)]]"
                  on-loadedmetadata="videoLoaded"
                  on-canplay="startVideo"
                ></video>
                <figcaption>
                  <paper-icon-button
                    icon="hass:delete"
                    on-click="_deleteImage"
                  ></paper-icon-button>
                  {{currentImage.path}}
                  <span
                    class="duration"
                    hidden$="[[!isVideo(currentImage.extension)]]"
                  ></span>
                </figcaption>
              </figure>
              <button class="btn btn-left" on-click="previousImage">
                &lt;
              </button>
              <button class="btn btn-right" on-click="nextImage">
                &gt;
              </button>
            </div>
            <div class="image-menu">
              <template is="dom-repeat" items="{{images}}">
                <figure
                  id="image[[item.index]]"
                  data-imageIndex="{{item.index}}"
                  on-click="imageMenuClick"
                  class$="[[getImageMenuClass(item, currentImageIndex)]]"
                >
                  <img
                    src="{{item.path}}"
                    hidden$="[[isVideo(item.extension)]]"
                  />
                  <video
                    src="{{item.path}}#t=0.1"
                    hidden$="[[!isVideo(item.extension)]]"
                    on-loadedmetadata="videoLoaded"
                  ></video>
                  <figcaption>
                    {{item.date}}
                    <span
                      class="duration"
                      hidden$="[[!isVideo(item.extension)]]"
                    ></span>
                  </figcaption>
                </figure>
              </template>
            </div>
          </div>
          <ha-fab
            slot="fab"
            is-wide$="[[isWide]]"
            icon="hass:plus"
            title="[[localize('ui.common.add')]]"
            on-click="addImage"
          >
          </ha-fab>
        </has-subpage>
      </div>
    `;
  }

  static get properties() {
    return {
      hass: Object,
      narrow: Boolean,
      showMenu: {
        type: Boolean,
        value: false,
      },
      panel: Object,
      images: {
        type: Object,
        computed: "getImages(hass)",
      },
      currentImage: {
        type: Object,
        computed: "getImage(currentImageIndex)",
      },
      currentImageIndex: {
        type: Number,
      },
      autoPlayVideo: {
        type: Boolean,
        value: false,
      },
    };
  }

  async _deleteImage() {
    const img = this.getImage(this.currentImageIndex);
    await this.hass.callService("ais_files", "remove_file", {
      path: img.path,
    });
    this.getImages(this.hass);
    this.nextImage();
  }

  addImage() {
    showAisgaleryDialog(this);
  }

  getImage(idx) {
    if (this.images !== undefined && idx !== undefined) {
      return this.images[idx];
    }
    return 0;
  }

  isVideo(fileExt) {
    const suportedVideos = ["mp4", "webm"];
    if (fileExt) {
      return suportedVideos.includes(fileExt);
    }

    return false;
  }

  imageMenuClick(e) {
    this.autoPlayVideo = true;
    this.currentImageIndex = e.model.item.index;
  }

  previousImage() {
    this.autoPlayVideo = true;
    if (this.currentImageIndex === 0)
      this.currentImageIndex = this.images.length - 1;
    else this.currentImageIndex--;
  }

  nextImage() {
    this.autoPlayVideo = true;
    if (this.currentImageIndex >= this.images.length - 1)
      this.currentImageIndex = 0;
    else this.currentImageIndex++;
  }

  ready() {
    super.ready();
    this.autoPlayVideo = false;
    this.currentImageIndex = 0;
    this.getImages(this.hass);
  }

  getImages(hass) {
    var paths = [];
    paths = hass.states["sensor.ais_gallery_img"].attributes.fileList;
    var lastIndex = 0;
    var lImages = [];
    for (let i = paths.length - 1; i >= lastIndex; i--) {
      var path = paths[i];
      var imageLocation = path.replace(
        "/data/data/pl.sviete.dom/files/home/AIS/www/",
        "/local/"
      );
      var arPath = path.split("/");
      var imageName = arPath[arPath.length - 1];

      var arFileName = imageName.split(".");
      var ext = arFileName[arFileName.length - 1].toLowerCase();
      imageName = imageName.substring(0, imageName.length - ext.length - 1);

      var imageDate = "";
      imageDate = imageName;

      var image = {
        path: imageLocation,
        name: imageName,
        extension: ext,
        date: imageDate,
        index: lImages.length,
      };
      lImages.push(image);
    }
    return lImages;
  }

  getImageMenuClass(image, idx) {
    if (image.index === idx) return "selected";
    return "";
  }

  videoLoaded(e) {
    this.getVideoDuration(e);
  }

  getVideoDuration(e) {
    var minutes = parseInt(e.target.duration / 60);
    if (minutes < 10) minutes = "0" + minutes;

    var seconds = parseInt(e.target.duration % 60);
    seconds = "0" + seconds;
    seconds = seconds.substring(seconds.length - 2);

    e.target.parentNode.querySelector(".duration").innerHTML =
      "[" + minutes + ":" + seconds + "]";
  }

  startVideo(e) {
    if (this.autoPlayVideo) e.target.play();
  }
}

customElements.define("ha-panel-aisgalery", HaPanelAisgalery);
