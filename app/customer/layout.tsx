export const metadata = {
    title: "Customer"
}

const CustomerLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="py-10 px-10">{children}</div>
  )
}

export default CustomerLayout