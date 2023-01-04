import { gql } from "@apollo/client";
import client from "client";
import { BlockRenderer } from "components/BlockRenderer";
import { cleanAndTransformBlocks } from "utils/cleanAndTransformBlocks";


export default function Home(props) {
  console.log("Props: ", props);
  return <div><BlockRenderer blocks={props.blocks}/></div>;
}

export const getStaticProps = async () => {
  const {data} = await client.query({
    query: gql`
    query NewQuery {
      nodeByUri(uri: "/") {
        ... on Page {
          id
          title
          blocksJSON
        }
      }
    }
    `
  });
  const blocks = cleanAndTransformBlocks(data.nodeByUri.blocksJSON)
  return {
    props:{
      blocks,
      myprop: "my props"
    }
  }
}