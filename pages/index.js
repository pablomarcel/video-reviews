import { createClient } from 'contentful'
import ReviewCard from "../components/ReviewCard";

export async function getStaticProps() {

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  })

  const res = await client.getEntries({ content_type: "review" })

  return {
    props: {
      reviews: res.items,
    },
    revalidate: 1
  }
}

export default function Reviews({ reviews }) {
  console.log(reviews)

  return (
    <div className="review-list">
      {reviews.map(review => (
        <ReviewCard key={review.sys.id} review={review} />
      ))}

      <style jsx>{`
        .review-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 20px 60px;
        }
      `}</style>
    </div>
  )
}
