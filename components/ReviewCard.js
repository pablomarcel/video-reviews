import Link from 'next/link'
import Image from 'next/image'

export default function ReviewCard({ review }) {
    const { title, slug, publisher, thumbnail } = review.fields

    return (
        <div className="card">
            <div className="featured">
                <Image
                    src={'https:' + thumbnail.fields.file.url}
                    width={thumbnail.fields.file.details.image.width}
                    height={thumbnail.fields.file.details.image.height}
                />
            </div>
            <div className="content">
                <div className="info">
                    <h4>{ title }</h4>
                    <p>{ publisher }</p>
                </div>
                <div className="actions">
                    <Link href={'/reviews/' + slug}><a>See More</a></Link>
                </div>
            </div>

            <style jsx>{`
        .card {
          transform: rotateZ(0deg);
          
        }
        .content {
          background: radial-gradient(#ba68c8 0%, #ba68c8 100%);
          border: 2px solid white;
          box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
          margin: 0;
          position: relative;
          top: 0;
          left: 0;
        }
        .info {
          padding: 16px;
        }
        .info h4 {
          margin: 4px 0;
          text-transform: uppercase;
          color: white;
        }
        .info p {
          margin: 0;
          color: #cfd8dc;
        }
        .actions {
          margin-top: 20px;
          display: flex;
          justify-content: flex-end;
        }
        .actions a {
          color: white;
          background: #4a148c;
          padding: 16px 24px;
          text-decoration: none;
        }
      `}</style>
        </div>
    )
}
