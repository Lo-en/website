import PropTypes from "prop-types"
import React from "react"
import classnames from "classnames"
import styles from "./posts-list-item.module.scss"
import Button from "../button/button";
import Image from '../image/image';
import Title from '../title/title';
import { Link } from "gatsby";
import Col from '../grid/col/col';
import Row from '../grid/row/row';
import { GridSize } from '../../constants/grid';

const PostsListItem = (props) => {
  const { id, title, content, slug, image, category } = props;
  const theme = category.theme.replace(/\s/g, '');

  const isEven = 	id%2 === 0;
  const thumbanilContainerClass = classnames(styles.col, styles.thumbnailContainer, {
    [styles.thumbnailContainerIsOdd]: !isEven
  });
  const thumbnailClass = classnames(styles.thumbnail, {
    [styles.thumbnailIsOdd]: !isEven,
    [styles[`theme${theme}`]]: theme,
  });
  const contentClass = classnames(styles.col, styles.contentCol, {
    [styles.contentlIsOdd]: !isEven,
  });
  const titleContainer = classnames(styles.content, styles.titleContainer, {
    [styles.titleIsOdd]: !isEven,
  })
  const contentContainer = classnames(styles.content, styles.copyContainer);
  const categoryThemeClass = classnames(styles.categoryLink, {
    [styles[`themeCategory${theme}`]]: theme,
  })

  return (
    <Row className={styles.row} size={GridSize.MEDIUM}>
      <Col className={thumbanilContainerClass} size={GridSize.MEDIUM}>
        <div className={thumbnailClass}>
          <Image className={styles.image} fluid={image.fluid}></Image>
        </div>
      </Col>
      <Col className={contentClass} size={GridSize.MEDIUM}>
        <div className={titleContainer}>
          <Title className={styles.category} type={"h6"}>
            <Link className={categoryThemeClass} to={`/${category.slug}/`}>
              {category.title}
            </Link>
          </Title>
          <Title className={styles.title} type={"h3"}>
            {title}
          </Title>
        </div>
        <div className={contentContainer}>
          <p>{content}</p>
          <Button internal url={slug} text={"Read More"} />
        </div>
      </Col>
    </Row>
  )
};

PostsListItem.propTypes = {
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default PostsListItem;