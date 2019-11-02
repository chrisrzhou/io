import './Layout.css';

import { ThemeProvider } from 'emotion-theming';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import { Box } from 'rebass';

import { Container } from './ui';
import Navcrumbs from './Navcrumbs';
import Footer from './Footer';
import theme from 'theme';

export default function Layout({ children, description, title }) {
  return (
    <ThemeProvider theme={theme}>
      <Helmet
        htmlAttributes={{ lang: 'en' }}
        meta={[
          {
            name: 'description',
            content: description,
          },
        ]}
        title={title}
      />
      <Box
        bg="gray5"
        color="gray1"
        css={`
          line-height: ${theme.lineHeights.body};
          min-height: 100vh;
          position: relative;

          a {
            color: ${theme.colors.gray3};
            cursor: pointer;
            text-decoration: none;
            &:hover {
              color: ${theme.colors.gray1};
            }
          }

          blockquote {
            border-bottom: 1px solid ${theme.colors.gray4};
            border-top: 1px solid ${theme.colors.gray4};
            color: ${theme.colors.gray3};
            font-family: ${theme.fonts.serif};
            font-size: 1.1rem;
            margin: ${theme.space[4]}px;
            padding: ${theme.space[3]}px;
            position: relative;
            :before {
              content: '“';
              position: absolute;
              top: 0em;
              left: 50%;
              transform: translate(-50%, -50%);
              font-size: 6rem;
              color: ${theme.colors.gray4};
            }
            cite {
              display: block;
              text-align: right;
              :before {
                content: '--';
              }
            }
          }
          code,
          pre {
            font-family: ${theme.fonts.monospace};
          }
        `}
        fontFamily="body"
        fontSize="base"
      >
        <Navcrumbs />
        <Container as="main" pb={6}>
          <h1>{title}</h1>
          {children}
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string,
};
