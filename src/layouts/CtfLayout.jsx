import { globalHistory, navigate } from '@reach/router';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

import PageLayout from './PageLayout';
import TagsSummary from 'components/TagsSummary';
import TableOfContents from 'components/TableOfContents';
import { useToggle } from 'hooks';
import { TAG_SEARCH_PARAM, searchTag } from 'routes';
import { Modal, Tag } from 'ui';
import { parseTags, pluralize, summarizeTags } from 'utils';

const DATA_TAGS_ATTRIBUTE = 'data-tags';

export default function CtfLayout({ data }) {
  const bodyRef = useRef();
  const [entriesCount, setEntriesCount] = useState();
  const [shown, show, hide] = useToggle(false);

  const { body, frontmatter, rawBody, tableOfContents } = data.mdx;
  const { title } = frontmatter;
  const tags = summarizeTags(parseTags(rawBody));

  const { pathname, search } = globalHistory.location;
  const appliedTagValue = new URLSearchParams(search).get(TAG_SEARCH_PARAM);

  // create formal tags
  useEffect(() => {
    const contentNodes = bodyRef.current.querySelectorAll('p');
    contentNodes.forEach(contentNode => {
      const contentChildNode = contentNode.firstChild;
      if (contentChildNode && contentChildNode.nodeName === '#text') {
        const dataTags = contentChildNode.nodeValue;
        const tags = parseTags(dataTags);
        if (tags.length > 0) {
          contentNode.setAttribute(DATA_TAGS_ATTRIBUTE, dataTags);
          contentNode.removeChild(contentChildNode);
          tags.forEach(tag => {
            const a = document.createElement('a');
            a.appendChild(document.createTextNode(`#${tag}`));
            a.style.fontSize = 'var(--font-size-s)';
            a.style.marginRight = 'var(--space-m)';
            a.onclick = function() {
              navigate(searchTag(pathname, tag));
            };
            contentNode.appendChild(a);
          });
        }
      }
    });
  }, [pathname]);

  // show/hide nodes neighboring tag nodes depending if they match the appliedTagValue
  useEffect(() => {
    const tagNodes = bodyRef.current.querySelectorAll(
      `[${DATA_TAGS_ATTRIBUTE}]`,
    );

    let filteredEntriesCount = 0;
    tagNodes.forEach(tagNode => {
      let { previousSibling, nextSibling } = tagNode;
      const dataTags = tagNode.getAttribute(DATA_TAGS_ATTRIBUTE);
      const hasAppliedTagValue = dataTags.includes(appliedTagValue);

      if (hasAppliedTagValue) {
        filteredEntriesCount++;
      }

      const display = appliedTagValue && !hasAppliedTagValue ? 'none' : 'block';
      tagNode.style.display = display;

      let hasPreviousSiblings = true;
      while (hasPreviousSiblings) {
        previousSibling.style.display = display;
        if (previousSibling && !previousSibling.nodeName.startsWith('H')) {
          previousSibling = previousSibling.previousSibling;
        } else {
          hasPreviousSiblings = false;
        }
      }

      let hasNextSiblings = true;
      while (hasNextSiblings) {
        if (nextSibling && !nextSibling.nodeName.startsWith('H')) {
          nextSibling.style.display = display;
          nextSibling = nextSibling.nextSibling;
        } else {
          hasNextSiblings = false;
        }
      }
    });

    if (appliedTagValue) {
      setEntriesCount(filteredEntriesCount);
    }
  }, [appliedTagValue]);

  function clearTags() {
    hide();
    navigate(pathname);
    setEntriesCount();
  }

  const description = appliedTagValue ? (
    <div>
      {pluralize('entry', entriesCount)} found for{' '}
      <Tag pathname={pathname} value={appliedTagValue} /> (
      <a onClick={clearTags}>clear</a>)
    </div>
  ) : (
    <TagsSummary pathname={pathname} tags={tags} />
  );

  const actions = tableOfContents.items
    ? [{ icon: 'book', onClick: show, title: 'Table of contents' }]
    : undefined;

  return (
    <PageLayout actions={actions} description={description} title={title}>
      <div ref={bodyRef}>
        <MDXRenderer>{body}</MDXRenderer>
      </div>
      <Modal onDismiss={hide} shown={shown} title="Table of Contents">
        <TableOfContents
          contents={tableOfContents}
          onSelectContent={clearTags}
        />
      </Modal>
    </PageLayout>
  );
}

CtfLayout.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.object.isRequired,
  }).isRequired,
};

export const pageQuery = graphql`
  query ctf($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
      }
      rawBody
      tableOfContents
    }
  }
`;
