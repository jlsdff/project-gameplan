import { Spinner } from "@heroui/react"

export default function LoadingPage({label, ...props}){
   return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Spinner
        label={label ? label : "Loading..."}
        color="primary"
        labelColor="primary"
        size="lg"
        {...props}
      />
    </div>
   )
}
