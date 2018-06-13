import React, { Component } from "react";
import {
  Form,
  Radio,
  Step,
  Progress,
  List,
  Grid,
  Image,
  Icon,
  Item,
  Header,
  Segment,
  Accordion,
  Container,
  Message,
  Divider,
  Button,
  Loader,
  Dropdown
} from "semantic-ui-react";
import { connect } from "react-redux";

import {
  fetchCountStats,
  fetchPhotoScanStatus,
  fetchWordCloud,
  generateEventAlbums,
  fetchAutoAlbumProcessingStatus,
  generateEventAlbumTitles,
  fetchWorkerAvailability
} from "../actions/utilActions";
import { scanPhotos, fetchPhotos } from "../actions/photosActions";

import CountryPiChart from "../components/charts/countryPiChart";
import { CountStats } from "../components/statistics";
import WordCloud from "../components/charts/wordCloud";

import { AllPhotosMap, EventMap, LocationClusterMap } from "../components/maps";
import EventCountMonthGraph from "../components/eventCountMonthGraph";
import FaceClusterScatter from "../components/faceClusterGraph";
import SocialGraph from "../components/socialGraph";
import LazyLoad from "react-lazyload";
import { LocationLink } from "../components/locationLink";

export class Settings extends Component {
  state = {
    accordionOneActive: false,
    accordionTwoActive: false,
    accordionThreeActive: false,
    accordionFourActive: false
  };

  onPhotoScanButtonClick = e => {
    this.props.dispatch(scanPhotos());
  };

  onGenerateEventAlbumsButtonClick = e => {
    this.props.dispatch(generateEventAlbums());
  };

  render() {
    var buttonsDisabled = !this.props.workerAvailability;

    return (
      <div style={{ padding: 10 }}>
        <Header as="h2">Settings</Header>

        <Divider hidden />

        <Header as="h3">Appearance settings</Header>

        <Grid>
          <Grid.Row>
            <Grid.Column width={2} textAlign="right">
              <b>Thumbnail size</b>
            </Grid.Column>

            <Grid.Column width={14}>
              <Form>
                <Form.Field>
                  <Radio
                    label="Big thumbnails"
                    name="radioGroup"
                    value="loose"
                    onChange={() =>
                      this.props.dispatch({
                        type: "SET_GRID_TYPE",
                        payload: "loose"
                      })
                    }
                    checked={this.props.gridType === "loose"}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label="Small thumbnails"
                    name="radioGroup"
                    value="dense"
                    onChange={() =>
                      this.props.dispatch({
                        type: "SET_GRID_TYPE",
                        payload: "dense"
                      })
                    }
                    checked={this.props.gridType === "dense"}
                  />
                </Form.Field>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Header as="h3">Library actions</Header>

        <Divider hidden />

        <Accordion fluid>
          <Accordion.Title
            active={this.state.accordionOneActive}
            onClick={() => {
              this.setState({
                accordionOneActive: !this.state.accordionOneActive
              });
            }}
          >
            <b>Scan Photos</b>
            <Icon name="question" />
          </Accordion.Title>
          <Accordion.Content active={this.state.accordionOneActive}>
            <Message info attached="top">
              <Message.Header>The backend server will:</Message.Header>
              <Message.List>
                <List bulleted>
                  <List.Item>
                    Make a list of all jpg files in subdirectories. For each jpg
                    file:
                  </List.Item>
                  <List.Item>
                    If the filepath exists in the database, we skip.
                  </List.Item>
                  <List.Item>
                    Calculate a unique ID of the image file (md5)
                  </List.Item>
                  <List.Item>
                    If this image file is already in the database, we skip.
                  </List.Item>
                  <List.Item>Generate a number of thumbnails </List.Item>
                  <List.Item>Generate image captions </List.Item>
                  <List.Item>Extract Exif information </List.Item>
                  <List.Item>
                    Reverse geolocate to get location names from GPS coordinates{" "}
                  </List.Item>
                  <List.Item>Extract faces. </List.Item>
                  <List.Item>Add photo to thing and place albums. </List.Item>
                </List>
              </Message.List>
            </Message>
          </Accordion.Content>
        </Accordion>

        <Button
          fluid
          size="tiny"
          attached={this.state.accordionOneActive ? "bottom" : false}
          onClick={this.onPhotoScanButtonClick}
          disabled={buttonsDisabled}
          color="blue"
        >
          <Icon
            name="refresh"
            loading={
              this.props.statusPhotoScan.status &&
              this.props.statusPhotoScan.added
            }
          />
          {this.props.statusPhotoScan.added
            ? "Scanning Photos " +
              `(${this.props.statusPhotoScan.added}/${
                this.props.statusPhotoScan.to_add
              })`
            : "Scan Photos"}
        </Button>

        <Accordion fluid>
          <Accordion.Title
            active={this.state.accordionTwoActive}
            onClick={() => {
              this.setState({
                accordionTwoActive: !this.state.accordionTwoActive
              });
            }}
          >
            <b>Make Event Albums</b>
            <Icon name="question" />
          </Accordion.Title>
          <Accordion.Content active={this.state.accordionTwoActive}>
            <Message positive attached="top">
              <Message.Header>The backend server will:</Message.Header>
              <Message.Content>
                First group photos by time taken. If two consecutive photos are
                taken within 12 hours of each other, the two photos are
                considered to be from the same event. After groups are put
                together in this way, it automatically generates a title for
                this album.
              </Message.Content>
            </Message>
          </Accordion.Content>
        </Accordion>

        <Button
          fluid
          size="tiny"
          attached={this.state.accordionTwoActive ? "bottom" : false}
          onClick={this.onGenerateEventAlbumsButtonClick}
          disabled={buttonsDisabled}
          color="green"
        >
          <Icon name="wizard" />Make Event Albums
        </Button>

        <Accordion fluid>
          <Accordion.Title
            active={this.state.accordionThreeActive}
            onClick={() => {
              this.setState({
                accordionThreeActive: !this.state.accordionThreeActive
              });
            }}
          >
            <b>Regenerate Event Titles</b>
            <Icon name="question" />
          </Accordion.Title>
          <Accordion.Content active={this.state.accordionThreeActive}>
            <Message warning attached="top">
              <Message.Header>What is this for?</Message.Header>
              <Message.Content>
                Automatically generated albums have names of people in the
                titles. If you trained your face classifier after making event
                albums, you can generate new titles for already existing event
                albums to reflect the new names associated with the faces in
                photos.
              </Message.Content>
            </Message>
          </Accordion.Content>
        </Accordion>

        <Button
          fluid
          size="tiny"
          attached={this.state.accordionThreeActive ? "bottom" : false}
          onClick={() => {
            this.props.dispatch(generateEventAlbumTitles());
          }}
          indicating
          disabled={buttonsDisabled}
          color="brown"
        >
          <Icon name="wizard" />Regenerate Event Titles
        </Button>
      </div>
    );
  }
}

Settings = connect(store => {
  return {
    gridType: store.ui.gridType,
    statusPhotoScan: store.util.statusPhotoScan,
    statusAutoAlbumProcessing: store.util.statusAutoAlbumProcessing,
    generatingAutoAlbums: store.util.generatingAutoAlbums,
    scanningPhotos: store.photos.scanningPhotos,
    fetchedCountStats: store.util.fetchedCountStats,
    workerAvailability: store.util.workerAvailability
  };
})(Settings);