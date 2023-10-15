export const metadata = {
    title: "Products"
};

const ProductLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="py-2 px-2">{children}</div>
    )
}

export default ProductLayout