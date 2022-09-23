import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Image from 'next/image'
import Skeleton from '../../components/Skeleton'

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

export const getStaticPaths = async () => {
    const res = await client.getEntries({
        content_type: "instrument"
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
        content_type: 'instrument',
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
        props: { instrument: items[0] },
        revalidate: 1
    }
}

export default function InstrumentDetails({ instrument }) {
    if (!instrument) return <Skeleton />

    const { featuredImage, title, type, range, attributes, description } = instrument.fields

    return (
        <div>
            <div className="banner">
                <Image
                    src={'https:' + featuredImage.fields.file.url}
                    width={featuredImage.fields.file.details.image.width}
                    height={featuredImage.fields.file.details.image.height}
                />
                <h2>{ title }</h2>
            </div>

            <div className="info">
                <p>{ type }</p>
                <h3>Attributes:</h3>

                {attributes.map(attr => (
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
        .banner h2 {
          color: #3e2723;
          margin: 0;
          border: 2px solid #3e2723;
          display: inline-block;
          padding: 20px;
          position: relative;
          top: -31px;
          left: 0;
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
          margin: 0;
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
