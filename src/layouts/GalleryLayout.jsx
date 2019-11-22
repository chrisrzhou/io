import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import PageLayout from 'layouts/PageLayout';
import { Box, FlexList } from 'ui';

export default function GalleryLayout({ entries, subtitle, title }) {
  return (
    <PageLayout subtitle={subtitle} title={title}>
      <FlexList flexDirection="column" spacing={5}>
        {entries.map(entry => {
          const { id, preview, slug, subtitle, title } = entry;
          return (
            <Box
              as={Link}
              css={`
                position: relative;

                .gallery-entry-image {
                  object-fit: cover;
                  transition: filter 0.3s ease-in-out;
                  width: 100%;
                }
                :hover .gallery-entry-image {
                  filter: brightness(1.2);
                }

                .gallery-entry-description {
                  background: rgba(0, 0, 0, 0.9);
                  bottom: 0;
                  left: 0;
                  opacity: 0;
                  position: absolute;
                  right: 0;
                  transition: opacity 0.3s ease-in-out,
                    transform 0.3s ease-in-out;
                  transform: translateY(50%);
                }
                :hover .gallery-entry-description {
                  opacity: 1;
                  transform: translateY(0);
                }
              `}
              key={id}
              to={slug}
            >
              <img
                className="gallery-entry-image"
                src={preview}
                style={{ height: 300 }}
              />
              <FlexList
                alignItems="baseline"
                className="gallery-entry-description"
                justifyContent="space-between"
                p={2}
                spacing={0}
              >
                <Box as="h2">{title}</Box>
                {subtitle && (
                  <Box color="gray3" fontSize="s">
                    {subtitle}
                  </Box>
                )}
              </FlexList>
            </Box>
          );
        })}
      </FlexList>
    </PageLayout>
  );
}

GalleryLayout.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      preview: PropTypes.object.isRequired, // gatsby-image fluid prop
      slug: PropTypes.string.isRequired,
      subtitle: PropTypes.node,
      title: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  subtitle: PropTypes.node,
  title: PropTypes.string.isRequired,
};
