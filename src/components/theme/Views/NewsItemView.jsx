// import { When } from '@plone/volto/components/theme/View/EventDatesInfo';
import React from 'react';
import RenderBlocks from '@plone/volto/components/theme/View/RenderBlocks';
import { Label } from 'semantic-ui-react';
import { BannerTitle } from '@eeacms/volto-insitu-policy/components';

// const Date = (props) => {
//   const date = props.content?.effective;
//   return date ? (
//     <>
//       <When start={date} end={date} whole_day={true} open_end={false} />
//     </>
//   ) : null;
// };

const SubjectTags = (props) => {
  const tags = props.content?.subjects;
  return tags?.length > 0 ? (
    <>
      Filed under:{' '}
      {tags.map((tag) => (
        <Label key={tag}>{tag}</Label>
      ))}
    </>
  ) : null;
};

function NewsItemView(props) {
  const { content } = props;

  return (
    <div className="insitu-newsitem-view">
      <BannerTitle content={content} />
      <div className="ui container">
        <RenderBlocks {...props} />
        {/* <Date {...props} /> */}
        <SubjectTags {...props} />
      </div>
    </div>
  );
}

export default NewsItemView;
