import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Dimensions, Image, LayoutAnimation, TouchableOpacity,Button } from 'react-native';

const { width, height } = Dimensions.get('window');

export default class TurtorialStep extends Component {
  static propTypes = {
    step: PropTypes.number,
    tooltip: PropTypes.string,
    visible: PropTypes.bool,
    style: PropTypes.object,
    position: PropTypes.object,
    tooltipPosition: PropTypes.object,
    onPress: PropTypes.func,
    okEnable: PropTypes.bool,
    onPressMark: PropTypes.func,
    endModal: PropTypes.bool,
    isCircleMask: PropTypes.bool,
  };

  static defaultProps = {
    okEnable: true,
    endModal: false,
    isCircleMask: true,
  };

  render() {
    const {
      tooltip, visible, position, tooltipPosition, okEnable, onPressMark, endModal, isCircleMask,
    } = this.props;

    const firstOverlayWidth = position.left;
    const firstOverlayHeight = height;
    const firstOverlayX = 0;
    const firstOverlayY = 0;

    const secondOverlayWidth = this.props.style.width;
    const secondOverlayHeight = position.top;
    const secondOverlayX = position.left;
    const secondOverlayY = 0;

    const thirdOverlayWidth = width - position.left - this.props.style.width;
    const thirdOverlayHeight = height;
    const thirdOverlayX = position.left + this.props.style.width;
    const thirdOverlayY = 0;

    const fourthOverlayWidth = this.props.style.width;
    const fourthOverlayHeight = height - position.top - this.props.style.height;
    const fourthOverlayX = position.left;
    const fourthOverlayY = position.top + this.props.style.height;
    const lineLogoImg = require('../mask.png');

    return (
      visible &&
        <View style={styles.backArea}>
          <View style={[styles.overlay,
            {
              left: firstOverlayX,
              top: firstOverlayY,
              width: firstOverlayWidth,
              height: firstOverlayHeight,
            }]}
          />
          <View style={[styles.overlay,
            {
              left: secondOverlayX,
              top: secondOverlayY,
              width: secondOverlayWidth,
              height: secondOverlayHeight,
            }]}
          />
          <View style={[styles.overlay,
            {
              left: thirdOverlayX,
              top: thirdOverlayY,
              width: thirdOverlayWidth,
              height: thirdOverlayHeight,
            }]}
          />
          <View style={[styles.overlay,
            {
              left: fourthOverlayX,
              top: fourthOverlayY,
              width: fourthOverlayWidth,
              height: fourthOverlayHeight,
            }]}
          />
          <TouchableOpacity style={styles.backClickArea} onPress={() => this.OKButton()} />
          {!endModal &&
            <View style={[styles.tooltip, tooltipPosition]}>
              <Text style={styles.tooltipText}>{tooltip}</Text>
              {okEnable &&  <View style={styles.modalActionsContainer}>
              <TouchableOpacity
              onPress={() => this.OKButton()}
              // disabled={isSubmitting}
              style={[styles.modalActions, {backgroundColor: '#0078FF'}]}>
              <Text style={styles.actionText}>
                OK
              </Text>
            </TouchableOpacity></View>
            }
            </View>
          }
          {okEnable &&
            <View style={[{ width: this.props.style.width, height: this.props.style.height }, this.props.position]}>
              <View style={[this.props.style, styles.coachMarks]} />
              {isCircleMask &&
                <Image
                  source={lineLogoImg}
                  resizeMode="stretch"
                  style={{
                  flex: 1,
                  width: null,
                  height: null,
                  }}
                />
              }
            </View>
          }
          {!okEnable &&
            <View style={[{ width: this.props.style.width, height: this.props.style.height }, this.props.position]}>
              {isCircleMask &&
              <Image
                source={lineLogoImg}
                resizeMode="stretch"
                style={{
                flex: 1,
                width: null,
                height: null,
            }}
              />
            }
              <View style={[this.props.style, styles.coachMarks]}>
                <TouchableOpacity
                  onPress={() => {
                  this.OKButton();
                  onPressMark();
                }}
                  style={{ width: this.props.style.width, height: this.props.style.height }}
                  activeOpacity={1.0}
                />
              </View>
            </View>
          }
        </View>
    );
  }

  OKButton() {
    LayoutAnimation.easeInEaseOut();
    this.props.onPress(this.props.step);
  }
}

const styles =  StyleSheet.create({
  coachMarks: {
    position: 'absolute',
  },
  modalContainer: {
    padding: 8,
    paddingBottom: 0,
    flex: 1,
    backgroundColor: 'white',
  },
  modalActionsContainer: {
    flexDirection: 'row',
    // backgroundColor: 'red',
    flexGrow: 1,
    // width: '100%',
    justifyContent: 'flex-end',
    paddingHorizontal: 8
  },
  tooltip: {
    backgroundColor: '#ffffff',
    borderColor: 'rgba(216, 213, 212, 0.8)',
    borderRadius: 8,
    overflow: 'hidden',
    position: 'absolute',
    alignSelf: 'center',
    minWidth: 150,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: 16,
    paddingTop: 16,
    // padding: 30,
    paddingBottom: 25,
  },
  tooltipText: {
    color: 'rgba(0, 0, 0, 0.87)',
    textAlign: 'center',
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
    flexGrow: 1,
    // flexShrink: 1,
    fontFamily: 'Quicksand-Regular',
    paddingVertical: 8,
  },
  modalActions: {
    // flex: 1,
    paddingVertical: 11,
    paddingHorizontal: 25,
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
    borderRadius: 10,
    // padding: 8,
  },
  actionText: {
    fontFamily: 'Quicksand-Bold',
    color: 'black',
  },
  backArea: {
    width,
    height,
    top: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  bgContainer: {
    flex: 1,
    width: null,
    height: null,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
  },
  backClickArea: {
    width,
    height,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    width: 150,
  },
  buttonText: {
    color: 'rgba(70, 165, 135, 1)',
  },
  dogImage: {
    marginVertical: 16,
    marginTop: 15,
    marginBottom: 10,
    width: 124,
    height: 124,
  },
  centeringTxt: {
    color: 'rgba(0, 0, 0, 0.87)',
    textAlign: 'center',
    paddingLeft: 3,
    paddingRight: 3,
  },
  skipScene: {
    position: 'absolute',
    width: 300,
    height: 70,
    left: (width - 300) / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skip: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  skipText: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 13,
  },
});
