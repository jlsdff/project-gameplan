
export async function generateMetadata({params, searchParams}){

  if(params.id){
    return {
      title: `${params.id}: Game`,
      description: `${params.id} Individual Test`
    }
  } else {
    return {
      title: "Generic Game",
      description: "Generic Description"
    }
  }

}

export default function Page({params}){
  return (
    <>
    <h1>{params.id}</h1>
    </>
  )
}