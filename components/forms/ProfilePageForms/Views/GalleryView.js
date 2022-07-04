import React from "react";
import IndividualGalleryPhoto from "../../../form-components/ProfilePage/GalleryComponents/IndividualGalleryPhoto";
import { Col, Row } from "react-bootstrap";
import PageNavigators from "../../../form-components/Common/PageNavigators";

function GalleryView(props) {
  return (
    <>
      {props.handleRemovePhoto && (
        <Row>
          <button
            className="lowerWidth"
            style={{ marginBottom: "25px" }}
            onClick={() => {
              props.handleLoader("/userProfile/gallery/addPhoto");
            }}
          >
            Add Photo to Gallery
          </button>
        </Row>
      )}
      {props.galleryPhotoList && props.galleryPhotoList.length > 0 && (
        <Row>
          {props.galleryPhotoList.map((gallery) => (
            <Col
              key={gallery.id}
              xs={12}
              lg={4}
              style={{ paddingBottom: "0px" }}
            >
              <IndividualGalleryPhoto
                id={gallery.id}
                createdAt={gallery.createdAt}
                photoId={gallery.photoId}
                photoDescription={gallery.photoDescription}
                privatePhoto={gallery.privatePhoto}
                handleUpdatePrivacyOfPhoto={props.handleUpdatePrivacyOfPhoto}
                handleRemovePhoto={props.handleRemovePhoto}
              />
            </Col>
          ))}
        </Row>
      )}
      <PageNavigators
        pageNumber={props.pageNumber}
        handleNextPageNavigation={props.handleNextPageNavigation}
        handlePrevPageNavigation={props.handlePrevPageNavigation}
      />
      {(!props.galleryPhotoList || !props.galleryPhotoList.length) && (
        <h2 className="center">No Photos Added to Gallery</h2>
      )}
    </>
  );
}

export default GalleryView;
