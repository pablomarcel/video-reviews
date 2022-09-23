import { createClient } from 'contentful'
import InstrumentCard from '../components/InstrumentCard'

export async function getStaticProps() {

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  })

  const res = await client.getEntries({ content_type: "instrument" })

  return {
    props: {
      instruments: res.items,
    },
    revalidate: 1
  }
}

export default function Instruments({ instruments }) {
  console.log(instruments)

  return (
    <div className="instrument-list">
      {instruments.map(instrument => (
        <InstrumentCard key={instrument.sys.id} instrument={instrument} />
      ))}

      <style jsx>{`
        .instrument-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 20px 60px;
        }
      `}</style>
    </div>
  )
}
