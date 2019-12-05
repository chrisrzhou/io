import { globalHistory, navigate } from '@reach/router';
import React from 'react';
import PropTypes from 'prop-types';

import Tags from 'components/Tags';
import PageLayout from './PageLayout';
import { TAG_SEARCH_PARAM } from 'enums';
import { useToggle } from 'hooks';
import { FlexList, Modal, Tag } from 'ui';
import { pluralize } from 'utils';

function getTags(entries, pathname) {
  const tagsMap = entries.reduce((tagsCount, entry) => {
    entry.tags.forEach(tag => {
      if (!tagsCount[tag]) {
        tagsCount[tag] = 0;
      }
      tagsCount[tag] += 1;
    });
    return tagsCount;
  }, {});

  return Object.keys(tagsMap).map(tag => ({
    count: tagsMap[tag],
    pathname,
    value: tag,
  }));
}

export default function WithTagsLayout({ entries, renderEntry, title }) {
  const [shown, show, hide] = useToggle(false);

  const { pathname, search } = globalHistory.location;
  const appliedTagValue = new URLSearchParams(search).get(TAG_SEARCH_PARAM);

  const filteredEntries = entries.filter(entry => {
    return !appliedTagValue || entry.tags.includes(appliedTagValue);
  });

  const description = (
    <>
      {pluralize('entry', filteredEntries.length)} found
      {appliedTagValue && (
        <>
          {' '}
          for <Tag pathname={pathname} value={appliedTagValue} /> (
          <a onClick={() => navigate(pathname)}>clear</a>)
        </>
      )}
    </>
  );

  const tags = getTags(entries, pathname);
  let actions = [];
  if (tags.length > 0) {
    actions = [{ icon: 'hash', onClick: show, title: 'Tags' }];
  }

  return (
    <PageLayout actions={actions} description={description} title={title}>
      <FlexList flexDirection="column" spacing={5}>
        {filteredEntries.map(entry => (
          <React.Fragment key={entry.id}>{renderEntry(entry)}</React.Fragment>
        ))}
      </FlexList>
      <Modal onDismiss={hide} shown={shown} title="Tags">
        <Tags flexDirection="column" onSelectTag={hide} tags={tags} />
      </Modal>
    </PageLayout>
  );
}

WithTagsLayout.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    }).isRequired,
  ).isRequired,
  renderEntry: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
