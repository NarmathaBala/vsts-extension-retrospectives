import * as React from 'react';
import Slider, { Settings } from "react-slick";
import FeedbackColumn, { FeedbackColumnProps } from './feedbackColumn';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import FeedbackItem, { IFeedbackItemProps, IGroupedFeedbackItemProps } from './feedbackItem';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { withAITracking } from '@microsoft/applicationinsights-react-js';
import { reactPlugin } from '../utilities/external/telemetryClient';
import { itemDataService } from '../dal/itemDataService';
import feedbackItemGroup from './feedbackItemGroup';
import { IFeedbackItemDocument } from '../interfaces/feedback';
import { IColumnItem } from './feedbackBoard';

export interface IFeedbackCarouselProps {
  feedbackColumnPropsList: FeedbackColumnProps[];
  isFeedbackAnonymous: boolean;
  //isGroupedFeedback: FeedbackItemHelper
}

export interface IFeedbackCarouselState {
}

class FeedbackCarousel extends React.Component<IFeedbackCarouselProps, IFeedbackCarouselState>{
  private renderFeedbackCarouselItems = (feedbackColumnProps: FeedbackColumnProps) => {
    const columnItems = feedbackColumnProps.columnItems.sort((item1, item2) => item2.feedbackItem.upvotes - item1.feedbackItem.upvotes);

    return columnItems
      // Carousel only shows main item cards.
      // TODO: hakenned change that
      .filter((columnItem) => !columnItem.feedbackItem.parentFeedbackItemId)
      .map((columnItem) => {
        const feedbackItemProps =
          FeedbackColumnHelper.createFeedbackItemProps(feedbackColumnProps, columnItem, true);

        //TODO: hakenned - consider showing the count? and expand/collapse caret

        console.log('toot toot carousel happened')
        feedbackItemProps.isGroupedCarouselItem = columnItem.feedbackItem.childFeedbackItemIds ? (columnItem.feedbackItem.childFeedbackItemIds.length > 0 ? true : false) : false;

        if (feedbackItemProps.isGroupedCarouselItem) {
          //TODO: COME BACK TO THIS
          const columnItemChildrenIds = columnItem.feedbackItem.childFeedbackItemIds;
          const childrenTitlesLong: String[] = [];
          const childrenTitlesShort: String[] = [];
          columnItemChildrenIds.forEach(childId => {
            const childFeedbackItem = columnItems.find(childItem => childItem.feedbackItem.id == childId)
            const origTitle = childFeedbackItem.feedbackItem.title
            const shortTitle = origTitle.length > 20 ? origTitle.substring(0, 20) + '...' : origTitle;
            childrenTitlesShort.push(shortTitle)
            childrenTitlesLong.push(origTitle)
          });

          feedbackItemProps.groupTitles = {
            longTitles: childrenTitlesLong,
            shortTitles: childrenTitlesShort //TODO: comeback to this logic
          };

        }


        return (
          <div key={feedbackItemProps.id} className="feedback-carousel-item">
            <FeedbackItem
              key={feedbackItemProps.id}
              groupTitles={
                feedbackItemProps.groupTitles
              }
              {...feedbackItemProps}
            />
          </div>
        );
      });
  }

  private renderSingleFeedbackCarouselItem = (feedbackColumnProps: FeedbackColumnProps) => {
    return (
      <div className="feedback-carousel-item">
        <FeedbackItem
          {...FeedbackColumn.createFeedbackItemProps(feedbackColumnProps, feedbackColumnProps.columnItems.filter((columnItem) => !columnItem.feedbackItem.parentFeedbackItemId)[0], true)}
        />
      </div>
    );
  }

  public render() {
    const settings: Settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      arrows: true,
      variableWidth: true,
      accessibility: true,
    };

    return (
      <Pivot
        className="feedback-carousel-pivot">
        {this.props.feedbackColumnPropsList.map((columnProps) => {
          const mainCardCount = columnProps.columnItems.filter((columnItem) => !columnItem.feedbackItem.parentFeedbackItemId).length;

          return <PivotItem
            key={columnProps.columnId}
            headerText={columnProps.columnName}
            className="feedback-carousel-pivot-item"
          >
            {mainCardCount === 1 &&
              this.renderSingleFeedbackCarouselItem(columnProps)
            }
            {mainCardCount >= 2 &&
              // @ts-ignore TS2786
              <Slider {...settings}>
                {React.Children.map(this.renderFeedbackCarouselItems(columnProps), (child: React.ReactElement<typeof FeedbackItem>) => {
                  return (
                    <div
                      className="feedback-carousel-item-wrapper"
                      key={child.key}>
                      {child}
                    </div>
                  );
                })}
              </Slider>
            }
          </PivotItem>
        })}
      </Pivot>
    );
  }
}

export default withAITracking(reactPlugin, FeedbackCarousel);