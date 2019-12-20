import { globalHistory, navigate } from '@reach/router';
import React from 'react';
import PropTypes from 'prop-types';

import TagsSummary from 'components/TagsSummary';
import PageLayout from './PageLayout';
import { TAG_SEARCH_PARAM } from 'enums';
import { useToggle } from 'hooks';
import { FlexList, Modal, Tag } from 'ui';
import { summarizeTags, pluralize } from 'utils';

function getTags(entries) {
  const tags = [];
  entries.forEach(entry => {
    entry.tags.forEach(tag => {
      tags.push(tag);
    });
  });
  return summarizeTags(tags);
}

export default function WithTagsLayout({ entries, renderEntry, title }) {
  const [shown, show, hide] = useToggle(false);

  const { pathname, search } = globalHistory.location;
  const appliedTagValue = new URLSearchParams(search).get(TAG_SEARCH_PARAM);

  const tags = getTags(entries);
  const filteredEntries = entries.filter(entry => {
    return !appliedTagValue || entry.tags.includes(appliedTagValue);
  });

  const actions =
    tags.length > 0
      ? [{ icon: 'hash', onClick: show, title: 'Tags' }]
      : undefined;

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

  return (
    <PageLayout actions={actions} description={description} title={title}>
      <FlexList flexDirection="column" spacing={5}>
        {filteredEntries.map(entry => (
          <React.Fragment key={entry.id}>{renderEntry(entry)}</React.Fragment>
        ))}
      </FlexList>
      <Modal onDismiss={hide} shown={shown} title="Tags">
        <TagsSummary
          flexDirection="column"
          onSelectTag={hide}
          pathname={pathname}
          tags={tags}
        />
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
