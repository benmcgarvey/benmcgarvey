import { HeaderPage } from '@components/HeaderPage'
import { Layout } from '@components/Layout'
import { RenderContent } from '@components/RenderContent'

import { PostClass } from '@helpers/PostClass'
import { SEO } from '@meta/seo'

import { GhostPostOrPage, GhostSettings } from '@lib/ghost'
import { ISeoImage } from '@meta/seoImage'

/**
 * Single page (/:slug)
 *
 * This file renders a single page and loads all the content.
 *
 */

interface PageProps {
  cmsData: {
    page: GhostPostOrPage
    settings: GhostSettings
    seoImage: ISeoImage
    bodyClass: string
  }
}

export const Page = ({ cmsData }: PageProps) => {
  const { page, settings, seoImage, bodyClass } = cmsData
  const { meta_title, meta_description } = page
  const { nextImages } = settings.processEnv

  const featImg = page.featureImage
  const postClass = PostClass({ tags: page.tags, isPage: page && true, isImage: !!featImg })
  const htmlAst = page.htmlAst
  if (htmlAst === undefined) throw Error('Page.tsx: htmlAst must be defined.')

  return (
    <>
      <SEO {...{ settings, meta_title, meta_description, seoImage }} />
      <Layout {...{ settings, bodyClass }} header={<HeaderPage {...{ settings }} />}>
        <div className="inner">
          <article className={`post-full ${postClass}`}>
            <header className="post-full-header">
              <h1 className="post-full-title">{page.title}</h1>
            </header>

            {featImg &&
              (nextImages.feature && featImg.dimensions ? (
                <figure className="post-full-image" style={{ display: 'inherit' }}></figure>
              ) : (
                page.feature_image && (
                  <figure className="post-full-image">
                    <img src={page.feature_image} alt={page.title} />
                  </figure>
                )
              ))}

            {/* The main page content */}
            <section className="post-full-content">
              <div className="post-content load-external-scripts">
                <RenderContent htmlAst={htmlAst} />
              </div>
            </section>
          </article>
        </div>
      </Layout>
    </>
  )
}
