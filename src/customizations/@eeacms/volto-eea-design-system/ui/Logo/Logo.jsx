import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';

/**
 * Checks if a URL is external.
 * @param {string} url The URL to check.
 * @returns {boolean} True if the URL is external; otherwise, false.
 */
const isExternalUrl = (url) => /^(http|https):\/\//.test(url);

/**
 * Logo component class.
 * @function Logo
 * @param {Object} src, invertedSrc, id, url, alt, title, inverted Props for the Logo component
 * @returns {JSX.Element} Markup of the component.
 */
const Logo = ({ src, invertedSrc, id, url, alt, title, inverted }) => {
  // Determine whether the logo should link to an external URL
  const isExternal = isExternalUrl(url);

  return isExternal ? (
    <a
      href={url}
      title={title}
      className={'logo'}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        src={inverted ? invertedSrc : src}
        alt={alt}
        title={title}
        className="eea-logo"
        id={id}
      />
    </a>
  ) : (
    <Link to={url} title={title} className={'logo'}>
      <Image
        src={inverted ? invertedSrc : src}
        alt={alt}
        title={title}
        className="eea-logo"
        id={id}
      />
    </Link>
  );
};

export default Logo;
