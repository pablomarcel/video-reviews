import React from 'react'
import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Image from 'next/image'
import ReactPlayer from 'react-player'
import Skeleton from '../../components/Skeleton'

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

export const getStaticPaths = async () => {
    const res = await client.getEntries({
        content_type: "review"
    })

    const paths = res.items.map(item => {
        return {
            params: { slug: item.fields.slug }
        }
    })

    return {
        paths,
        fallback: true
    }
}

export const getStaticProps = async ({ params }) => {
    const { items } = await client.getEntries({
        content_type: 'review',
        'fields.slug': params.slug
    })

    if (!items.length) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: { review: items[0] },
        revalidate: 1
    }
}

export default function ReviewDetails({ review }) {
    if (!review) return <Skeleton />

    const { featuredVideo, title, publisher, genre, description } = review.fields

    const videoUrl = 'https:'+ featuredVideo.fields.file.url

    return (
        <div>
            <div className="banner">

                <ReactPlayer url={videoUrl} controls />

            </div>

            <div className="title">
                <h2>{ title }</h2>
            </div>
            <div>

            </div>

            <div className="info">

                <p>{ publisher }</p>
                <h3>Genre:</h3>

                {genre.map(attr => (
                    <span key={attr}>{ attr }</span>
                ))}
            </div>

            <div className="description">
                <h3>Description:</h3>
                <div>{documentToReactComponents(description)}</div>
            </div>

            <style jsx>{`
        h2,h3 {
          text-transform: uppercase;
        }
        .title h2 {
          color: #3e2723;
          margin: 0;
          border: 2px solid #3e2723;
          display: inline-block;
          padding: 20px;
          position: relative;
          top: 30px;
          left: 0;
          bottom: 30px;
          transform: rotateZ(0deg);
          box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
        }
        .description{
          color: #263238;
        
        }
        .description h3 {
          color: #3e2723;
        
        }
        .info{
          color: #263238;
        
        }

        .info h3 {
          color: #3e2723;
        
        }
        .info p {
          top:30px;
          margin-top: 60px;
        }
        .info span::after {
          content: ", ";
        }
        .info span:last-child::after {
          content: ".";
        }
      `}</style>
        </div>
    )
}
