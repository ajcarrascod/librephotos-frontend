import { useForceUpdate, useViewportSize } from "@mantine/hooks";
import React, { useState } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import ReactPlayer from "react-player";

import { serverAddress } from "../../api_client/apiClient";
import { useAppSelector } from "../../store/store";
import { Sidebar } from "./Sidebar";
import { Toolbar } from "./Toolbar";

type Props = {
  lightboxImageId: any;
  lightboxImageIndex: any;
  idx2hash: any;
  isPublic: boolean;
  onCloseRequest: () => void;
  onMovePrevRequest: () => void;
  onMoveNextRequest: () => void;
  onImageLoad: () => void;
};
const SCROLLBAR_WIDTH = 15;

export const LightBox = (props: Props) => {
  const [lightboxSidebarShow, setLightBoxSidebarShow] = useState(false);
  const { photoDetails } = useAppSelector(store => store.photos);

  const { width } = useViewportSize();
  let LIGHTBOX_SIDEBAR_WIDTH = 320;
  if (width < 600) {
    LIGHTBOX_SIDEBAR_WIDTH = width - SCROLLBAR_WIDTH;
  }
  const {
    lightboxImageId,
    lightboxImageIndex,
    idx2hash,
    isPublic,
    onCloseRequest,
    onMovePrevRequest,
    onMoveNextRequest,
    onImageLoad,
  } = props;

  const closeSidepanel = () => {
    setLightBoxSidebarShow(!lightboxSidebarShow);
  };

  const getCurrentPhotodetail = () => {
    return photoDetails[lightboxImageId];
  };

  const getPreviousId = () => {
    const image = idx2hash.slice((lightboxImageIndex - 1) % idx2hash.length)[0];
    return image ? image.id : undefined;
  };

  const getNextId = () => {
    const image = idx2hash.slice((lightboxImageIndex + 1) % idx2hash.length)[0];
    return image ? image.id : undefined;
  };

  const getPictureUrl = id => {
    return `${serverAddress}/media/thumbnails_big/${id}`;
  };

  const getVideoUrl = id => {
    return `${serverAddress}/media/video/${id}`;
  };

  const isVideo = () => {
    if (getCurrentPhotodetail() === undefined || getCurrentPhotodetail().video === undefined) {
      return false;
    }
    return getCurrentPhotodetail().video;
  };

  const getVideoComponent = id =>
    isVideo() ? (
      <ReactPlayer width="100%" height="100%" controls playing url={getVideoUrl(id)} progressInterval={100} />
    ) : null;

  return (
    <div>
      <Lightbox
        // @ts-ignore
        mainSrc={!isVideo() ? getPictureUrl(lightboxImageId) : null}
        nextSrc={!isVideo() ? getPictureUrl(getNextId()) : undefined}
        prevSrc={!isVideo() ? getPictureUrl(getPreviousId()) : undefined}
        mainCustomContent={getVideoComponent(lightboxImageId)}
        nextCustomContent={getVideoComponent(getNextId())}
        prevCustomContent={getVideoComponent(getPreviousId())}
        imageLoadErrorMessage=""
        toolbarButtons={[
          <Toolbar
            photosDetail={photoDetails[lightboxImageId]}
            lightboxSidebarShow={lightboxSidebarShow}
            closeSidepanel={closeSidepanel}
            isPublic={isPublic}
          />,
        ]}
        onCloseRequest={onCloseRequest}
        onAfterOpen={() => {
          onImageLoad();
        }}
        onMovePrevRequest={() => {
          onMovePrevRequest();
        }}
        onMoveNextRequest={() => {
          onMoveNextRequest();
        }}
        reactModalStyle={{
          content: {},
          overlay: {
            right: lightboxSidebarShow ? LIGHTBOX_SIDEBAR_WIDTH : 0,
            width: lightboxSidebarShow ? width - SCROLLBAR_WIDTH - LIGHTBOX_SIDEBAR_WIDTH : width,
          },
        }}
      />
      {lightboxSidebarShow ? (
        <Sidebar photoDetail={getCurrentPhotodetail()} closeSidepanel={closeSidepanel} isPublic={isPublic} />
      ) : (
        <div></div>
      )}
    </div>
  );
};
